# Talosapien wiki — public site

Static site built from [`../wiki/`](../wiki/) with [Hugo](https://gohugo.io) (Book theme),
deployed to **Cloudflare Workers** static assets.

The `wiki/` Markdown is the source of truth and is never edited here. `generate.mjs`
mirrors it into `content/` (gitignored): it lifts each page's `# H1` into the title,
renames the `00-*index.md` hubs to `_index.md` section pages, and rewrites all `.md`
links to absolute URLs.

## Local

```bash
cd site
npm install
npm run dev      # generate + hugo server at http://localhost:1313
npm run build    # generate + hugo --gc --minify -> ./public
```

`hugo` is pinned via the `hugo-extended` dev dependency; no system Hugo needed.

## Deploy (Cloudflare Workers Builds)

Connect the repo to a Worker named `talosapien-wiki` (dash → Workers → Settings → Builds):

| Setting        | Value                    |
| -------------- | ------------------------ |
| Root directory | `site`                   |
| Build command  | `npm ci && npm run build`|
| Deploy command | `npx wrangler deploy` (default) |

Pushes to the production branch build and deploy; other branches get preview versions.
Set `HUGO_BASEURL` as a build env var to the final domain (overrides the placeholder in
`hugo.toml`). Manual deploy: `npm run deploy`.
