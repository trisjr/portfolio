---
title: Build tools should disappear
cat: DX
read: 9 min
pubDate: 2026-02-01
tint: "255,0,110"
code: "$ forge ship --prod"
excerpt: "The philosophy behind Forge: configuration is a tax, and the best tooling is the kind you forget exists."
---

I built Forge because I was tired of spending the first day of every project not writing the project. Wiring CI, configuring bundlers, setting up preview deploys — necessary work that produces zero user value. The best tool for that work is one you never think about.

## Configuration is a tax

Every config option is a decision pushed onto the user, and most users want the sensible default. Forge detects your stack and wires the obvious thing. You can override anything, but you rarely need to.

```bash
$ forge init
$ forge dev      # hot reload, instantly
$ forge ship --prod   # build + deploy + preview URL
```

> The best tooling is the kind you forget exists.

## Speed is the feature

Written in Go and shipped as a single static binary, Forge starts in under 30ms. That speed isn't vanity — when a tool is instant, you stop batching your interactions with it and start using it freely. Friction shapes behavior.

Forty community plugins later, the principle holds: tools should get out of the way so the work can take center stage.
