---
title: AgentRelay
category: DevTools · AI Agents
tagline: A personal plugin marketplace of reusable workflows for AI coding agents — one plugin, installable across Claude Code, Codex, Kimi, Gemini, Qoder and Cursor.
year: "2026"
startDate: "2026-09"
current: true
role: Creator & Maintainer
stack: ["Claude Code", "MCP", "Python", "Bash", "Agent Skills"]
featured: false
tint: "255,214,10"
order: 3
highlights:
  - 7 plugins and 36 agent skills, from BA specs and dev workflows to launch videos
  - Parallel manifests so a single plugin installs on 6 agent platforms
  - Judged gates that route tasks and stop risky tool calls before they run
links:
  live: "#"
  code: "https://github.com/trisjr/agent-relay"
---

AgentRelay packages the workflows I rely on every day as installable plugins for AI coding agents. Each plugin bundles skills, hooks and MCP servers behind parallel manifests, so the same plugin works in Claude Code, Codex, Kimi, Gemini CLI, Qoder and Cursor. A scaffold script and validator keep every manifest in sync, and a `/release` command splits commits, bumps versions, updates the changelog and tags each release.
