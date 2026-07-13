# VP Architecture — Website

A minimal, image-forward portfolio website for an architecture & interior design studio,
inspired by kpaindia.in, studiosangath.org and abrahamjohnarchitects.com.

Plain **HTML + CSS + JavaScript** — no framework, no build step, no Shopify. It works by
opening the files directly, and can be hosted for free on Netlify, GitHub Pages, Vercel,
Cloudflare Pages or any web host.

## Pages
| File | Page |
|------|------|
| `index.html` | Home — hero, intro, selected work, stats, approach |
| `projects.html` | Projects, grouped into **Residential, Bungalows & Villas, Commercial, Malls & Retail, Hospitality**. Click any project for a detail drawer (description, location, year, area, status). |
| `about.html` | About Us — studio story, the two founders, stats, the team |
| `accomplishments.html` | Awards & press by year |
| `clients.html` | Client logos/names + testimonial |
| `developers.html` | Developer partners + call to action |
| `contact.html` | Studio details + contact form |

## View it locally
Just double-click `index.html` — it opens in your browser. (For the project drawer and
placeholder graphics to render, keep the `assets/` folder next to the HTML files.)

Or run a tiny local server (nicer for testing):
```bash
cd website
python -m http.server 8000      # then open http://localhost:8000
```

## Make it yours

### 1. Projects
All projects live in one place: **`assets/js/main.js`**, at the top in the `PROJECTS` list.
Each entry looks like:
```js
{ cat: "Residential", title: "Courtyard House", loc: "Ahmedabad", year: "2023",
  area: "6,200 sq.ft.", status: "Completed", desc: "..." },
```
- Add, remove or reorder entries freely.
- The category comes from `cat` — use one of the five names in `CATEGORY_ORDER`
  (or add a new one to that list and to `CATEGORY_NOTES`).
- To show a **real photo**, add `img: "assets/images/your-photo.jpg"` to a project.
  Without it, a tasteful line-art placeholder is drawn automatically.

### 2. Images
Create an `assets/images/` folder and drop in your photos. Use them by:
- Project covers → add `img:` to the project (above).
- Hero, story, portraits, team → replace the `<span class="ph" ...></span>` placeholders
  in the HTML with `<img src="assets/images/your-photo.jpg" alt="...">`.

### 3. Text, names & details
Edit the HTML directly. Replace placeholders like **Founder One**, **[School of Architecture]**,
**Client One**, award names, and the studio email/phone/address (they appear in the footer and
on `contact.html`).

### 4. Contact form
The form on `contact.html` posts to **Formspree** (free). Create a form at
[formspree.io](https://formspree.io), copy your endpoint, and replace `YOUR_FORM_ID` in
`contact.html`. Until you do, the form opens the visitor's email app pre-filled instead.

### 5. Colours & fonts
All colours, spacing and fonts are CSS variables at the top of **`assets/css/style.css`**
(`:root { ... }`). The site already adapts to the visitor's light/dark system setting — the
dark palette is in the `@media (prefers-color-scheme: dark)` block just below.

## Deploy (free)
- **Netlify / Vercel / Cloudflare Pages:** drag-and-drop the `website` folder, or connect a repo.
- **GitHub Pages:** push the folder to a repo and enable Pages on the branch.

No server or database is required — it's a fully static site.
