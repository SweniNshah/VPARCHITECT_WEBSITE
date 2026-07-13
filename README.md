# VP Architecture — Portfolio Website

Editorial portfolio site for **VP Architecture**, a Mumbai-based husband-and-wife
architecture & interior design studio led by **Piyush Shah** and **Vaishali Shah**.

## What's here

| Path | Description |
|------|-------------|
| [`portfolio.html`](portfolio.html) | **Primary deliverable** — a single, self-contained one-page site (no build step, no dependencies except Google Fonts). Open it directly in any browser. |
| [`deploy/index.html`](deploy/index.html) | Deploy-ready copy of the site (renamed to `index.html`) for static hosting. |
| [`website/`](website/) | Earlier multi-page version (index / projects / about / accomplishments / clients / contact / developers). |
| `.claude/launch.json` | Local dev-server config for previewing. |

## Design

- **Palette:** crisp white / near-black with a brown-bronze accent; automatic light & dark mode.
- **Type:** Space Grotesk (headings) + Inter (body).
- **Sections:** hero, filterable project grid (Residential · Commercial & Malls · Hospitality · Bungalows & Villas), studio / founders, accomplishments timeline, clients, contact.
- **Placeholders:** clean generated SVG line-art stands in until final project photography is supplied.

## Run locally

Just open `portfolio.html` in a browser, or serve the folder:

```bash
python -m http.server 5510
# then visit http://localhost:5510/portfolio.html
```

## Deploy

The site is fully static. Drop `deploy/index.html` (or the whole `deploy/` folder)
onto any static host — Cloudflare Pages, Netlify, Vercel, or GitHub Pages — and point
`vparchitect.in` at it.
