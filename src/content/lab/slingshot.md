---
title: Slingshot — gravity assist
tagline: Fire a probe through the solar system and steal speed from planets the way Voyager did.
cat: Simulation
status: live
pubDate: 2026-06-21
tint: "80, 220, 180"
order: 3
stack: ["Canvas 2D", "Vanilla JS", "Orbital mechanics"]
demo: slingshot
excerpt: Aim your probe at a massive planet, swing around its far side, and walk away faster — a real gravity-assist manoeuvre in one canvas.
---

Where the other two labs explore gravity as a force you fight or fall into, this one asks a sharper question: can you *steal* speed from a moving planet?

The answer is yes — and it's how NASA sent Voyager 1 and 2 to the outer solar system decades faster than a direct flight could manage. Every space agency calls it a *gravity assist* or *slingshot manoeuvre*. Here you can feel why it works.

## How it works

The simulation runs a small solar system: a sun, three planets on gravitationally-correct circular orbits, and one probe you fire. The probe feels real Newtonian gravity from every body — no approximations, no shortcuts.

Before you fire, a **trajectory preview** threads ahead through time, computing where the probe will be at each future moment (including where the planets will be then). What you aim at is what you get.

The trick: to gain speed, swing around the *trailing side* of a planet — the side behind it as it orbits. As you pull away, the planet's gravity tugs you in the direction it's moving. Come in from the wrong side and you lose speed instead.

```js
// gravity from each body, summed each integration substep
const dx = body.x - probe.x, dy = body.y - probe.y;
const d2 = dx * dx + dy * dy + EPS2;          // EPS2 softens near-surface
const f  = G * body.m / (d2 * Math.sqrt(d2)); // a = G·m / r²
ax += dx * f; ay += dy * f;
```

## Things to try

- **Aim at Juno's trailing edge** — approach from slightly ahead of its orbital path and swing around behind it. Watch the speed counter jump.
- **Try a double assist** — can you clip Juno and then Lyra in one flight?
- **Scrub time** to wait for a better planetary alignment before you fire.
- **Aim straight at the Sun** from far out — the slingshot works on stars too, though the margin for error is zero.

## Why build it

The orrery showed the solar system's shape. The gravity sandbox showed chaos. This one shows *strategy* — the first Lab experiment where the point isn't to watch something beautiful but to *do* something clever. Voyager did it in 1977; you can do it in a browser.
