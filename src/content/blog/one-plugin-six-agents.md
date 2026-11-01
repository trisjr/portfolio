---
title: One plugin, six agents
cat: AI
read: 9 min
pubDate: 2026-11-01
tint: "255,214,10"
code: "$ scripts/validate.sh"
excerpt: "I kept rewriting the same workflows for every coding agent I used. AgentRelay is what happened when I stopped: one plugin, five manifests, and a validator that refuses to let them drift."
---

For a while my best workflows lived in the wrong place: my clipboard. A debugging routine I trusted in Claude Code, a requirements checklist I'd tuned over a dozen projects, a release ritual I could run half asleep. Every time I opened a different agent — Codex for one job, Gemini CLI for another, Cursor when a teammate's repo was set up for it — I re-typed a worse version of the same instructions from memory. The workflows were the valuable part. The agent was just where I happened to be standing.

AgentRelay is the fix: a personal marketplace that packages those workflows as plugins, so one plugin installs on Claude Code, Codex, Kimi, Gemini CLI, Qoder and Cursor. It started on 2026-09-25 and went from v0.1.0 to v0.28.1 in about five weeks. The interesting part isn't the plugins themselves. It's what it takes to keep one thing honest across six hosts that each want it described differently.

## Every agent wants its own paperwork

There is no single plugin format. There are at least five, and they overlap just enough to be dangerous. So every plugin in AgentRelay carries parallel manifests, one per dialect:

```text
plugins/<name>/
├── plugin.json                  # Agent Plugins manifest (Codex)
├── .claude-plugin/plugin.json   # Claude Code
├── .kimi-plugin/plugin.json     # Kimi Code
├── .qoder-plugin/plugin.json    # Qoder
├── gemini-extension.json        # Gemini CLI
├── .cursor/rules/*.mdc          # Cursor rule
└── skills/<skill>/SKILL.md      # the actual work
```

"Six platforms" is the honest headline but not the honest detail. Three of them — Codex, Claude Code and Kimi — have real marketplaces you register a plugin into. Qoder and Gemini only need the manifest. Cursor doesn't have plugins at all; it gets a rule file that carries the same instructions. Kimi installs from a zip with the manifest at its root, so its marketplace entry points at a GitHub release asset instead of a folder. Each host is reasonable on its own. Together they're a compatibility matrix.

The thing that never changes is the skill: a `SKILL.md` with a `name`, a `description`, and the workflow in plain prose. That's the payload. Everything else is shipping labels.

## Portability is a validator, not a promise

The first version of this was a README that said "keep the manifests in sync." That lasted about a day. Five JSON files that must agree on a name and a version is exactly the kind of invariant humans break on a Friday — you bump the Claude manifest, forget the Gemini one, and the plugin silently installs an old version on one host and a new one on another.

So the invariant moved into code. `scripts/new-plugin.sh` clones a template and registers the new plugin into all three marketplaces at once, because forgetting one is the default failure. `scripts/validate.sh` then checks, every time:

- all three marketplace files parse, and every `source` points at a real plugin folder or a release URL;
- every plugin has all five manifests, and `name` and `version` are identical across them and match the folder;
- every `SKILL.md` has the frontmatter the hosts need to discover it;
- every plugin is listed in all three marketplaces.

```bash
scripts/new-plugin.sh spec-readiness-gate   # scaffold + register everywhere
scripts/validate.sh                         # fails on any drift
```

None of this is clever. That's the point. A plugin that claims to work on six agents is making six promises, and the only promises I trust are the ones a script checks before every commit.

## Releases are where drift goes to hide

The other place manifests drift is the release. Bumping a version by hand means editing five files per plugin, plus the changelog, plus the Kimi zip pointer. So the release is a slash command, `/release`, that runs inside Claude Code and does the boring parts in order: preflight (right branch, not behind the remote, validator passes), split pending changes into one commit per plugin, bump only the plugins that changed — in all five manifests — update the changelog, package the Kimi zips with `git archive`, then ask before it pushes the tag.

The command is as interesting for what it forbids as for what it does. It may only edit files through the agent's edit tool, never through `sed` or a script. It stages paths explicitly — no `git add -A`. It may not force-push, skip hooks, or delete a remote tag. If any step fails, it stops and prints how to recover instead of trying something destructive to make the error go away. An agent running a release is a teammate with commit rights; the command file is its job description and its boundaries in one place.

## Some decisions shouldn't go to a model

That boundary idea grew into its own plugin. `jev-gate` is a hook that sits in front of every shell and MCP tool call an agent makes, before it runs. It works in layers, and the order is the design:

1. **Lock rules, in plain regex.** `git push`, `git reset --hard`, `npm publish`, `curl … | sh`, `sudo`, `rm -rf` aimed at a root or home directory. A match always asks the human, in every mode, even in auto mode.
2. **A fast path** for obviously read-only commands — `ls`, `cat`, `rg`, `git status`, `git diff` — which never reach a model at all.
3. **A REUSE ledger** that notices when an agent is about to re-run an expensive command with no file changed since the last run.
4. **Only then a judge model** (TypeSafe's Jev) that scores the grey-zone commands for how destructive or outward-facing they are.

The judge comes last on purpose. The comment above the lock rules in `gate.py` says it better than I can:

> A model can be persuaded. A rule can't.

The gate also ships in shadow mode by default: only the lock rules act, and every other verdict is logged instead of applied. That turned out to matter. The shadow logs showed the judge scoring `git fetch` as outward-facing, and flagging routine local heartbeats between coordinated agents as if they were external messages — exactly the calls where an unexpected prompt would leave an unattended worker hanging. Those got moved to a code path the judge never sees. If I had enforced from day one, I'd have shipped a gate that stalled my own pipelines and blamed the model for it.

And it fails open. Every hook command ends in `|| true`, so a crashed Python process never blocks a tool. A safety layer that takes down your workflow when it breaks gets uninstalled, and then it protects nothing.

## What I'd tell myself on day one

**Ship the workflow, not the prompt.** A prompt is reinvented every morning. A skill with a name, a description and a home in version control can be reviewed, improved, and installed by someone who isn't you.

**Put invariants in scripts the day you write them down.** If the README says "keep X in sync", a validator should be failing the build the first time it isn't.

**Decide what a model is allowed to decide.** Judgment belongs to the model; irreversibility belongs to code and to the human. Write the line down, then enforce it in the layer that can't be talked out of it.

AgentRelay is still my plugin marketplace first — seven plugins covering business-analysis specs, dev workflows, dispatch routing, tool-call gates, context nudges and launch videos. But the lesson travels further than the plugins do. The agents will keep changing. The workflows are the asset, and the asset deserves the same release discipline as any other code you ship. The repo is on [GitHub](https://github.com/trisjr/agent-relay).
