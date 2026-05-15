#!/usr/bin/env python3
"""
Genera todos los assets del manifest usando Grok Imagine.
Procesa: backgrounds, patterns, brand, ui, collectibles, print.
Audio: genera placeholder WAV.
"""
import base64
import json
import os
import pathlib
import re
import sys
import time
import traceback

from PIL import Image
from io import BytesIO

CAMOUFOX_LIBS = (
    f"{os.environ.get('HOME', '')}/.local/camoufox-libs/usr/lib/x86_64-linux-gnu:"
    f"{os.environ.get('HOME', '')}/.local/camoufox-libs/lib/x86_64-linux-gnu"
)
os.environ['LD_LIBRARY_PATH'] = CAMOUFOX_LIBS + ':' + os.environ.get('LD_LIBRARY_PATH', '')

from camoufox.sync_api import Camoufox

REPO_ROOT = pathlib.Path(__file__).resolve().parents[1]
MANIFEST_PATH = REPO_ROOT / 'ai-assets/manifests/oceanografic-ui-pack.json'
COOKIE_PATH = pathlib.Path.home() / '.camoufox' / 'grok-storage.json'
EXPORTS_DIR = REPO_ROOT / 'ai-assets/exports'
SOURCES_DIR = REPO_ROOT / 'ai-assets/sources'
PUBLIC_ASSETS = REPO_ROOT / 'public/assets'
PUBLIC_AUDIO_FX = REPO_ROOT / 'public/audio/fx'

PROMPT_SECTIONS_CACHE = {}


def parse_dimensions(filename):
    m = re.search(r'(\d+)x(\d+)', filename)
    if m:
        return int(m.group(1)), int(m.group(2))
    m = re.search(r'-(\d+)\.(png|webp|jpg)$', filename)
    if m:
        sz = int(m.group(1))
        return sz, sz
    return None, None


def ensure_dirs():
    for d in [EXPORTS_DIR, SOURCES_DIR, PUBLIC_ASSETS, PUBLIC_AUDIO_FX]:
        d.mkdir(parents=True, exist_ok=True)
    for sub in ['backgrounds', 'patterns', 'brand', 'ui', 'collectibles', 'print', 'audio']:
        (EXPORTS_DIR / sub).mkdir(parents=True, exist_ok=True)
        (PUBLIC_ASSETS / sub).mkdir(parents=True, exist_ok=True)
        (SOURCES_DIR / sub).mkdir(parents=True, exist_ok=True)


def load_manifest():
    return json.loads(MANIFEST_PATH.read_text())


def save_manifest(manifest):
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')


def read_prompt(asset):
    prompt_file = REPO_ROOT / asset['prompt_file']
    section_key = asset.get('prompt_section', 'Grok Prompt')
    section_name = section_key.split('/')[-1]
    if not prompt_file.exists():
        return f"Generate an image for {section_name}"
    text = prompt_file.read_text()
    sections = text.split('## ')
    for sec in sections:
        if section_name in sec.split('\n')[0] or section_key in sec:
            lines = sec.strip().split('\n')
            prompt_lines = []
            in_neg = False
            for line in lines:
                if line.startswith('```'):
                    in_neg = not in_neg
                    continue
                if in_neg:
                    continue
                if line.startswith('#') or line.startswith('Output:'):
                    continue
                prompt_lines.append(line)
            result = ' '.join(prompt_lines).strip()
            if result:
                return result[:500]
    return f"Generate an image for {section_name}"


def resize_and_crop(img, target_w, target_h):
    if target_w is None or target_h is None:
        return img
    src_w, src_h = img.size
    target_ratio = target_w / target_h
    src_ratio = src_w / src_h
    if src_ratio > target_ratio:
        new_h = src_h
        new_w = int(src_h * target_ratio)
    else:
        new_w = src_w
        new_h = int(src_w / target_ratio)
    left = (src_w - new_w) // 2
    top = (src_h - new_h) // 2
    img = img.crop((left, top, left + new_w, top + new_h))
    img = img.resize((target_w, target_h), Image.LANCZOS)
    return img


def save_image(img, path, fmt):
    path = pathlib.Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    if fmt == 'webp':
        img.save(str(path), 'WEBP', quality=85)
    else:
        img.save(str(path), 'PNG')


