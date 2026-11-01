---
title: GLA
category: HR Tech · Marketplace
tagline: A high-tech talent brokerage platform connecting Vietnamese engineers in semiconductors, AI, automation and IT with employers at home and abroad.
year: "2026"
startDate: "2026-09"
current: true
role: Web Developer
teamSize: 3
stack: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "MinIO", "Docker Compose", "pnpm workspaces", "Claude Code", "GitHub Projects"]
featured: false
tint: "163,230,53"
order: 6
highlights:
  - Main website for Candidates & Companies plus a separate Admin app on one modular NestJS API
  - 5-phase roadmap from a recruiting MVP with a brokerage Kanban to a marketplace and open API
  - 10-week MVP plan where AI agents pick up GitHub Issues behind two human review gates
responsibilities:
  - area: AI-Native Delivery Workflow
    items:
      - Set up shared Claude Code settings with PreToolUse guards, pinned Superpowers and team commands such as `/task` and `/specs-for`, so agents only act on an assigned issue and finish with a PR carrying verification evidence.
      - Aligned the GitHub project board with two human gates, wired `/task` and `/specs-for` to move issue status, and added epic/business/bug issue forms that auto-join the board.
  - area: Delivery Planning
    items:
      - Split the bootstrap and MVP-review epics into implementable sub-tasks linked to their GitHub issues.
      - Wrote the week-1 kick-off plan — goals, schedule, owner per output, client inputs and risks — backed by 8 tracked issues.
links:
  live: "#"
  code: "https://github.com/tenomad-company/gla-os"
---

GLA connects Vietnamese technical candidates with domestic and international companies, focused on semiconductors, chip design, AI, automation and IT. Phase 1 is a 10-week core MVP — recruiting, candidate profiles, company verification, administration and a brokerage Kanban — delivered spec-first with AI agents working from GitHub Issues behind human review gates. Requirements, architecture decisions and the mock-UI brief are in place, with kick-off in November 2026 and the bootstrap stack pending its ADR.
