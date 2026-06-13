---
title: Observability for one
cat: Infra
read: 7 min
pubDate: 2025-12-01
tint: "187,134,252"
code: 'span.set_attribute("db", q);'
excerpt: You don't need a platform team to know what your software is doing. Building Pulse taught me what actually matters.
---

Observability got framed as an enterprise concern — something you buy once you have a platform team and a five-figure budget. Building Pulse convinced me that's backwards. A solo dev needs to know what their software is doing just as much, and the essentials fit in a single small binary.

## The three signals

Metrics tell you something is wrong. Traces tell you where. Logs tell you why. You need all three, but you don't need a SaaS bill — OpenTelemetry gives you a vendor-neutral way to emit them, and a tiny local backend can store and query them happily.

```rust
let span = tracer.start("db.query");
span.set_attribute("db", q.clone());
let rows = db.execute(q).await?;
span.set_attribute("rows", rows.len() as i64);
```

> You can't fix what you can't see — and you don't need a platform team to see it.

## Small enough to forget

Pulse runs in under 20MB of memory on a $5 VPS. It ingests OTel, stores in SQLite, and alerts via webhook, email, or Discord. The whole design goal was that you set it up once and it quietly watches your back forever.

Observability isn't a luxury for big teams. It's the difference between debugging with evidence and debugging with hope.