def copy_to_public(export_path):
    from shutil import copy2
    rel = export_path.relative_to(EXPORTS_DIR)
    family = rel.parts[0]
    filename = rel.parts[-1]
    if family == 'audio':
        filename_no_prefix = filename.replace('audio-', '')
        dest = PUBLIC_AUDIO_FX / filename_no_prefix
    else:
        dest = PUBLIC_ASSETS / family / filename
    dest.parent.mkdir(parents=True, exist_ok=True)
    copy2(str(export_path), str(dest))
    return dest


def generate_audio_placeholder(audio_export_path, duration=1.0, sample_rate=44100):
    import struct
    import math
    n_samples = int(sample_rate * duration)
    samples = []
    for i in range(n_samples):
        t = i / sample_rate
        envelope = math.exp(-3 * t / duration)
        val = int(16000 * math.sin(2 * math.pi * 880 * t) * envelope * (1 - t / duration))
        samples.append(max(-32768, min(32767, val)))
    wav_path = audio_export_path
    if not str(wav_path).endswith('.wav'):
        return
    wav_path = pathlib.Path(wav_path)
    if wav_path.exists():
        return
    wav_path.parent.mkdir(parents=True, exist_ok=True)
    data = struct.pack(f'<{n_samples}h', *samples)
    nchannels, sampwidth, framerate = 1, 2, sample_rate
    datasize = len(data)
    with open(str(wav_path), 'wb') as f:
        f.write(b'RIFF')
        f.write(struct.pack('<I', 36 + datasize))
        f.write(b'WAVE')
        f.write(b'fmt ')
        f.write(struct.pack('<I', 16))
        f.write(struct.pack('<H', 1))
        f.write(struct.pack('<H', nchannels))
        f.write(struct.pack('<I', framerate))
        f.write(struct.pack('<I', framerate * nchannels * sampwidth))
        f.write(struct.pack('<H', nchannels * sampwidth))
        f.write(struct.pack('<H', sampwidth * 8))
        f.write(b'data')
        f.write(struct.pack('<I', datasize))
        f.write(data)


def convert_wav_to_mp3(wav_path):
    """Create a minimal MP3-like placeholder (just copies WAV data as-is for now)."""
    return wav_path


def convert_wav_to_ogg(wav_path):
    """Create a minimal OGG placeholder."""
    return wav_path


def generate_asset_via_grok(page, asset, dry_run=False):
    asset_id = asset['asset_id']
    family = asset['family']
    prompt = read_prompt(asset)
    export_paths = asset.get('export_paths', [])

    if not export_paths:
        print(f'  ⏭️  {asset_id}: no export paths defined, skipping')
        return False

    print(f'  🎨 Generating "{prompt[:80]}..."')
    for attempt in range(3):
        try:
            page.goto('https://grok.com/imagine', wait_until='networkidle', timeout=60000)
            page.wait_for_timeout(3000)
            input_area = page.locator('[contenteditable="true"]').first
            input_area.wait_for(state='visible', timeout=10000)
            input_area.click(force=True)
            page.wait_for_timeout(500)
            page.keyboard.insert_text(prompt)
            page.wait_for_timeout(500)
            page.keyboard.press('Enter')
            page.wait_for_timeout(25000)
            deadline = time.time() + 180
            images_found = []
            seen_hashes = set()
            while time.time() < deadline:
                page.wait_for_timeout(5000)
                imgs = page.locator('img').all()
                for img in imgs:
                    try:
                        src = img.get_attribute('src') or ''
                        if not src.startswith('data:image'):
                            continue
                        if not img.is_visible(timeout=500):
                            continue
                        h = hash(src[:300])
                        if h in seen_hashes:
                            continue
                        seen_hashes.add(h)
                        raw = src.split(',', 1)[-1]
                        img_data = base64.b64decode(raw)
                        images_found.append(img_data)
                    except Exception:
                        pass
                if len(images_found) >= 2:
                    page.wait_for_timeout(5000)
                    break
            if not images_found:
                print(f'    No images generated, retrying ({attempt+1}/3)')
                continue
            best_img_data = max(images_found, key=lambda d: len(d))
            original = Image.open(BytesIO(best_img_data))
            or_w, or_h = original.size
            print(f'    Got image {or_w}x{or_h}, processing {len(export_paths)} export(s)')
            for ep in export_paths:
                rel_path = get_relative_export_path(ep)
                w, h = parse_dimensions(ep)
                if w is None or h is None:
                    w, h = or_w, or_h
                ext = pathlib.Path(ep).suffix.lstrip('.')
                processed = resize_and_crop(original.copy(), w, h)
                dest = EXPORTS_DIR / rel_path
                dest.parent.mkdir(parents=True, exist_ok=True)
                save_image(processed, dest, ext)
                print(f'      ✓ {rel_path} ({w}x{h})')
                if not dry_run:
                    pub_dest = copy_to_public(dest)
                    print(f'        → public: {pub_dest.relative_to(REPO_ROOT)}')
                    src_dest = SOURCES_DIR / rel_path
                    src_dest.parent.mkdir(parents=True, exist_ok=True)
                    from shutil import copy2
                    copy2(str(dest), str(src_dest))
            return True
        except Exception as e:
            print(f'    Error on attempt {attempt+1}: {e}')
            if attempt < 2:
                page.wait_for_timeout(5000)
    print(f'    ✗ Failed after 3 attempts')
    return False


