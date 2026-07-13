/* VP Architecture — site interactions & project rendering */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     PROJECT DATA
     Edit this list to manage your portfolio. To use a real photo, add an
     "img" path, e.g. img: "assets/images/courtyard-house.jpg".
     Categories are grouped by the "category" field and rendered on
     projects.html in the order below.
  --------------------------------------------------------------------- */
  var PROJECTS = [
    // ---- Residential ----
    { cat: "Residential", title: "Courtyard House", loc: "Ahmedabad", year: "2023", area: "6,200 sq.ft.", status: "Completed",
      desc: "A family home organised around a shaded central court that draws breeze and daylight deep into the plan. Exposed brick, lime plaster and local stone anchor the house to its climate and context." },
    { cat: "Residential", title: "Slate & Teak Residence", loc: "Pune", year: "2021", area: "4,800 sq.ft.", status: "Completed",
      desc: "A restrained material palette of slate, teak and lime lends this urban home a quiet, tactile calm across three levels, with a double-height living space at its heart." },
    { cat: "Residential", title: "The Verandah Apartment", loc: "Mumbai", year: "2020", area: "3,100 sq.ft.", status: "Completed",
      desc: "A high-rise apartment reimagined around a generous wraparound verandah that reconnects city living with sky and breeze." },

    // ---- Bungalows & Villas ----
    { cat: "Bungalows & Villas", title: "Mango Grove Villa", loc: "Alibaug", year: "2023", area: "9,400 sq.ft.", status: "Completed",
      desc: "A weekend villa woven between existing mango trees, with sliding walls that dissolve the boundary between living spaces and garden." },
    { cat: "Bungalows & Villas", title: "Hillside Bungalow", loc: "Lonavala", year: "2022", area: "7,800 sq.ft.", status: "Completed",
      desc: "Terraced into a steep slope, the bungalow steps down the hillside so every room opens to a framed valley view." },
    { cat: "Bungalows & Villas", title: "The White Villa", loc: "Goa", year: "2024", area: "8,200 sq.ft.", status: "Under construction",
      desc: "A luminous white villa of courtyards and pergolas, tuned to the Goan light and the slow pace of coastal living." },

    // ---- Commercial ----
    { cat: "Commercial", title: "The Terrace Offices", loc: "Bengaluru", year: "2022", area: "48,000 sq.ft.", status: "Completed",
      desc: "A workplace conceived as a series of landscaped terraces, blurring the line between built and green. Deep overhangs and operable façades keep the interiors naturally cool." },
    { cat: "Commercial", title: "Brick Stack Headquarters", loc: "Hyderabad", year: "2021", area: "72,000 sq.ft.", status: "Completed",
      desc: "A perforated brick screen wraps the corporate headquarters, filtering harsh western sun while giving the building a distinctive civic presence." },
    { cat: "Commercial", title: "Studio Loft Block", loc: "Ahmedabad", year: "2019", area: "36,000 sq.ft.", status: "Completed",
      desc: "A flexible block of studios and offices arranged around a shaded internal street that encourages chance encounters." },

    // ---- Malls & Retail ----
    { cat: "Malls & Retail", title: "Riverfront Mall", loc: "Surat", year: "2020", area: "480,000 sq.ft.", status: "Completed",
      desc: "A daylit retail destination organised around a top-lit atrium and a riverfront promenade of cafés and public terraces." },
    { cat: "Malls & Retail", title: "The Market Arcade", loc: "Jaipur", year: "2018", area: "120,000 sq.ft.", status: "Completed",
      desc: "A contemporary reinterpretation of the traditional bazaar — a shaded arcade of shopfronts strung along a cool, colonnaded spine." },

    // ---- Hospitality ----
    { cat: "Hospitality", title: "Riverside Retreat", loc: "Coorg", year: "2024", area: "22,000 sq.ft.", status: "Completed",
      desc: "A boutique retreat of stone cottages stepping down toward the water, designed to disappear into the plantation landscape and frame long, quiet views." },
    { cat: "Hospitality", title: "Desert Courtyard Hotel", loc: "Jaisalmer", year: "2021", area: "65,000 sq.ft.", status: "Completed",
      desc: "A hotel of thick sandstone walls and deep courtyards that keep the interiors cool, referencing the region's havelis and forts." },
    { cat: "Hospitality", title: "The Banyan Restaurant", loc: "Bengaluru", year: "2022", area: "8,500 sq.ft.", status: "Completed",
      desc: "An all-day dining pavilion built around a mature banyan tree, with a lattice roof that dapples light across the tables below." }
  ];

  var CATEGORY_ORDER = ["Residential", "Bungalows & Villas", "Commercial", "Malls & Retail", "Hospitality"];
  var CATEGORY_NOTES = {
    "Residential": "Private homes and apartments designed around light, air and the rhythms of family life.",
    "Bungalows & Villas": "Standalone homes and weekend retreats set within their landscapes.",
    "Commercial": "Workplaces and mixed-use buildings that balance performance with delight.",
    "Malls & Retail": "Retail environments and destinations designed around movement and daylight.",
    "Hospitality": "Hotels, resorts and restaurants shaped for memorable arrival and repose."
  };

  /* ---------------------------------------------------------------------
     Placeholder architectural line-art (used when a project has no photo)
  --------------------------------------------------------------------- */
  function rng(seed) { var s = seed % 2147483647; if (s <= 0) s += 2147483646; return function () { s = s * 16807 % 2147483647; return (s - 1) / 2147483646; }; }
  function scene(seed, w, h) {
    var r = rng(seed), i, ink = 'currentColor';
    var svg = '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="display:block;color:var(--ph-ink)">';
    svg += '<rect width="' + w + '" height="' + h + '" fill="' + ink + '" opacity="0.045"/>';
    var cx = (0.62 + r() * 0.28) * w, cy = (0.16 + r() * 0.16) * h, cr = (0.05 + r() * 0.05) * w;
    svg += '<circle cx="' + cx.toFixed(0) + '" cy="' + cy.toFixed(0) + '" r="' + cr.toFixed(0) + '" fill="' + ink + '" opacity="0.07"/>';
    var masses = 2 + Math.floor(r() * 2);
    for (i = 0; i < masses; i++) {
      var bw = (0.24 + r() * 0.3) * w, bh = (0.4 + r() * 0.45) * h;
      var bx = (0.06 + r() * 0.7) * w - bw * 0.2, by = h - bh;
      svg += '<rect x="' + bx.toFixed(0) + '" y="' + by.toFixed(0) + '" width="' + bw.toFixed(0) + '" height="' + bh.toFixed(0) + '" fill="' + ink + '" opacity="' + (0.05 + i * 0.03).toFixed(2) + '"/>';
      var floors = 3 + Math.floor(r() * 6);
      for (var f = 1; f < floors; f++) { var ly = by + bh * f / floors; svg += '<line x1="' + bx.toFixed(0) + '" y1="' + ly.toFixed(0) + '" x2="' + (bx + bw).toFixed(0) + '" y2="' + ly.toFixed(0) + '" stroke="' + ink + '" stroke-width="1" opacity="0.14"/>'; }
      var mulls = 2 + Math.floor(r() * 4);
      for (var m = 1; m < mulls; m++) { var mx = bx + bw * m / mulls; svg += '<line x1="' + mx.toFixed(0) + '" y1="' + by.toFixed(0) + '" x2="' + mx.toFixed(0) + '" y2="' + h + '" stroke="' + ink + '" stroke-width="1" opacity="0.1"/>'; }
    }
    var hz = (0.7 + r() * 0.12) * h;
    svg += '<line x1="0" y1="' + hz.toFixed(0) + '" x2="' + w + '" y2="' + hz.toFixed(0) + '" stroke="' + ink + '" stroke-width="1" opacity="0.18"/>';
    return svg + '</svg>';
  }
  function media(p, seed, w, h) {
    if (p && p.img) return '<img src="' + p.img + '" alt="' + esc(p.title) + '" loading="lazy">';
    return '<span class="ph">' + scene(seed, w, h) + '</span>';
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------------------------------------------------------------------
     Card + drawer
  --------------------------------------------------------------------- */
  function cardEl(p, seed) {
    var btn = document.createElement('button');
    btn.className = 'card reveal';
    btn.innerHTML =
      '<span class="card__media">' + media(p, seed, 800, 1000) + '<span class="card__tag">' + esc(p.cat) + '</span></span>' +
      '<span class="card__title">' + esc(p.title) + '</span>' +
      '<span class="card__meta">' + esc(p.loc) + ' · ' + esc(p.year) + '</span>';
    btn.addEventListener('click', function () { openDrawer(p, seed); });
    return btn;
  }

  var scrim, drawer;
  function ensureDrawer() {
    if (drawer) return;
    scrim = document.createElement('div'); scrim.className = 'scrim';
    drawer = document.createElement('aside'); drawer.className = 'drawer';
    drawer.setAttribute('role', 'dialog'); drawer.setAttribute('aria-modal', 'true'); drawer.setAttribute('aria-label', 'Project details');
    drawer.innerHTML =
      '<button class="drawer__x" data-x>Close ×</button>' +
      '<div class="drawer__media" data-media></div>' +
      '<div class="drawer__body"><p class="eyebrow" data-tag></p><h2 data-title></h2><div class="facts" data-facts></div><div class="drawer__desc" data-desc></div></div>';
    document.body.appendChild(scrim); document.body.appendChild(drawer);
    scrim.addEventListener('click', closeDrawer);
    drawer.querySelector('[data-x]').addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });
  }
  function openDrawer(p, seed) {
    ensureDrawer();
    drawer.querySelector('[data-tag]').textContent = p.cat;
    drawer.querySelector('[data-title]').textContent = p.title;
    drawer.querySelector('[data-media]').innerHTML = media(p, seed + 101, 1600, 1100);
    drawer.querySelector('[data-desc]').innerHTML = '<p>' + esc(p.desc) + '</p>';
    var facts = [['Category', p.cat], ['Location', p.loc], ['Year', p.year], ['Area', p.area], ['Status', p.status]].filter(function (f) { return f[1]; });
    drawer.querySelector('[data-facts]').innerHTML = facts.map(function (f) { return '<div><div class="k">' + esc(f[0]) + '</div><div class="v">' + esc(f[1]) + '</div></div>'; }).join('');
    scrim.classList.add('on'); drawer.classList.add('on'); document.documentElement.style.overflow = 'hidden';
    drawer.scrollTop = 0;
  }
  function closeDrawer() { if (!drawer) return; scrim.classList.remove('on'); drawer.classList.remove('on'); document.documentElement.style.overflow = ''; }

  /* ---------------------------------------------------------------------
     Renderers
  --------------------------------------------------------------------- */
  function renderCategories(host) {
    var seed = 11;
    CATEGORY_ORDER.forEach(function (cat) {
      var items = PROJECTS.filter(function (p) { return p.cat === cat; });
      if (!items.length) return;
      var sec = document.createElement('section');
      sec.className = 'category';
      sec.id = cat.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
      var head = '<div class="cat-bar reveal"><h2>' + esc(cat) + '</h2><span class="count">' + items.length + (items.length === 1 ? ' Project' : ' Projects') + '</span></div>';
      if (CATEGORY_NOTES[cat]) head += '<p class="cat-note">' + esc(CATEGORY_NOTES[cat]) + '</p>';
      sec.innerHTML = head + '<div class="grid"></div>';
      var grid = sec.querySelector('.grid');
      items.forEach(function (p) { grid.appendChild(cardEl(p, seed += 13)); });
      host.appendChild(sec);
    });
    observeReveals();
  }
  function renderSelected(host, count) {
    var seed = 200;
    PROJECTS.slice(0, count || 3).forEach(function (p) { host.appendChild(cardEl(p, seed += 13)); });
    observeReveals();
  }
  function fillStatic() {
    document.querySelectorAll('.ph[data-seed]').forEach(function (el) {
      if (el.innerHTML.trim()) return;
      var shape = el.getAttribute('data-shape') || 'portrait';
      var w = 800, h = 1000;
      if (shape === 'wide') { w = 1600; h = 900; }
      else if (shape === 'square') { w = 1000; h = 1000; }
      else if (shape === 'landscape') { w = 1400; h = 1000; }
      el.innerHTML = scene(parseInt(el.getAttribute('data-seed'), 10) || 5, w, h);
    });
  }

  /* ---------------------------------------------------------------------
     Nav, mobile menu, sticky header, reveal
  --------------------------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var mnav = document.querySelector('[data-mobile-nav]');
    if (toggle && mnav) {
      var x = mnav.querySelector('[data-nav-close]');
      toggle.addEventListener('click', function () { mnav.classList.add('on'); document.documentElement.style.overflow = 'hidden'; });
      function hide() { mnav.classList.remove('on'); document.documentElement.style.overflow = ''; }
      if (x) x.addEventListener('click', hide);
      mnav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', hide); });
    }
    var header = document.querySelector('[data-header]');
    if (header) {
      var last = 0;
      window.addEventListener('scroll', function () {
        var y = window.pageYOffset;
        header.style.transform = (y > last && y > 220) ? 'translateY(-100%)' : 'translateY(0)';
        last = y;
      }, { passive: true });
    }
  }

  var io;
  function observeReveals() {
    var els = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    if (!io) io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  function init() {
    initNav();
    fillStatic();
    var cats = document.querySelector('[data-projects]');
    if (cats) renderCategories(cats);
    var sel = document.querySelector('[data-selected]');
    if (sel) renderSelected(sel, parseInt(sel.getAttribute('data-selected'), 10) || 3);
    observeReveals();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
