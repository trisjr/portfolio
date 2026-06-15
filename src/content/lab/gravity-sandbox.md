---
title: Gravity — an N-body sandbox
tagline: Drop matter into an empty sky and let Newton sort it out. Bodies pull on each other, collide, and pile up into stars — all on one canvas.
cat: Simulation
status: live
pubDate: 2026-06-15
tint: "150, 120, 255"
order: 2
stack: ["Canvas 2D", "Vanilla JS", "N-body gravity"]
demo: gravity-sandbox
excerpt: Every body attracts every other through real gravity. Fling planets with a slingshot, watch them swing into orbit, crash, and merge into new stars. No WebGL, just one 2D canvas.
---

Where the *orrery* cheats — its planets ride fixed parametric circles — this one doesn't. Here gravity is *real*: every body feels the pull of every other, the forces are summed each frame, and the orbits are whatever the math decides. Sometimes that's a clean ellipse. Sometimes it's a slingshot to infinity.

## How it works

Each body carries a position, velocity, and mass. Every frame, the simulation walks all pairs and accumulates Newtonian acceleration — the classic `O(n²)` sum:

```js
const dx = b.x - a.x, dy = b.y - a.y;
const d2 = dx * dx + dy * dy + EPS2;        // softening avoids divide-by-zero
const inv = G * b.m / (d2 * Math.sqrt(d2)); // a = G·m / r²,  along the unit vector
ax += dx * inv; ay += dy * inv;
```

That `EPS2` is a *softening* term: without it, two bodies passing close would feel a near-infinite force and rocket off the screen. With it, close encounters stay civilised. The integration runs in a couple of substeps per frame so fast bodies don't tunnel straight through each other.

When two bodies do touch, they **merge** — the new body conserves momentum (`v = (m₁v₁ + m₂v₂) / (m₁ + m₂)`) and inherits the combined mass. Keep feeding it and a planet crosses a threshold, lights up, and becomes a star. Accretion, in miniature.

## Things to try

- **Fling a body** — press, drag to aim, release. The dashed arrow shows its launch vector; a gentle tangent drop falls into orbit, a hard flick escapes.
- **Build a star** — crank the *Mass* slider up and drop a heavy body, or just feed an existing one until it ignites.
- **Make a binary** — drop two heavy bodies and watch them waltz around their shared centre of mass.
- **Scrub time** to fast-forward the slow gravitational dance, and **zoom** to chase a body that's wandered off.

## Why build it

The orrery answered "what does the solar system *look* like." This one answers "what does gravity *feel* like" — chaotic, sensitive, occasionally beautiful. It's the second resident of the Lab, and the first one where I genuinely can't predict what'll be on screen ten seconds from now.
