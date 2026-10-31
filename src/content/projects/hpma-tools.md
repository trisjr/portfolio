---
title: HPMA Tools
category: AdTech · Automation
tagline: A Meta Business Manager automation suite — a bulk-operations web console paired with a browser-extension copilot that runs jobs safely.
year: "2026"
startDate: "2026-10"
current: true
role: Web Developer
teamSize: 3
stack: ["React 19", "TypeScript", "TanStack Router/Query", "Tailwind CSS", "shadcn/ui", "NestJS", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Docker", "Playwright", "Manifest V3", "Vite + CRXJS", "DaisyUI", "Firebase", "Meta Graph API"]
featured: false
tint: "140,82,255"
order: 5
highlights:
  - Bulk ad-account jobs of up to 2,500 accounts each, FIFO per BM with 3 BMs in parallel
  - MV3 copilot for Chrome & Firefox with dry-run, human confirmation, safe pacing and audit log
  - Tools ↔ extension protocol with device jobs, durable recovery and TOTP 2FA
responsibilities:
  - area: Browser Extension — HPMA Copilot
    items:
      - Built a Manifest V3 extension (Chrome, Edge, Firefox) that automates Business Manager tasks through the DOM — assigning partners, sharing datasets/pixels, managing users and renaming assets — with dry-run, human-in-the-loop confirmation, safe pacing and an audit log.
      - Implemented the HPMA Tools protocol — auto-connecting profiles, executing granted job chunks with durable recovery — plus Graph API ad-account inventory from the in-memory session token and a PROD release flow with a fixed extension ID.
  - area: Web App — HPMA Tools
    items:
      - Extended the extension integration on the NestJS API/worker — binding approval requests inside the approve step, force-releasing BM barriers stuck by uncertain writes, worker presence signals and marking stuck jobs completed.
      - Added encrypted worker 2FA secret storage with a TOTP code API so extension workers can pass Meta's two-factor prompts.
links:
  live: "#"
  code: "https://github.com/tenomad-company/hpma-tools"
---

HPMA Tools lets an admin manage Meta Business Managers at scale: store BMs with System User tokens, sync ad accounts, and run bulk creation jobs split into sub-jobs per BM and config cluster, with pause/resume/retry, reconciliation of uncertain results and CSV export. Its companion extension, HPMA Copilot, picks up device jobs from Tools and carries out the steps Meta only exposes in the Business Manager UI, the way a careful human operator would.
