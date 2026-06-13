---
title: The CLI that runs our week
cat: DX
read: 9 min
pubDate: 2026-06-13
tint: "16,185,129"
code: "$ tnm week sync"
excerpt: I built a zero-build TypeScript CLI to take weekly reporting off the team's plate. The interesting part wasn't the code — it was deciding what the tool should refuse to make us think about.
---

Every team I've worked on has the same quiet tax: the weekly report. Someone opens a doc on Friday, tries to remember what they shipped, copies links from five different places, and pastes it all into ClickUp. Multiply by everyone, every week, forever. So I built `tnm` — a small CLI for TNMCore-OS that turns that ritual into a handful of commands you barely think about.

The whole surface fits on one line:

```bash
tnm project init | week (init|sync|status|done) | task log | user (whoami|config)
```

## Starting a project without ceremony

A new repo shouldn't begin with an hour of scaffolding. `tnm project init` lays down a consistent skeleton and wires the shared Hub in through symlinks, so every project on the team speaks the same structural language:

```bash
tnm project init --name=hpma-worker --type=worker
tnm project init --name=my-service --type=service --copy
```

The `--type` flag picks the shape — `worker` gets `src/ docs/ tests/`, `client` gets `src/ public/ docs/`, `service` gets `src/ api/ docs/` — and every variant ships with a `README.md`, `.env.example`, and `.gitignore` already in place. Pass `--copy` if you'd rather have real files than symlinks. Either way, you're writing the actual project within seconds instead of deciding where things go.

## Logging as you go, not remembering at the end

The core idea is that reports should be a byproduct of work, not a separate task you do later. At the start of the week, one command reads your member profile and spins up a logwork file for every active project:

```bash
tnm week init
```

Each file is a dated markdown template — task delivery, blockers, learnings — keyed by ISO week and project. From there you just drop a line whenever something lands:

```bash
# the simplest possible entry
tnm task log --title="Fixed auth race condition" --project=HPMA

# attach a ClickUp task and mark it in-flight
tnm task log --task="https://app.clickup.com/t/abc123" \
  --title="Refactor session store" --status="In Progress"

# attach one or more PRs, each with its own label
tnm task log --title="Ship dark mode" \
  --pr="https://github.com/org/repo/pull/101|Theme tokens" \
  --pr="https://github.com/org/repo/pull/102|Toggle + persistence"
```

Title is the only thing required; project falls back to your default, status defaults to `Done`. If the logwork file for the week doesn't exist yet, `task log` quietly creates it — so even if you skipped `week init`, the report still assembles itself. By Friday it's already written.

> Reports should be a byproduct of work, not a second job you do on Friday.

## Seeing the week before you ship it

Before syncing anything, `tnm week status` gives you a dashboard — it scans the logwork files and cross-checks ClickUp to tell you what's actually in sync:

```bash
tnm week status              # current week
tnm week status --week=W22   # a specific week
tnm week status --week=2026-W22
```

It prints each project with a Synced / Not Synced marker, lists entries by day colored by status (green Done, yellow In Progress, red Blocked), and ends with a weekly summary. It's the "am I forgetting anything" view you run mid-week.

## Closing the loop with ClickUp

Two commands take it the rest of the way. `tnm week sync` pushes the assembled report up to ClickUp; `tnm week done` flips the report tasks to Done:

```bash
tnm week sync                     # current week
tnm week sync --week=2026-W20     # a past week

tnm week done                     # all active projects
tnm week done --project=HPMA      # just one
tnm week done --week=W20 --project=HPMA
```

`week done` is careful on purpose — it skips tasks that are already closed and reports `not_found` for anything that was never synced, so re-running it is always safe. The ClickUp credentials it needs live in config, which is the one piece worth its own section.

## Knowing who you are, once

Config merges from two layers, and that split is deliberate. Your *identity* — `MEMBER_SHORT_NAME`, GitHub handle — lives in `~/.config/tnm-os/config`, while *project* settings (Hub directory, ClickUp workspace and folder IDs) live in the repo's `.env`. User-level overrides project-level. The payoff: cloning a project never means re-entering who you are.

```bash
tnm user whoami            # member, project, hub dir, role — at a glance
tnm user config            # print the merged config
tnm user config --set CLICKUP_API_KEY=pk_123
tnm user config --unset GITHUB_USERNAME
```

`tnm user config --set` is smart about where a key belongs — identity keys go user-level, everything else lands in the project `.env` — so you don't have to remember the layering yourself.

## Zero build, because friction kills tools

All of this is TypeScript that runs directly on Node 22's `--experimental-strip-types`. No bundler, no compile step, no `dist/` to keep in sync. You edit a command file and the next invocation runs it. For an internal tool maintained between real work, that matters more than any clever abstraction — the moment a tool needs a build pipeline to change, people stop changing it.

Commander.js gives the command tree its shape: `project`, `week`, `task`, `user`, each a folder of small modules wired together with `.addCommand()`. Pure logic lives in `lib/` with no side effects — ISO-week math, logwork parsing, the ClickUp wrapper — while only the command layer touches the filesystem or the network. That split is the only architectural rule, and it's enough to keep things honest.

## The decisions that actually mattered

The code was the easy part. The real work was deciding what the tool should *refuse* to make us think about. Tab completion knows the current week's project names, the valid status values, and the project types — so you never type a string from memory. Missing a logwork file? It gets created. Already-closed task? It gets skipped. None of that is impressive on its own.

Together it's the difference between a tool people use and a tool people abandon. A good internal CLI isn't measured by what it can do — it's measured by how little it asks of you on a tired Friday afternoon.
