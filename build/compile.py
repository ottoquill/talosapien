#!/usr/bin/env python3
"""
compile.py — assemble *Talosapien* into a Kindle-ready EPUB 3.

No third-party dependencies (Python 3 stdlib only). Pandoc is NOT required.

Order:
  publishing/front-matter/*.md   (sorted)
  manuscript/*.md                (sorted by filename; README.md skipped)
  publishing/back-matter/*.md    (sorted)

Each source file may carry a YAML-ish frontmatter block delimited by '---'.
Frame matter (kind: prologue|interlude|epilogue) is wrapped for italic styling.
Cover is taken from publishing/cover/.

Usage:  python3 build/compile.py [--out build/Talosapien.epub]
"""
import os, re, sys, html, zipfile, hashlib, datetime, argparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONT = os.path.join(ROOT, "publishing", "front-matter")
BODY = os.path.join(ROOT, "manuscript")
BACK = os.path.join(ROOT, "publishing", "back-matter")
COVER = os.path.join(ROOT, "publishing", "cover", "Talosapien-cover-ebook.png")

TITLE = "Talosapien"
SUBTITLE = "A Novel"
AUTHOR = "Otto Quill"
PUBLISHER = "Hollis & Vane Press"
LANG = "en"
YEAR = "2026"
DESCRIPTION = ("A hard-SF novel told across sixty-six million years: a sapient dinosaur "
               "civilization that destroyed itself, and the human scientist who reads the "
               "warning in the iridium layer and cannot make her own world listen.")

FRAME_KINDS = {"prologue", "interlude", "epilogue"}

# ---------------------------------------------------------------- frontmatter
def split_frontmatter(text):
    meta = {}
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            block = text[3:end].strip("\n")
            for line in block.splitlines():
                if ":" in line:
                    k, v = line.split(":", 1)
                    meta[k.strip()] = v.strip().strip('"').strip("'")
            text = text[end + 4:]
    return meta, text.lstrip("\n")

# ---------------------------------------------------------------- md -> xhtml
INLINE_BOLD = re.compile(r"\*\*(.+?)\*\*")
INLINE_ITAL = re.compile(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)")
INLINE_ITAL_U = re.compile(r"(?<!_)_(?!_)(.+?)(?<!_)_(?!_)")

def inline(s):
    s = html.escape(s, quote=False)
    s = INLINE_BOLD.sub(r"<strong>\1</strong>", s)
    s = INLINE_ITAL.sub(r"<em>\1</em>", s)
    s = INLINE_ITAL_U.sub(r"<em>\1</em>", s)
    return s

def md_to_xhtml(md):
    """Minimal converter covering the constructs this manuscript uses."""
    lines = md.split("\n")
    out = []
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i].rstrip()
        if not line.strip():
            i += 1
            continue
        # section break glyph
        if line.strip() == "◆":
            out.append('<p class="brk">◆</p>')
            i += 1
            continue
        # horizontal rule
        if re.fullmatch(r"-{3,}|\*{3,}|_{3,}", line.strip()):
            out.append("<hr/>")
            i += 1
            continue
        # headings
        m = re.match(r"^(#{1,6})\s+(.*)$", line)
        if m:
            level = len(m.group(1))
            out.append(f"<h{level}>{inline(m.group(2).strip())}</h{level}>")
            i += 1
            continue
        # blockquote (group consecutive '>' lines)
        if line.lstrip().startswith(">"):
            quote = []
            while i < n and lines[i].lstrip().startswith(">"):
                quote.append(re.sub(r"^\s*>\s?", "", lines[i]))
                i += 1
            chunk, paras = [], []
            for q in quote:
                if q.strip() == "":
                    if chunk:
                        paras.append(" ".join(chunk)); chunk = []
                else:
                    chunk.append(q)
            if chunk:
                paras.append(" ".join(chunk))
            inner = "".join(f"<p>{inline(p)}</p>" for p in paras)
            out.append(f"<blockquote>{inner}</blockquote>")
            continue
        # paragraph: gather until blank line
        para = [line]
        i += 1
        while i < n and lines[i].strip() and not lines[i].lstrip().startswith((">", "#")) \
                and lines[i].strip() != "◆":
            para.append(lines[i].rstrip())
            i += 1
        joined = "<br/>".join(inline(p) for p in para) if len(para) > 1 and all(
            len(p) < 60 for p in para) else inline(" ".join(para))
        out.append(f"<p>{joined}</p>")
    return "\n".join(out)

# ---------------------------------------------------------------- doc wrapper
XHTML = """<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="{lang}">
<head>
<meta charset="utf-8"/>
<title>{title}</title>
<link rel="stylesheet" type="text/css" href="{css_href}"/>
</head>
<body class="{bodyclass}">
{content}
</body>
</html>
"""