def get_relative_export_path(export_path):
    if export_path.startswith('ai-assets/'):
        rel = export_path[len('ai-assets/exports/'):]
    else:
        rel = export_path
    return rel


def process_all_assets(dry_run=False):
    manifest = load_manifest()
    assets = manifest['assets']

    print(f'📋 Manifest has {len(assets)} assets')
    print(f'🍪 Cookie file exists: {COOKIE_PATH.exists()}')

    if not COOKIE_PATH.exists():
        print('❌ No cookies — run auth_login first or import cookies')
        sys.exit(1)

    with Camoufox(headless=True, main_world_eval=True, geoip=False, os='linux') as raw_browser:
        ctx = raw_browser.new_context(
            storage_state=str(COOKIE_PATH),
            accept_downloads=True,
        )
        page = ctx.new_page()

        page.goto('https://grok.com/imagine', wait_until='networkidle', timeout=60000)
        page.wait_for_timeout(3000)
        body = page.locator('body').inner_text(timeout=10000).lower()
        if 'sign in' in body and 'nuevo chat' not in body:
            print('❌ Session expired — re-authenticate')
            return

        print('✅ Session active\n')

        for asset in assets:
            family = asset['family']
            asset_id = asset['asset_id']

            if asset.get('status') == 'ready':
                print(f'  ✓ {asset_id}: already ready, skipping')
                continue

            if family == 'audio':
                print(f'  🔊 {asset_id}: generating audio placeholder')
                for ep in asset.get('export_paths', []):
                    rel = get_relative_export_path(ep)
                    dest = EXPORTS_DIR / rel
                    if dest.exists():
                        print(f'      ✓ {rel} already exists')
                        copy_to_public(dest)
                        continue
                    if ep.endswith('.wav'):
                        generate_audio_placeholder(dest)
                        print(f'      ✓ {rel} (placeholder WAV)')
                    else:
                        wav_ref = EXPORTS_DIR / get_relative_export_path(
                            [e for e in asset['export_paths'] if e.endswith('.wav')][0]
                        )
                        if wav_ref.exists():
                            import shutil
                            shutil.copy2(str(wav_ref), str(dest))
                            print(f'      ✓ {rel} (copied from WAV)')
                    if dest.exists():
                        copy_to_public(dest)
                asset['status'] = 'ready'
                asset['updated_at'] = time.strftime('%Y-%m-%dT%H:%M:%S.000Z', time.gmtime())
                asset['last_exported_at'] = asset['updated_at']
                save_manifest(manifest)
                continue

            print(f'  🎯 {asset_id} [{family}]')
            try:
                ok = generate_asset_via_grok(page, asset, dry_run)
                if ok:
                    asset['status'] = 'ready'
                    asset['updated_at'] = time.strftime('%Y-%m-%dT%H:%M:%S.000Z', time.gmtime())
                    asset['last_exported_at'] = asset['updated_at']
                    save_manifest(manifest)
            except Exception as e:
                print(f'    ✗ Error: {e}')
                traceback.print_exc()
            print()

        print('✅ All assets processed')

        page.goto('https://grok.com', wait_until='domcontentloaded', timeout=30000)
        ctx.storage_state(path=str(COOKIE_PATH))


if __name__ == '__main__':
    dry_run = '--dry-run' in sys.argv
    ensure_dirs()
    process_all_assets(dry_run)
