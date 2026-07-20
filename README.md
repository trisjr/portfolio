# 🌌 TrisJr — Portfolio

> Personal portfolio of **TrisJr** — Full-Stack Developer & AI-Native Architect, building fast, thoughtful, AI-native software from Hue, Vietnam.

**🔗 Live site:** [trisjr.github.io/portfolio](https://trisjr.github.io/portfolio)

A space-themed, content-driven portfolio built with [Astro](https://astro.build) — no UI framework, minimal dependencies, fully static, and deployed to GitHub Pages.

## ✨ Features

- **🪐 Projects showcase** — filterable project cards with deep-linkable modals and standalone detail pages, grouped by category
- **🧪 The Lab** — interactive experiments (solar system, gravity sandbox, slingshot) built with vanilla JS canvas demos
- **✍️ Blog** — Markdown posts with an RSS feed
- **📄 Résumé page** — CV rendered straight from content data
- **🌠 Animated starfield** — pure CSS/JS space background with a live "tweaks" panel
- **🔍 SEO-ready** — Open Graph / Twitter meta, canonical links, sitemap, and a generated social-share image

## 🛠️ Tech Stack

| Layer      | Choice                                                    |
| :--------- | :-------------------------------------------------------- |
| Framework  | [Astro 6](https://astro.build) (static output)             |
| Content    | Markdown collections + Zod schemas (`src/content.config.ts`) |
| Styling    | Hand-written CSS (`src/styles/`), inlined at build time    |
| Client JS  | Vanilla JavaScript — no bundled framework                  |
| Feeds      | `@astrojs/rss`, `@astrojs/sitemap`                         |
| Deployment | GitHub Pages via GitHub Actions                            |

## 🚀 Getting Started

Requires **Node.js >= 22.12.0**.

```sh
# Install dependencies
npm install

# Start the dev server at localhost:4321
npm run dev
```

## 🧞 Commands

All commands are run from the root of the project:

| Command               | Action                                              |
| :-------------------- | :-------------------------------------------------- |
| `npm install`         | Install dependencies                                |
| `npm run dev`         | Start local dev server at `localhost:4321`          |
| `npm run build`       | Build the production site to `./dist/`              |
| `npm run preview`     | Preview the production build locally                |
| `npm run astro check` | Type-check `.astro` files and content collections   |
| `npm run og`          | Regenerate the social-share image (`public/og.png`) |

## 📁 Project Structure

```text
/
├── public/               # Static assets (avatar, og image, shared JS)
├── scripts/
│   └── gen-og.mjs        # Social-share image generator
├── src/
│   ├── components/       # Icon registry + interactive lab demos
│   ├── content/
│   │   ├── blog/         # Blog posts (Markdown)
│   │   ├── lab/          # Lab experiment writeups
│   │   ├── projects/     # One .md per project
│   │   └── profile/      # me.md — single source of truth for identity/nav/CV
│   ├── layouts/
│   │   └── Layout.astro  # Shared shell: nav, footer, meta tags, drawer
│   ├── lib/
│   │   └── path.ts       # url() helper for base-path-safe links
│   ├── pages/            # index, projects, lab, blog, about, contact, resume, rss
│   └── styles/           # Global space theme + per-page CSS
└── astro.config.mjs      # site + base ('/portfolio') configuration
```

## 📝 Content-Driven Design

All page copy and data live in Markdown under `src/content/` — editing the site rarely means touching a template:

- **`projects/`** — each project is one `.md` file with frontmatter (category, tech, highlights, timeline)
- **`blog/`** — posts syndicated automatically through `/rss.xml`
- **`lab/`** — experiments; the `demo` frontmatter key wires up an interactive component
- **`profile/me.md`** — one file holding the name, bio, skills, job history, and CV shown across every page

> **Note:** the site is served under a base path (`/portfolio`), so all internal links go through the `url()` helper in `src/lib/path.ts` to avoid broken paths in production.

## 📦 Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site with [`withastro/action`](https://github.com/withastro/action) and publishes it to **GitHub Pages**.

## 📬 Contact

- 🌐 Website: [trisjr.github.io/portfolio](https://trisjr.github.io/portfolio)
- 💼 GitHub: [@trisjr](https://github.com/trisjr)

---

Built with ☕ and far too much coffee — © TrisJr
