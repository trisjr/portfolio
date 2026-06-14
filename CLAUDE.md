# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — local dev server at `localhost:4321`
- `npm run build` — production build to `./dist/`
- `npm run preview` — preview the production build locally
- `npm run astro check` — type-check `.astro`/content (the repo extends `astro/tsconfigs/strict`)

There is no test suite or linter configured. Node `>=22.12.0` is required.

## Architecture

Static personal portfolio built with **Astro 6**, no UI framework, deployed to **GitHub Pages**.

### Base path is the central gotcha
The site ships under a subpath (`base: '/portfolio'`, `site: 'https://trisjr.github.io'` in `astro.config.mjs`). **Every internal link and asset reference must go through the `url()` helper in `src/lib/path.ts`** — it prefixes `import.meta.env.BASE_URL`. Hard-coding `/foo` paths will 404 in production. This includes `<a href>`, `src` for `/public` assets, etc.

### Content-driven, not hard-coded
Page copy and data live in Markdown collections under `src/content/`, with schemas defined in `src/content.config.ts` (uses the `glob` loader + Zod). Three collections:
- **`projects`** — one `.md` per project; rendered on `projects.astro` as filterable cards + deep-linkable modals. Sorted by frontmatter `order`; filtered by the first segment of `category` (split on `" · "`).
- **`blog`** — one `.md` per post; listed on `blog/index.astro`, rendered via the dynamic route `blog/[slug].astro`.
- **`profile`** — a single entry `me.md`; holds all site-wide identity/nav/footer/about/contact data. `Layout.astro` loads it via `getEntry("profile", "me")`. This is the single source of truth for the persona shown across every page.

When changing site text, prefer editing the relevant Markdown frontmatter over editing `.astro` templates. Note frontmatter coupling: in the `profile` `constellation`, `links` reference `nodes` **by array index** — keep node order stable.

### Layout & styling
- `src/layouts/Layout.astro` is the single shell (nav, mobile drawer, footer, "tweaks" panel, back-to-top) wrapping every page. Pages pass `title` and `active` props.
- Global styles + the animated starfield background live in `src/styles/space.css`; per-page CSS in `src/styles/pages/*.css`, imported directly by each page.
- `build.inlineStylesheets: 'always'` — all CSS is inlined into the HTML at build time.
- Client behavior is plain vanilla JS: shared/global script `public/assets/space.js` (loaded via `is:inline` in the layout), plus per-page inline `<script slot="scripts">` blocks (e.g. project modal/filter logic in `projects.astro`). No bundled client framework.
- `src/components/Icon.astro` is an inline-SVG icon registry keyed by `name`; add new glyphs to its `paths` map (and the `filled` list for fill-style icons).

### Tint convention
Project/blog `tint` frontmatter is a bare RGB triplet string (e.g. `"120, 80, 255"`), interpolated into `rgb(...)`/`rgba(...)` in inline styles — not a hex color.

## Deployment
`.github/workflows/deploy.yml` builds with `withastro/action` and deploys to GitHub Pages on push to `main`. If `base`/`site` in `astro.config.mjs` change, the deployed URL changes accordingly.

## Commit messages
Single line, format `<type>(<scope>): <short summary>`. No co-author trailer.
