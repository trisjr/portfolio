---
title: Nebula Realtime
category: Realtime · Infra
tagline: A collaborative canvas syncing 10k cursors at 60fps with CRDT conflict resolution.
year: "2025"
role: Lead Engineer
stack: ["TypeScript", "Rust", "WebSockets", "CRDT", "Redis"]
featured: true
tint: "0,217,255"
order: 1
highlights:
  - Sub-40ms p99 sync latency across regions
  - CRDT engine handles offline edits & merges cleanly
  - Cut server cost 62% by moving merge logic to the edge
links:
  live: "#"
  code: "#"
---

Nebula is a multiplayer design surface where hundreds of people sketch, comment, and move objects in the same space without ever feeling each other's latency. I built the sync core in Rust, compiled to WASM on the client, and designed a presence protocol that batches cursor deltas into a single 30ms tick.
