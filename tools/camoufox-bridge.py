#!/usr/bin/env python3
import json
import os
import pathlib
import sys
import time
import traceback
import enum

from camoufox.sync_api import Camoufox


REPO_ROOT = pathlib.Path(__file__).resolve().parents[1]
DOWNLOAD_ROOT = pathlib.Path(os.environ.get('CAMOUFOX_DOWNLOAD_ROOT', REPO_ROOT / 'ai-assets/.tmp/downloads'))
DEFAULT_URL = os.environ.get('GROK_URL', 'https://grok.com/')
DEFAULT_HEADLESS = os.environ.get('CAMOUFOX_HEADLESS', 'true').lower() != 'false'
COOKIE_DIR = pathlib.Path.home() / '.camoufox'
COOKIE_PATH = COOKIE_DIR / 'grok-storage.json'
X_USERNAME_ENV = 'X_USERNAME'
X_PASSWORD_ENV = 'X_PASSWORD'

class LoginResult(enum.Enum):
    OK = 'ok'
    NEEDS_INTERVENTION = 'needs_intervention'
    FAILED = 'failed'


def ensure_cookie_dir():
    COOKIE_DIR.mkdir(parents=True, exist_ok=True)
    if COOKIE_PATH.exists():
        COOKIE_PATH.chmod(0o600)


def ensure_download_root():
    DOWNLOAD_ROOT.mkdir(parents=True, exist_ok=True)


def safe_inner_text(page, selector):
    try:
        return page.locator(selector).first.inner_text(timeout=15000)
    except Exception:
        return ''


def fill_element(page, selector, value):
    locator = page.locator(selector).first
    try:
        locator.fill(value)
        return
    except Exception:
        pass
    locator.click(force=True)
    page.keyboard.press('Meta+A' if sys.platform == 'darwin' else 'Control+A')
    page.keyboard.insert_text(value)


def click_element(page, selector):
    locator = page.locator(selector).first
    locator.click(force=True)


def do_x_login(page, context, x_user, x_pass):
    page.goto('https://grok.com', wait_until='networkidle', timeout=120000)
    page.wait_for_timeout(3000)

    page.get_by_text('Sign in', exact=True).first.click(force=True)
    page.wait_for_timeout(3000)

    page.locator('button:has-text("Login with")').first.click(force=True)
    page.wait_for_timeout(5000)

    try:
        page.get_by_text('Accept all cookies', exact=True).first.click(force=True)
        page.wait_for_timeout(2000)
    except Exception:
        pass

    try:
        page.get_by_text('Log in', exact=True).first.click(force=True)
        page.wait_for_timeout(5000)
    except Exception:
        pass

    username_input = page.locator('input[autocomplete="username"]').first
    username_input.wait_for(state='visible', timeout=15000)

    page.wait_for_timeout(500)
    username_input.fill(x_user)
    page.wait_for_timeout(800)

    try:
        page.get_by_text('Next', exact=True).first.click(force=True)
    except Exception:
        pass
    page.wait_for_timeout(4000)

    password_input = page.locator('input[autocomplete="current-password"]').first
    try:
        password_input.wait_for(state='visible', timeout=15000)
    except Exception:
        pass

    page.wait_for_timeout(500)
    password_input.fill(x_pass)
    page.wait_for_timeout(800)

    try:
        page.get_by_text('Sign in', exact=True).first.click(force=True)
    except Exception:
        try:
            page.get_by_text('Log in', exact=True).first.click(force=True)
        except Exception:
            pass

    page.wait_for_timeout(8000)

    try:
        authorize_btn = page.get_by_text('Authorize', exact=False).first
        if authorize_btn.is_visible(timeout=3000):
            authorize_btn.click(force=True)
            page.wait_for_timeout(5000)
    except Exception:
        pass

    for _ in range(30):
        page.wait_for_timeout(1000)
        current_url = page.url
        if 'grok.com' in current_url or 'accounts.x.ai' in current_url:
            if 'grok.com' in current_url:
                break
        if 'x.com' not in current_url:
            break

    page.wait_for_timeout(3000)

    context.storage_state(path=str(COOKIE_PATH))
    COOKIE_PATH.chmod(0o600)

    logged_in = 'grok.com' in page.url
    return {
        'logged_in': logged_in,
        'url': page.url,
        'title': page.title(),
    }


