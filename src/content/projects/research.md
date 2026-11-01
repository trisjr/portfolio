---
title: SME-WebFast
category: R&D · Automation
tagline: An AI-driven pipeline that turns a client brief into a CMS-backed SME website — from analysis docs and a design system to Astro code and deployment.
year: "2026"
startDate: "2026-05"
endDate: "2026-06"
role: Creator & Lead Developer
teamSize: 4
stack: ["Astro 5", "React 19", "Payload CMS 3", "Next.js", "PostgreSQL", "Tailwind CSS 4", "shadcn/ui", "GSAP", "Turborepo", "Dokploy", "AI Skills"]
featured: false
tint: "0,245,170"
order: 9
highlights:
  - 11 slash-command workflows from client-brief import to Dokploy deploy
  - Astro theme that pulls its design tokens from each client's design.md
  - Payload CMS with 27 page blocks, seeded and rendered page by page
responsibilities:
  - area: AI Build Workflow
    items:
      - Created the repo and turned a one-off client build into a reusable SME-WebFast template, with import, analysis, design and codegen workflows that go from client files to PRDs, page specs and Astro pages.
      - Wrote `wf-refine`, built on the Impeccable skill, to rework generic AI-generated pages into branded designs, and made CSS token prefixes come from each project's design config.
  - area: CMS & Frontend
    items:
      - Built the Payload CMS layer (pages, media, navigation and footer globals) and most of its 27 content blocks, with audit, build and integrate workflows that seed static content and wire pages to a Section Renderer.
      - Added live preview, idempotent seed scripts, rich-text and icon fields, and shared GSAP animation styles across the Astro block components.
links:
  live: "#"
  code: "https://github.com/tenomad-company/tnm-webfast"
---

SME-WebFast is an R&D pipeline that automates building marketing websites for small businesses, from importing a client's brief to shipping a deployed site. Slash-command workflows produce the PRD, sitemap, design system and Astro pages; a Payload CMS backend with reusable blocks makes the site editable, and a refine step reworks generic AI-generated layouts into on-brand designs.
