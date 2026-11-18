#!/usr/bin/env python3
"""Refresh browser cache keys after changing portfolio CSS or JavaScript.

Run from any directory: python3 scripts/version-assets.py
This changes references only, requires no dependencies, and is not a build step.
"""
from hashlib import sha256
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
VERSIONS = {
    name: sha256((ROOT / name).read_bytes()).hexdigest()[:12]
    for name in ('styles.css', 'script.js')
}

for page in sorted(ROOT.glob('*.html')):
    original = page.read_text()
    updated = original
    for name, version in VERSIONS.items():
        pattern = r'((?:href|src)=["\']/?' + re.escape(name) + r')(?:\?[^"\']*)?(["\'])'
        updated = re.sub(pattern, lambda match: f'{match[1]}?v={version}{match[2]}', updated)
    if updated != original:
        page.write_text(updated)
        print(f'Updated {page.name}')
