---
title: Atlas Analytics
category: Data · 3D Viz
tagline: A WebGL globe that streams live telemetry from 200+ edge nodes in real time.
year: "2025"
role: Full-Stack
stack: ["React", "Three.js", "WebGL", "ClickHouse", "Node"]
featured: true
tint: "0,245,255"
order: 3
highlights:
  - Renders 50k animated arcs at 60fps
  - Sub-second query latency over billions of rows
  - Used internally by 3 infra teams
links:
  live: "#"
  code: "#"
---

Atlas turns a firehose of infrastructure events into a living 3D map of the planet. I built the ingestion pipeline on ClickHouse and a custom Three.js renderer that draws arcs, heat, and node health without dropping a frame on a laptop.
