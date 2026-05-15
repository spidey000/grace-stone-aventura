#!/usr/bin/env python3
"""
Read Chrome cookie TSV from clipboard/file and convert to Playwright storage state JSON.
Usage:
  python3 import-chrome-cookies.py < /tmp/cookies.txt
  # or paste directly and Ctrl+D
"""
import json
import pathlib
import sys
from datetime import datetime, timezone

COOKIE_PATH = pathlib.Path.home() / '.camoufox' / 'grok-storage.json'


def parse_expires(raw):
    if not raw or raw.strip() == '':
        return -1
    raw = raw.strip().rstrip('Z')
    try:
        dt = datetime.fromisoformat(raw)
        return int(dt.timestamp())
    except ValueError:
        return -1


def tsv_to_playwright_state(lines):
    cookies = []
    for line in lines:
        line = line.strip()
        if not line or line.startswith('Name\t') or line.startswith('#'):
            continue

        parts = line.split('\t')
        if len(parts) < 9:
            continue

        name = parts[0].strip()
        value = parts[1].strip()
        domain = parts[2].strip()
        path = parts[3].strip()
        expires_str = parts[4].strip()
        http_only = '✓' in parts[6] if len(parts) > 6 else False
        secure = '✓' in parts[7] if len(parts) > 7 else False

        same_site_raw = parts[8].strip() if len(parts) > 8 else ''
        same_site_map = {'lax': 'Lax', 'strict': 'Strict', 'none': 'None'}
        same_site = same_site_map.get(same_site_raw.lower(), 'Lax')

        cookies.append({
            'name': name,
            'value': value,
            'domain': domain,
            'path': path,
            'expires': parse_expires(expires_str),
            'httpOnly': http_only,
            'secure': secure,
            'sameSite': same_site,
        })

    return {'cookies': cookies, 'origins': []}


def main():
    lines = [line for line in sys.stdin if line.strip()]
    state = tsv_to_playwright_state(lines)

    COOKIE_PATH.parent.mkdir(parents=True, exist_ok=True)
    COOKIE_PATH.write_text(json.dumps(state, indent=2))
    COOKIE_PATH.chmod(0o600)

    domains = sorted(set(c['domain'] for c in state['cookies']))
    print(f'Converted {len(state["cookies"])} cookies from {len(domains)} domains:')
    for d in domains:
        count = sum(1 for c in state['cookies'] if c['domain'] == d)
        print(f'  {d}: {count} cookies')
    print(f'\nSaved to {COOKIE_PATH}')


if __name__ == '__main__':
    main()
