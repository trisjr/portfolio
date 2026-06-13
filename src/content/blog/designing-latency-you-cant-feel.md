---
title: Designing latency you can't feel
cat: Realtime
read: 8 min
pubDate: 2026-05-01
tint: "0,217,255"
code: "fn merge(a: Op, b: Op) -> Op {"
excerpt: How I shaved Nebula's sync below the threshold of human perception — and why p99 is the only number that matters.
---

There's a number that decides whether a collaborative product feels alive or feels broken, and it isn't your average latency. It's your p99 — the slowest 1% of interactions. Users don't remember the 99 times the cursor moved instantly. They remember the one time it lurched.

## The perception budget

Human beings perceive anything under roughly 100ms as instantaneous. Cross that line and the brain starts to register a gap between cause and effect. For Nebula's shared canvas, that became the entire engineering target: every remote update had to land inside the budget, at the 99th percentile, across continents.

> If it isn't fast at p99, it isn't fast. Averages lie; tail latency tells the truth.

## Batching the firehose

Naively broadcasting every cursor delta floods the network. Instead we accumulate deltas into a single tick and flush on a fixed 30ms cadence. The trick is that the tick is predictable — clients can interpolate between ticks so motion stays buttery even though the wire is quiet most of the time.

```rust
fn merge(a: Op, b: Op) -> Op {
    // last-writer-wins on scalar fields,
    // set-union on collections
    reconcile(a, b).resolve()
}
```

## Resolving conflicts without locks

Two people dragging the same object is not an error — it's the normal case. A CRDT lets both edits apply and converge to the same state on every client without a central lock. The cost is memory and a careful merge function, but the payoff is that offline edits just work when you reconnect.

We moved that merge logic to the edge, close to users, which cut round-trips and dropped server cost by 62%. The lesson that stuck with me: latency is a design material, not just an ops metric. You budget for it the same way you budget for whitespace.