def wrap(title, content, bodyclass, css_href="../style.css"):
    return XHTML.format(lang=LANG, title=html.escape(title), content=content,
                        bodyclass=bodyclass, css_href=css_href)

# ---------------------------------------------------------------- gather files
def collect(dirpath):
    if not os.path.isdir(dirpath):
        return []
    files = [f for f in os.listdir(dirpath)
             if f.endswith(".md") and f.lower() != "readme.md"]
    return [os.path.join(dirpath, f) for f in sorted(files)]

def word_count(md):
    return len(re.findall(r"\b[\w'-]+\b", md))

# ---------------------------------------------------------------- build
def build(out_path):
    sources = collect(FRONT) + collect(BODY) + collect(BACK)
    chapters = []
    total_words = 0
    for idx, path in enumerate(sources):
        with open(path, encoding="utf-8") as fh:
            raw = fh.read()
        meta, body_md = split_frontmatter(raw)
        kind = meta.get("kind", "chapter")
        title = meta.get("title") or meta.get("section") or os.path.basename(path)
        words = word_count(body_md)
        if kind in ("chapter", "prologue", "interlude", "epilogue", "part-divider"):
            total_words += words
        body_html = md_to_xhtml(body_md)
        if kind in FRAME_KINDS:
            body_html = f'<div class="frame">\n{body_html}\n</div>'
        bodyclass = " ".join(filter(None, [
            "frame" if kind in FRAME_KINDS else "",
            kind.replace("-", "_"),
            ("section_" + meta.get("section", "").replace("-", "_")) if meta.get("section") else "",
        ])).strip() or "chapter"
        fname = f"text/{idx:03d}.xhtml"
        chapters.append({
            "id": f"c{idx:03d}",
            "file": fname,
            "title": title,
            "kind": kind,
            "xhtml": wrap(title, body_html, bodyclass),
            "nav": kind in ("chapter", "prologue", "interlude", "epilogue", "part-divider"),
        })

    base = hashlib.sha1((TITLE + AUTHOR + YEAR).encode()).hexdigest()
    book_uuid = "urn:uuid:%s-%s-%s-%s-%s" % (
        base[0:8], base[8:12], base[12:16], base[16:20], base[20:32])
    mod = datetime.datetime(2026, 1, 1).strftime("%Y-%m-%dT%H:%M:%SZ")

    container = ('<?xml version="1.0" encoding="UTF-8"?>\n'
        '<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">\n'
        '  <rootfiles><rootfile full-path="OEBPS/content.opf" '
        'media-type="application/oebps-package+xml"/></rootfiles>\n</container>\n')

    cover_xhtml = wrap("Cover",
        f'<div class="coverpage"><img src="../images/cover.png" alt="{html.escape(TITLE)} — a novel by {html.escape(AUTHOR)}"/></div>',
        "coverpage")

    manifest, spine, navlist = [], [], []
    manifest.append('<item id="cover-image" href="images/cover.png" media-type="image/png" properties="cover-image"/>')
    manifest.append('<item id="cover" href="text/cover.xhtml" media-type="application/xhtml+xml"/>')
    manifest.append('<item id="css" href="style.css" media-type="text/css"/>')
    manifest.append('<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>')
    manifest.append('<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>')
    spine.append('<itemref idref="cover" linear="yes"/>')
    spine.append('<itemref idref="nav" linear="no"/>')
    for c in chapters:
        manifest.append(f'<item id="{c["id"]}" href="{c["file"]}" media-type="application/xhtml+xml"/>')
        spine.append(f'<itemref idref="{c["id"]}"/>')
        if c["nav"]:
            navlist.append((c["file"], c["title"]))

    opf = f"""<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid" xml:lang="{LANG}">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="bookid">{book_uuid}</dc:identifier>
    <dc:title>{html.escape(TITLE)}</dc:title>
    <dc:creator id="author">{html.escape(AUTHOR)}</dc:creator>
    <dc:language>{LANG}</dc:language>
    <dc:date>{YEAR}</dc:date>
    <dc:publisher>{html.escape(PUBLISHER)}</dc:publisher>
    <dc:rights>Copyright © {YEAR} {html.escape(AUTHOR)}. All rights reserved.</dc:rights>
    <dc:description>{html.escape(DESCRIPTION)}</dc:description>
    <meta property="dcterms:modified">{mod}</meta>
    <meta name="cover" content="cover-image"/>
  </metadata>
  <manifest>
    {chr(10).join("    " + m for m in manifest).strip()}
  </manifest>
  <spine toc="ncx">
    {chr(10).join("    " + s for s in spine).strip()}
  </spine>
</package>
"""

    nav_items = "\n".join(
        f'      <li><a href="{f}">{html.escape(t)}</a></li>' for f, t in navlist)
    nav = wrap("Contents",
        f'<nav epub:type="toc" id="toc"><h1>Contents</h1>\n<ol>\n{nav_items}\n</ol></nav>',
        "nav", css_href="style.css")

    ncx_points = "\n".join(
        f'    <navPoint id="n{i}" playOrder="{i+1}"><navLabel><text>{html.escape(t)}</text></navLabel>'
        f'<content src="{f}"/></navPoint>'
        for i, (f, t) in enumerate(navlist))
    ncx = f"""<?xml version="1.0" encoding="utf-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head><meta name="dtb:uid" content="{book_uuid}"/></head>
  <docTitle><text>{html.escape(TITLE)}</text></docTitle>
  <navMap>
{ncx_points}
  </navMap>
</ncx>
"""

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    if os.path.exists(out_path):
        os.remove(out_path)
    with zipfile.ZipFile(out_path, "w") as z:
        z.writestr("mimetype", "application/epub+zip", compress_type=zipfile.ZIP_STORED)
        z.writestr("META-INF/container.xml", container, compress_type=zipfile.ZIP_DEFLATED)
        z.writestr("OEBPS/content.opf", opf, compress_type=zipfile.ZIP_DEFLATED)
        z.writestr("OEBPS/nav.xhtml", nav, compress_type=zipfile.ZIP_DEFLATED)
        z.writestr("OEBPS/toc.ncx", ncx, compress_type=zipfile.ZIP_DEFLATED)
        z.writestr("OEBPS/style.css", CSS, compress_type=zipfile.ZIP_DEFLATED)
        z.writestr("OEBPS/text/cover.xhtml", cover_xhtml, compress_type=zipfile.ZIP_DEFLATED)
        if os.path.exists(COVER):
            with open(COVER, "rb") as fh:
                z.writestr("OEBPS/images/cover.png", fh.read(), compress_type=zipfile.ZIP_DEFLATED)
        else:
            print("WARNING: cover not found at", COVER)
        for c in chapters:
            z.writestr("OEBPS/" + c["file"], c["xhtml"], compress_type=zipfile.ZIP_DEFLATED)

    print(f"Wrote {out_path}")
    print(f"  files: {len(chapters)} sections   manuscript words: ~{total_words:,}")
    return total_words


