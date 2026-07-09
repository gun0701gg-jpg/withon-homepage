# CLAUDE.md

This file guides Claude Code (and other AI assistants) working in this repository.

## Project overview

This is the marketing website for **위드온 (withon)**, a Korean senior-care
company that operates a nursing home, a home-care service, and a medical
equipment ("welfare devices") store. The site is a small, static,
mobile-first brochure site — four HTML pages, one shared stylesheet, one
tiny JS file, no build step, no framework, no package manager.

All content is in Korean (`lang="ko"`).

## Repository structure

```
index.html                 Home page (landing page with nav drawer + links to the 3 business units)
village/index.html         "withon 서서울 빌리지" — the nursing home (요양원)
home-service/index.html    "withon home service" — home-visit care (재가복지센터)
store/index.html           "withon store" — medical/welfare equipment rental & sales (복지용구사업소)
assets/css/style.css       Single shared stylesheet for all pages
assets/js/main.js          Single shared script — only handles the mobile nav drawer open/close
assets/images/             Logo, character illustration, staff photos
serve.ps1                  Minimal PowerShell static file server (Windows dev convenience)
.claude/launch.json        VS Code/editor launch config that runs serve.ps1 on port 5500
```

There is no `package.json`, no bundler, and no test suite — this is plain
HTML/CSS/JS meant to be viewed directly or served as static files.

## Page architecture

- `index.html` is the only page with a **hamburger menu** (`.menu-btn`) that
  opens a slide-in nav drawer (`.nav-drawer`) linking to the three business
  unit pages plus in-page anchors (`#location`, `tel:` link).
- The three sub-pages (`village`, `home-service`, `store`) each use a
  **back-button header** (`.site-header.with-back`) instead of the drawer —
  they're conceptually one level "deeper" than the home page.
- Every page follows the same top-to-bottom section order: header → hero →
  (optional fact-strip / info-box) → content sections (`.card-list` of
  `.card`s) → contact CTA (`.contact-row`) → footer with address/phone and
  links to the *other* pages.
- All pages share the same footer contact info: address
  `서울시 구로구 목동남로 32, 위드온빌딩`, phone `02-2060-1000`.

## Path conventions — read before adding pages

`index.html` lives at repo root, so it references assets as `assets/...`.
The three sub-pages live one directory down, so they reference assets and
other pages as `../assets/...` and `../index.html`, `../village/index.html`,
etc. **When copying markup between the root page and a sub-page (or adding
a new sub-page), you must adjust every relative path** — this is a common
source of broken links/images in this codebase since there's no templating
engine to do it automatically.

If you add a new business-unit page, mirror the existing folder pattern
(`<slug>/index.html`) and update the nav drawer in `index.html` and the
`.foot-links` in every other page's footer to include it.

## Styling conventions

- Design tokens live in `:root` in `assets/css/style.css` (`--navy`,
  `--orange`, `--cream`, `--text`, `--border`, etc.). Always reuse these
  custom properties instead of hardcoding new colors.
- Layout is a single centered column capped at `--max-width: 480px`
  (`.page`) — this is a mobile-app-style layout, not a responsive
  multi-breakpoint desktop layout. Keep new UI within that column width.
- The brand wordmark "withon" is always split into two `<span>`s —
  `<span class="with">with</span><span class="on">on</span>` — so "with" is
  navy and "on" is orange. Reuse this pattern anywhere the brand name
  appears in running text/headings.
- Icons come from **Tabler Icons** via the CDN webfont
  (`@tabler/icons-webfont`, `<i class="ti ti-*">`) — loaded via `<link>` in
  every page's `<head>`, not bundled locally.
- Font is **Noto Sans KR**, loaded via Google Fonts `@import` in
  `style.css`.
- Reusable component classes: `.card` / `.card-list` (list rows with icon +
  title + description), `.info-box` (highlighted description block),
  `.fact-strip` (dark navy stat row, used on the village page), `.btn` /
  `.btn-primary` / `.btn-secondary` (contact CTAs), `.staff-card` (contact
  person row with photo, used on the home-service page).
- Inline `style="..."` attributes are used liberally in the HTML for
  one-off spacing tweaks rather than adding new CSS classes — this matches
  the existing style; follow it for small tweaks, but add a real class in
  `style.css` for anything reused more than once.

## JavaScript

`assets/js/main.js` is intentionally minimal: it only wires up the nav
drawer's open/close/backdrop-click behavior on `index.html`. It's a no-op
on sub-pages (`if (!drawer) return;`). Keep additions similarly small and
dependency-free — there's no build step to bundle a framework.

## Assets

- `assets/images/staff-parkeunjeong.png` and `assets/images/staff-seomijin.png`
  exist in the repo but are **not currently referenced** by any page —
  likely staged for a future staff-bio section. Don't delete them without
  checking with the user first.
- `guide-character.png` is used in the `.staff-card` on `home-service/index.html`.
- Images are large (1–1.8 MB PNGs); if adding new images, prefer
  reasonably compressed assets given this is a mobile-first site.

## Running locally

There's no dev server dependency to install. Two options:
- Open the HTML files directly in a browser (works fine since there's no
  build step), or
- Run `serve.ps1` (Windows PowerShell) to serve the repo root at
  `http://localhost:5500/`, matching `.claude/launch.json`'s
  `withon-static-server` config. This is a from-scratch `HttpListener`
  script with a small MIME-type map — extend the `$mime` hashtable there if
  you add new file extensions (e.g. `.woff2`, `.svg` already partially
  covered).

On non-Windows environments (e.g. this remote session), just open the HTML
files directly or serve the directory with any static file server
(`python3 -m http.server`, etc.) — `serve.ps1` won't run outside PowerShell.

## Workflow notes

- No linter, formatter, or test suite is configured. Verify changes by
  opening the affected page(s) in a browser and checking the console for
  errors.
- Since every page duplicates the header/hero/footer markup (no shared
  template/partial system), a global content change (e.g. phone number,
  address, footer links) must be updated **in every HTML file** by hand.
- Commit messages in this repo so far are in Korean; match that convention
  unless told otherwise.
