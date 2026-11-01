---
title: HPMA Tools
category: AdTech · Automation
tagline: A Meta Business Manager automation suite — a bulk-operations web console paired with HPMA Copilot, a browser extension that runs BM jobs safely.
year: "2026"
startDate: "2026-10"
current: true
role: Web Developer
teamSize: 3
stack: ["React 19", "TypeScript", "Manifest V3", "Vite + CRXJS", "Tailwind CSS 4", "DaisyUI 5", "Firebase Realtime DB", "Meta Graph API", "NestJS 11", "PostgreSQL", "Prisma", "Redis", "BullMQ", "TanStack Router/Query", "shadcn/ui", "Vitest", "Playwright", "Docker"]
featured: false
tint: "140,82,255"
order: 5
highlights:
  - MV3 copilot with dry-run, human confirmation, safe pacing and an audit log
  - Graph API partner assignment verified against the BM Requests page before approval
  - Bulk jobs of up to 2,500 accounts each, FIFO per BM with 3 BMs in parallel
responsibilities:
  - area: Browser Extension — HPMA Copilot
    items:
      - Built the Manifest V3 DOM-automation engine, side panel and popup that run Business Manager partner assignment, request approval and request scans with dry-run, human-in-the-loop confirmation, safe pacing and an audit log.
      - Implemented the HPMA Tools runtime protocol — profile identity, readiness, permit-gated job runners and a Firebase realtime transport — replacing the legacy relay.
      - Added Graph API partner assignment with two-stage verification against Meta's Requests page, session-token ad-account inventory and auto-filled 2FA codes from the backend.
      - Wrote a Firebase coordinator / ops CLI covered by Realtime Database rules tests.
  - area: Web App — HPMA Tools
    items:
      - Added encrypted worker 2FA secret storage with a TOTP code API so extension workers can pass Meta's two-factor prompts.
      - Extended the extension integration on the NestJS API/worker — binding approval requests inside the approve step, force-releasing BM barriers stuck by uncertain writes, worker presence signals and stuck-job completion.
links:
  live: "https://tools.nomad.id.vn/"
  code: "https://github.com/tenomad-company/hpma-ext"
---

HPMA Tools lets an admin run Meta Business Manager operations at scale — bulk ad-account creation and edits, partner sharing, Awareness campaigns and BM member approvals — as FIFO jobs per BM with pause/resume/retry, reconciliation of uncertain results and CSV export. Its companion, HPMA Copilot, is a Manifest V3 extension that picks up device jobs from Tools and carries out the steps Meta only exposes in the Business Manager UI, such as partner assignment and request approval, the way a careful human operator would.
