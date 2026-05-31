# build/ — the compile pipeline

Turns the Markdown sources into a Kindle-ready EPUB 3.

## Prerequisites
- Python 3 (standard library only — no third-party packages required for the EPUB).
- For the cover: [Pillow](https://pypi.org/project/Pillow/) (`pip install Pillow`) and the DejaVu
  fonts (bundled on most Linux systems at `/usr/share/fonts/truetype/dejavu`).

## Build the EPUB
```bash
python3 build/compile.py                       # -> build/Talosapien.epub
python3 build/compile.py --out /tmp/test.epub  # custom output path
```
Assembly order: `publishing/front-matter/*.md`, then `manuscript/*.md` (sorted by filename;
`README.md` skipped), then `publishing/back-matter/*.md`. Each file's YAML-ish frontmatter sets its
kind; frame matter (prologue / interludes / epilogue) is styled italic; part dividers and the title
page get their own styling. The cover is read from `publishing/cover/Talosapien-cover-ebook.png`.

## Build the cover
```bash
python3 publishing/cover/generate_cover.py     # deterministic; writes PNG/JPG/TIFF
```

## Re-drafting workflows
`build/workflows/` holds the multi-agent drafting scripts used to produce the body chapters
(character-subagent drafting against the locked bible and style sheet). They are kept for provenance
and re-runs; they are not part of the EPUB build.

## License
The tooling here is MIT (see [`LICENSE`](LICENSE)). The book itself is All Rights Reserved — see the
note at the bottom of the license file.