def cmd_auth_login(page, context, request):
    x_user = request.get('x_user') or os.environ.get(X_USERNAME_ENV, '')
    x_pass = request.get('x_pass') or os.environ.get(X_PASSWORD_ENV, '')

    if not x_user or not x_pass:
        raise ValueError(f'X credentials required via request params, {X_USERNAME_ENV}, or {X_PASSWORD_ENV} env vars')

    return do_x_login(page, context, x_user, x_pass)


def cmd_auth_status(page):
    page.goto('https://grok.com', wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(5000)

    body = page.locator('body').inner_text(timeout=10000).lower()
    has_login_ui = 'sign in' in body or 'log in' in body
    has_prompt_ui = '?' in body or 'ask' in body or 'send a message' in body or 'nuevo chat' in body or 'imagine' in body
    is_logged_in = not has_login_ui and has_prompt_ui

    return {
        'has_storage_file': COOKIE_PATH.exists(),
        'is_logged_in': is_logged_in,
        'url': page.url,
        'title': page.title(),
    }


def cmd_auth_clear():
    if COOKIE_PATH.exists():
        COOKIE_PATH.unlink()
    return {'cleared': True}


def cmd_generate(page, context, request):
    url = request.get('url') or DEFAULT_URL
    prompt = request['prompt']
    prompt_selector = request.get('prompt_selector') or 'textarea, [contenteditable="true"]'
    submit_selector = request.get('submit_selector') or 'button[type="submit"]'
    download_selector = request.get('download_selector') or ''
    destination_name = request.get('destination_name') or f'download-{int(time.time())}'
    wait_after_submit_ms = int(request.get('wait_after_submit_ms') or 1500)
    download_timeout_ms = int(request.get('download_timeout_ms') or 180000)

    page.goto(url, wait_until='domcontentloaded', timeout=120000)

    body_text = page.locator('body').inner_text(timeout=10000).lower()
    if 'sign in' in body_text and 'ask' not in body_text:
        if COOKIE_PATH.exists():
            raise ValueError('Session expired or cookies invalid — re-authenticate with auth_login first')
        else:
            raise ValueError('Not logged in — run auth_login first')

    fill_element(page, prompt_selector, prompt)

    if download_selector:
        click_element(page, submit_selector)
        if wait_after_submit_ms > 0:
            page.wait_for_timeout(wait_after_submit_ms)
        with page.expect_download(timeout=download_timeout_ms) as download_info:
            click_element(page, download_selector)
        download = download_info.value
    else:
        with page.expect_download(timeout=download_timeout_ms) as download_info:
            click_element(page, submit_selector)
        download = download_info.value
        if wait_after_submit_ms > 0:
            page.wait_for_timeout(wait_after_submit_ms)

    destination_path = DOWNLOAD_ROOT / destination_name
    download.save_as(str(destination_path))
    result = {
        'url': page.url,
        'title': page.title(),
        'download_path': str(destination_path.relative_to(REPO_ROOT)),
        'suggested_filename': download.suggested_filename,
    }
    return result


def cmd_grok_imagine(page, context, request):
    prompt = request['prompt']
    destination_name = request.get('destination_name') or f'grok-image-{int(time.time())}'
    timeout_ms = int(request.get('timeout_ms') or 120000)
    max_images = int(request.get('max_images') or 1)

    page.goto('https://grok.com/imagine', wait_until='networkidle', timeout=60000)
    page.wait_for_timeout(3000)

    input_area = page.locator('[contenteditable="true"]').first
    input_area.wait_for(state='visible', timeout=10000)
    input_area.click(force=True)
    page.wait_for_timeout(500)
    page.keyboard.insert_text(prompt)
    page.wait_for_timeout(500)
    page.keyboard.press('Enter')

    deadline = time.time() + timeout_ms / 1000
    saved = []

    while time.time() < deadline and len(saved) < max_images:
        page.wait_for_timeout(2000)
        imgs = page.locator('img').all()
        for img in imgs:
            try:
                src = img.get_attribute('src') or ''
                if not src.startswith('data:image'):
                    continue
                if not img.is_visible(timeout=1000):
                    continue
                import base64
                src_hash = hash(src[:200])
                if any(s['hash'] == src_hash for s in saved):
                    continue
                ext = src.split(';')[0].split('/')[-1] or 'png'
                fname = f'{destination_name}-{len(saved)}.{ext}'
                fpath = DOWNLOAD_ROOT / fname
                raw = src.split(',', 1)[-1]
                fpath.write_bytes(base64.b64decode(raw))
                saved.append({
                    'hash': src_hash,
                    'path': str(fpath.relative_to(REPO_ROOT)),
                    'size': len(raw),
                })
            except Exception:
                pass
        if len(saved) >= max_images:
            break

    return {
        'url': page.url,
        'title': page.title(),
        'images_saved': len(saved),
        'downloads': saved,
    }


def run():
    ensure_download_root()
    ensure_cookie_dir()

    browser_options = {
        'headless': DEFAULT_HEADLESS,
        'main_world_eval': True,
        'geoip': False,
        'os': 'linux',
    }

    with Camoufox(**browser_options) as raw_browser:
        storage_state_path = str(COOKIE_PATH) if COOKIE_PATH.exists() else None
        context = raw_browser.new_context(
            storage_state=storage_state_path,
            accept_downloads=True,
        )
        page = context.new_page()
        state = {'page': page, 'context': context}

        def get_page():
            return state['page']

        def get_context():
            return state['context']

        for raw_line in sys.stdin:
            line = raw_line.strip()
            if not line:
                continue

            try:
                request = json.loads(line)
                cmd = request.get('cmd')
                req_id = request.get('id')
                page = get_page()
                context = get_context()

                if cmd == 'open':
                    url = request.get('url') or DEFAULT_URL
                    page.goto(url, wait_until='domcontentloaded', timeout=120000)
                    result = {
                        'url': page.url,
                        'title': page.title(),
                    }
                elif cmd == 'capture':
                    selector = request.get('selector') or 'body'
                    text = safe_inner_text(page, selector)
                    screenshot_name = request.get('screenshot_name')
                    screenshot_path = None
                    if screenshot_name:
                        screenshot_dir = DOWNLOAD_ROOT / 'screenshots'
                        screenshot_dir.mkdir(parents=True, exist_ok=True)
                        screenshot_path = screenshot_dir / screenshot_name
                        page.screenshot(path=str(screenshot_path), full_page=True)
                    result = {
                        'url': page.url,
                        'title': page.title(),
                        'text': text[:12000],
                        'screenshot_path': str(screenshot_path.relative_to(REPO_ROOT)) if screenshot_path else None,
                    }
                elif cmd == 'generate':
                    result = cmd_generate(page, context, request)
                elif cmd == 'grok_imagine':
                    result = cmd_grok_imagine(page, context, request)
                elif cmd == 'auth_login':
                    result = cmd_auth_login(page, context, request)
                elif cmd == 'auth_status':
                    result = cmd_auth_status(page)
                elif cmd == 'auth_clear':
                    result = cmd_auth_clear()
                elif cmd == 'close':
                    result = {'ok': True}
                    print(json.dumps({'id': req_id, 'ok': True, 'result': result}), flush=True)
                    break
                else:
                    raise ValueError(f'Unknown command: {cmd}')

                print(json.dumps({'id': req_id, 'ok': True, 'result': result}), flush=True)
            except Exception as exc:
                print(
                    json.dumps(
                        {
                            'id': request.get('id') if 'request' in locals() else None,
                            'ok': False,
                            'error': str(exc),
                            'traceback': traceback.format_exc(),
                        }
                    ),
                    flush=True,
                )


if __name__ == '__main__':
    run()
