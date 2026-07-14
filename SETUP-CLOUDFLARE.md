# Auto-deploy: GitHub → Cloudflare Pages

Once connected, every `git push` to `main` rebuilds and publishes the live site
automatically. No more manual uploads.

The repo is already configured (`wrangler.toml` sets the build output to `deploy/`),
so the dashboard should auto-fill the settings below.

## One-time setup (do this in your Cloudflare account)

1. Go to **dash.cloudflare.com** → **Workers & Pages** → **Create** → **Pages** tab
   → **Connect to Git**.
2. Authorize **GitHub** and select the repository **`SweniNshah/VPARCHITECT_WEBSITE`**.
3. Build settings (should be pre-filled from `wrangler.toml`; if not, enter these):
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `deploy`
4. Click **Save and Deploy**. First build finishes in ~30–60s; the site goes live on
   a `*.pages.dev` URL.
5. **Custom domain:** in the new project → **Custom domains** → add `vparchitect.in`
   (or your chosen domain) → follow the DNS prompt (automatic if the domain is on
   Cloudflare).

## Note about your current site

If your current `*.workers.dev` / `*.pages.dev` site was created by **direct upload**,
Cloudflare can't convert it to Git — you create a *new* Git-connected Pages project
(steps above) and then move the custom domain over to it. The old project can be
deleted afterwards.

## From then on

Tell me a change → I edit + push to GitHub → Cloudflare rebuilds automatically.
You just refresh the page.
