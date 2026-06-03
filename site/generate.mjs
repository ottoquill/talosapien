// Generate Hugo content/ from the canonical ../wiki tree. The wiki is never modified.
//
// For each wiki/*.md file we:
//   1. lift the first `# H1` into a frontmatter `title` and strip it from the body
//      (Hugo Book renders the title itself, so leaving the H1 would double it);
//   2. rename the three `00-*index.md` hub pages to `_index.md` so they become
//      Hugo section landing pages;
//   3. rewrite every relative `.md` (and directory) link to its absolute Hugo URL.
//
// Because every wiki filename is already lowercase-kebab, the Hugo slug equals the
// filename, so URLs are computed directly — no render hook required.

import { promises as fs } from "node:fs";
import path from "node:path";

const SITE = path.dirname(new URL(import.meta.url).pathname);
const WIKI = path.resolve(SITE, "..", "wiki");
const OUT = path.resolve(SITE, "content");

const isIndex = (base) => /^00-.*index\.md$/.test(base);
const LINK = /(!?)\[([^\]]*)\]\(([^)\s]+)(\s+"[^"]*")?\)/g;

// Map a wiki-relative target (anchor already stripped) to an absolute Hugo URL.
// Hugo lowercases URL paths, so we do too (only SOURCES.md differs from its slug).
function toURL(rel) {
  const base = path.posix.basename(rel);
  if (isIndex(base)) {
    const d = path.posix.dirname(rel);
    return d === "." ? "/" : `/${d.toLowerCase()}/`;
  }
  const clean = rel.endsWith(".md") ? rel.slice(0, -3) : rel.replace(/\/+$/, "");
  return `/${clean.toLowerCase()}/`;
}

function rewriteLinks(body, dirPosix) {
  return body.replace(LINK, (m, bang, text, target, title = "") => {
    if (/^([a-z]+:|\/|#)/i.test(target)) return m; // external, absolute, anchor-only
    const hash = target.indexOf("#");
    const pathPart = hash === -1 ? target : target.slice(0, hash);
    const anchor = hash === -1 ? "" : target.slice(hash);
    if (!pathPart) return m;
    const resolved = path.posix.normalize(path.posix.join(dirPosix, pathPart));
    // Links that escape wiki/ (repo files: manuscript, build, docs…) aren't on the
    // public site — drop the hyperlink but keep the visible text.
    if (resolved.startsWith("..")) return text;
    return `${bang}[${text}](${toURL(resolved)}${anchor}${title})`;
  });
}

const humanize = (s) =>
  s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// Every directory needs an _index.md to be a real Hugo section (nested dirs are not
// auto-promoted). Pages with a hub already have one; give the rest a titled stub.
async function ensureSections(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  if (dir !== OUT && !entries.some((e) => e.name === "_index.md")) {
    const fm = `---\ntitle: ${JSON.stringify(humanize(path.basename(dir)))}\n---\n`;
    await fs.writeFile(path.join(dir, "_index.md"), fm);
  }
  for (const e of entries)
    if (e.isDirectory()) await ensureSections(path.join(dir, e.name));
}

async function walk(rel = "") {
  const out = [];
  for (const e of await fs.readdir(path.join(WIKI, rel), { withFileTypes: true })) {
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...(await walk(r)));
    else if (e.isFile() && e.name.endsWith(".md")) out.push(r);
  }
  return out;
}

// Lift the first H1 into the frontmatter title (for the sidebar/menu and <title>),
// but leave it in the body — the Book theme renders no title of its own, so the H1
// is the page's visible heading.
function titleFromBody(text) {
  const m = text.match(/^# (.+?)\s*$/m);
  return m ? m[1].replace(/[*`_]/g, "").trim() : null;
}

await fs.rm(OUT, { recursive: true, force: true });
const files = await walk();

for (const rel of files) {
  const base = path.posix.basename(rel);
  const dirPosix = path.posix.dirname(rel);
  const raw = await fs.readFile(path.join(WIKI, rel), "utf8");

  const title = titleFromBody(raw);
  const linked = rewriteLinks(raw, dirPosix);
  const fm = `---\ntitle: ${JSON.stringify(title ?? base.replace(/\.md$/, ""))}\n---\n`;

  const outRel = isIndex(base)
    ? path.posix.join(dirPosix === "." ? "" : dirPosix, "_index.md")
    : rel;
  const dest = path.join(OUT, outRel);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, fm + linked);
}

await ensureSections(OUT);
console.log(`generated ${files.length} pages -> ${path.relative(SITE, OUT)}/`);
