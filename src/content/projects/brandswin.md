---
title: BrandsWin
category: SaaS · Social Media
tagline: An end-to-end content operations studio — brand vault, AI briefs and drafts, approval, scheduling, inbox and analytics in one workspace.
year: "2026"
startDate: "2026-06"
current: true
role: Web Developer
teamSize: 4
stack: ["React 19", "TanStack Router/Query", "Vite", "Tailwind CSS 4", "NestJS 11", "TypeORM", "PostgreSQL", "Redis", "BullMQ", "Socket.IO", "MinIO / R2", "Paddle", "OpenAI · Gemini · Qwen", "Remotion", "Python"]
featured: true
tint: "59,130,246"
order: 2
highlights:
  - 9 workspace modules from Brand Vault and Content Studio to Inbox and Analytics
  - Schedules, publishes and replies across 8 platforms, from Facebook to Zalo
  - Provider-agnostic LLM seam over OpenAI, Gemini and Qwen with metered AI credits
responsibilities:
  - area: Content Studio & Campaigns
    items:
      - Built the Content Studio core — brief wizard, draft lifecycle, AI actions and review/approval — then multi-platform targets, publish-now with role-based skip-review and published-post protection.
      - Added Campaign Board cadence, generating a whole campaign up front for one-pass approval and in-place post editing under a campaign-locked brief.
      - Built Brand Vault import of brand profiles from PDF via AI Vision, plus AI-suggested brand identity.
  - area: Billing, Plans & AI Credits
    items:
      - Integrated Stripe and then Paddle Billing end-to-end — subscriptions, plan change/cancel/resume, upgrades, trials and price migration.
      - Designed the plan & credit system — a typed feature matrix, entitlement gates for brands, social accounts and seats, and reserve-then-reconcile credit metering with realtime balance sync over WebSocket.
  - area: Platform Admin & LLM Governance
    items:
      - Built the separate Admin app — super-admin auth with refresh-token rotation, tenant ops, plan/credit catalog, audit log, queue console and publish-failure forensics.
      - Built the LLM provider seam with OpenAI, Gemini and DashScope adapters, an RBAC admin surface with key masking, per-route credit pricing and execution tracing.
      - Ran releases from the BrandsWin rename and v1.0.0 in August through v1.7.0 in October 2026.
links:
  live: "https://brandswin.co/"
  code: "https://github.com/tenomad-company/tnm-marketing-studio"
---

BrandsWin runs the full social-media content lifecycle for brands and agencies — brand vault, AI-assisted briefs and drafts, review, scheduling across 8 platforms, a unified inbox and analytics. It's a pnpm monorepo with a NestJS 11 / TypeORM API, React 19 + TanStack user and admin apps, and Python/Remotion workers for AI video, live since v1.0.0 in August 2026.
