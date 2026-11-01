---
title: TNMCORE-OS
category: AI Platform · DevTools
tagline: An AI-native team operating system that turns Agile/Scrum into a multi-agent SDLC workspace — with a `tnm` CLI for logwork and ClickUp sync.
year: "2026"
startDate: "2026-03"
current: true
role: Core Maintainer
stack: ["TypeScript", "Node.js", "Commander.js", "ClickUp API", "Microsoft Graph", "OpenSpec", "Claude Code", "Codex"]
featured: true
tint: "0,245,255"
order: 1
highlights:
  - 15 agent roles, 80+ skills and 30 workflows across the SDLC
  - "`tnm` CLI with 6 command groups: projects, weekly logwork, ClickUp sync, cron jobs"
  - PM workflows that triage requests by risk tier behind a single approval gate
responsibilities:
  - area: tnm CLI
    items:
      - Built the TNMCORE-OS CLI — first in JavaScript, then as a zero-build TypeScript v2 on Commander — covering project init/sync, weekly logwork with ClickUp sync, task logging and AI-written commits, AI-tool installs and cron schedules.
      - Implemented a 9-phase `tnm project init` (symlink or copy mode) that seeds each agent surface and the hub docs into project repos, plus Teams approval requests through Microsoft Graph.
  - area: AI Workflows
    items:
      - Designed the PM workflow lane (core, dispatch, code, doc, review) that triages requests into risk tiers, runs them end-to-end behind one approval gate, and adds an optional Orca runtime and multi-agent PR review.
      - Split the Antigravity and Claude Code trees into independent surfaces, added Codex agent definitions, and pruned duplicate skills and always-loaded rules to cut per-agent context cost.
      - Standardized the OpenSpec/OPSX command set across surfaces and wrote an SDLC-Lite workflow for internal projects.
links:
  live: "#"
  code: "https://github.com/tenomad-company/TNMCore-OS"
---

TNMCORE-OS is a meta-platform that promotes AI from a tool to a teammate across Discovery, Spec, Code, Test and Deploy — roles, skills, workflows and a Dewey-numbered knowledge base that agents load to work across the SDLC. As a core maintainer I built the `tnm` CLI that ties each member's weekly logwork to ClickUp and seeds the OS into project repos, and designed the PM workflow lane that triages, dispatches and reviews multi-agent work.