CSS = """@charset "utf-8";
html, body { margin: 0; padding: 0; }
body { font-family: Georgia, 'Times New Roman', serif; line-height: 1.5;
       color: #111; background: #fff; padding: 0 1.2em; }
p { margin: 0; text-indent: 1.3em; orphans: 2; widows: 2; }
p:first-of-type, h1 + p, h2 + p, h3 + p, .brk + p { text-indent: 0; }
h1, h2, h3, h4 { font-family: 'Helvetica Neue', Arial, sans-serif; font-weight: normal;
       line-height: 1.2; text-align: left; margin: 1.4em 0 0.8em; }
h1 { font-size: 1.7em; letter-spacing: 0.02em; margin-top: 2.2em; }
.brk { text-align: center; text-indent: 0; margin: 1.1em 0; color: #555; letter-spacing: 0.3em; }
blockquote { margin: 1em 1.6em; font-style: italic; color: #333; }
blockquote p { text-indent: 0; margin: 0.4em 0; }
hr { border: 0; border-top: 1px solid #ccc; margin: 1.6em 20%; }
em { font-style: italic; }
strong { font-weight: bold; }
/* frame matter (the reconstruction's voice) is italic throughout */
.frame p { font-style: italic; }
.frame h1, .frame h2 { font-style: italic; color: #222; }
/* part dividers */
.part_divider { text-align: center; }
.part_divider h1 { margin-top: 3em; letter-spacing: 0.12em; }
.part_divider h2 { font-style: normal; color: #444; letter-spacing: 0.18em; }
/* title page */
.section_title_page { text-align: center; }
.section_title_page h1 { font-size: 3em; letter-spacing: 0.12em; margin-top: 3em; text-align: center; }
.section_title_page h3 { text-align: center; color: #444; letter-spacing: 0.2em; }
.section_title_page h4 { text-align: center; margin-top: 3em; letter-spacing: 0.1em; }
/* dedication / epigraph centered & airy */
.section_dedication p, .section_epigraph blockquote { text-align: center; font-style: italic; }
.section_dedication p { text-indent: 0; }
/* cover */
.coverpage { margin: 0; padding: 0; text-align: center; }
.coverpage img { max-width: 100%; height: auto; }
nav ol { list-style: none; padding-left: 0; }
nav li { margin: 0.4em 0; font-family: 'Helvetica Neue', Arial, sans-serif; }
"""

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=os.path.join(ROOT, "build", "Talosapien.epub"))
    args = ap.parse_args()
    build(args.out)
