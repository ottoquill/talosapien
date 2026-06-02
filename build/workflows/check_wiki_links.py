#!/usr/bin/env python3
"""Check that every relative Markdown link in the given files (or all of wiki/) resolves.
Usage: check_wiki_links.py [file ...]   (no args = check all of wiki/)"""
import os, re, sys, glob

LINK = re.compile(r'\[[^\]]*\]\(([^)]+)\)')
root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def files(argv):
    if argv:
        return argv
    return glob.glob(os.path.join(root, "wiki", "**", "*.md"), recursive=True)

bad = []
for f in files(sys.argv[1:]):
    base = os.path.dirname(os.path.abspath(f))
    with open(f, encoding="utf-8") as fh:
        text = fh.read()
    for m in LINK.finditer(text):
        target = m.group(1).split('#')[0].strip()
        if not target or target.startswith(('http://', 'https://', 'mailto:')):
            continue
        if not os.path.exists(os.path.normpath(os.path.join(base, target))):
            bad.append((f, target))

if bad:
    for f, t in bad:
        print(f"BROKEN LINK: {f} -> {t}")
    sys.exit(1)
print("ALL LINKS RESOLVE")
