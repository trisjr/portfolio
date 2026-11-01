---
title: AgentRelay
category: DevTools · AI Agents
tagline: A personal plugin marketplace of reusable workflows for AI coding agents — one plugin, installable across Claude Code, Codex, Kimi, Gemini, Qoder and Cursor.
year: "2026"
startDate: "2026-09"
current: true
role: Creator & Maintainer
stack: ["Claude Code", "MCP", "Python", "TypeScript", "Bash", "Agent Skills", "TypeSafe Jev"]
featured: false
tint: "255,214,10"
order: 3
highlights:
  - 7 plugins and 36 agent skills, from BA specs and dev workflows to launch videos
  - Parallel manifests so a single plugin installs on 6 agent platforms
  - Judged gates that route tasks, score specs and stop risky tool calls
responsibilities:
  - area: Marketplace & Release Tooling
    items:
      - Designed the multi-platform layout — parallel Claude Code, Codex, Kimi, Qoder, Gemini and Cursor manifests per plugin — with scaffold and validate scripts that keep them in sync.
      - Built a `/release` command that splits commits by plugin, bumps versions across every manifest, updates the changelog, tags the release and uploads Kimi zip assets — shipping v0.1.0 through v0.28.
  - area: Plugins
    items:
      - Built three judgment gates on TypeSafe Jev — task-dispatch routing, tool-call gating with lock rules and a reuse ledger, and spec-readiness scoring — each running in shadow mode before it acts.
      - Wrote the dev-workflows suite (requirement clarification, root-cause debugging, retros, research swarms, parallel review and DAG builds) and a 22-skill BA workflows plugin with 20 rules and 22 templates.
      - Built compact-nudge, a Claude Code hook that drafts a ready-to-edit `/compact` command once context passes a threshold.
links:
  live: "#"
  code: "https://github.com/trisjr/agent-relay"
---

AgentRelay packages the workflows I rely on every day as installable plugins for AI coding agents. Each plugin bundles skills, hooks and MCP servers behind parallel manifests, so the same plugin works in Claude Code, Codex, Kimi, Gemini CLI, Qoder and Cursor. A scaffold script and validator keep every manifest in sync, and a `/release` command splits commits, bumps versions, updates the changelog and tags each release.
