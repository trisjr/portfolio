# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — local dev server at `localhost:4321`
- `npm run build` — production build to `./dist/`
- `npm run preview` — preview the production build locally
- `npm run astro check` — type-check `.astro`/content (the repo extends `astro/tsconfigs/strict`)
- `npm run og` — regenerate the social-share image `public/og.png` via `scripts/gen-og.mjs`. Requires `sharp`, which is **not** a declared dependency — install it (`npm i -D sharp`) before running. Re-run only when the brand/role/tagline baked into the script changes.

There is no test suite or linter configured. Node `>=22.12.0` is required.

## Architecture

Static personal portfolio built with **Astro 6**, no UI framework, deployed to **GitHub Pages**. Dependencies are minimal: `astro`, `@astrojs/rss`, `@astrojs/sitemap`.

### Base path is the central gotcha
The site ships under a subpath (`base: '/portfolio'`, `site: 'https://trisjr.github.io'` in `astro.config.mjs`). **Every internal link and asset reference must go through the `url()` helper in `src/lib/path.ts`** — it prefixes `import.meta.env.BASE_URL`. Hard-coding `/foo` paths will 404 in production. This includes `<a href>`, `src` for `/public` assets, etc.
- For **absolute** URLs needed in meta tags / feeds (e.g. `og:image`, RSS `link`), wrap the result again: `new URL(url("/og.png"), Astro.site)` — `url()` adds the base, `Astro.site` adds the origin.

### Content-driven, not hard-coded
Page copy and data live in Markdown collections under `src/content/`, with schemas defined in `src/content.config.ts` (uses the `glob` loader + Zod). Four collections:
- **`projects`** — one `.md` per project. Listed on `projects.astro` as filterable cards (filter = first segment of `category`, split on `" · "`) with deep-linkable modals, and each also gets a standalone detail page via the dynamic route `projects/[slug].astro`. Sorted by frontmatter `order`. `responsibilities` (area-grouped bullets) falls back to `highlights` on the detail page when empty. `startDate`/`endDate` use `"YYYY-MM"`; omit `endDate` when ongoing and set `current: true`.
- **`blog`** — one `.md` per post; listed on `blog/index.astro`, rendered via `blog/[slug].astro`, and syndicated through the RSS endpoint `src/pages/rss.xml.js` (sorted by `pubDate` desc).
- **`lab`** — one `.md` per interactive experiment; listed on `lab/index.astro`, rendered via `lab/[slug].astro`. The frontmatter `demo` key maps to an interactive component under `src/components/lab/` — wired by an explicit conditional in `lab/[slug].astro` (`solar-system` → `SolarSystem`, `gravity-sandbox` → `GravitySandbox`, `slingshot` → `Slingshot`). **Adding a new demo requires registering both the component import and a new conditional there.** Leave `demo` empty (`""`) for a writeup-only entry. `status` is `live | wip | concept` (shown as a status pill).
- **`profile`** — a single entry `me.md`; holds all site-wide identity/nav/footer/about/contact data, plus the optional `cv` object rendered on `/resume`. `Layout.astro` loads it via `getEntry("profile", "me")`. This is the single source of truth for the persona shown across every page.

When changing site text, prefer editing the relevant Markdown frontmatter over editing `.astro` templates. Note frontmatter coupling: in the `profile` `constellation`, `links` reference `nodes` **by array index** — keep node order stable.

### Pages & routing
`src/pages/`: `index.astro` (home), `projects.astro` + `projects/[slug].astro`, `lab/index.astro` + `lab/[slug].astro`, `blog/index.astro` + `blog/[slug].astro`, `about.astro`, `contact.astro`, `resume.astro`, `404.astro`, and `rss.xml.js`. The three `[slug]` detail routes use `getStaticPaths` and compute `prev`/`next` (and projects' `related`) by `order` for pager navigation.

### Layout & styling
- `src/layouts/Layout.astro` is the single shell (nav, mobile drawer, footer, "tweaks" panel, back-to-top) wrapping every page. Props: `title`, `active` (`home | projects | lab | blog | about | contact`), `description`, `ogImage`, `ogType` — it emits the full OG/Twitter meta, canonical link, and RSS `<link>`.
- Global styles + the animated starfield background live in `src/styles/space.css`; per-page CSS in `src/styles/pages/*.css`, imported directly by each page.
- `build.inlineStylesheets: 'always'` — all CSS is inlined into the HTML at build time.
- Client behavior is plain vanilla JS: shared/global script `public/assets/space.js` (loaded via `is:inline` in the layout), plus per-page inline `<script slot="scripts">` blocks (e.g. project modal/filter logic in `projects.astro`, reveal-on-scroll in the detail pages). No bundled client framework.
- `src/components/Icon.astro` is an inline-SVG icon registry keyed by `name`; add new glyphs to its `paths` map (and the `filled` list for fill-style icons).

### Tint convention
Project/blog/lab `tint` frontmatter is a bare RGB triplet string (e.g. `"120, 80, 255"`), interpolated into `rgb(...)`/`rgba(...)` in inline styles — not a hex color.

## Deployment
`.github/workflows/deploy.yml` builds with `withastro/action` and deploys to GitHub Pages on push to `main`. The `@astrojs/sitemap` integration emits a sitemap at build time. If `base`/`site` in `astro.config.mjs` change, the deployed URL changes accordingly.

## Commit messages
Single line, format `<type>(<scope>): <short summary>`. No co-author trailer.
