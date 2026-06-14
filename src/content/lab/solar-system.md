---
title: Orrery — a living solar system
tagline: A real-time, top-down simulation of the planets orbiting the Sun, rendered on a single canvas.
cat: Simulation
status: live
pubDate: 2026-06-14
tint: "255, 184, 77"
order: 1
stack: ["Canvas 2D", "Vanilla JS", "requestAnimationFrame"]
demo: solar-system
excerpt: Eight planets sweeping around the Sun at their real relative speeds — drag, zoom, and bend time. No WebGL, no libraries, just one 2D canvas.
---

This is an *orrery* — a mechanical model of the solar system, reborn in the browser. Every planet orbits the Sun at a speed proportional to its real orbital period, so Mercury races while Neptune barely crawls. Distances and sizes are compressed (a true-scale solar system is mostly empty black), but the *motion* is honest.

## How it works

The whole thing is a single `<canvas>` driven by one `requestAnimationFrame` loop. Each planet keeps an angle `θ` that advances by `dt / period` every frame; its screen position is just polar-to-cartesian around the Sun:

```js
planet.theta += (dt * speed) / planet.period;
const x = cx + planet.dist * Math.cos(planet.theta);
const y = cy + planet.dist * Math.sin(planet.theta);
```

No physics integrator, no gravity solver — for visually pleasing circular orbits, parametric motion is cheaper and never drifts.

## Things to try

- **Scrub time** with the speed slider — push it up and watch the outer planets finally move.
- **Drag** to pan the system, **scroll** to zoom into the inner planets.
- **Toggle orbits and labels** to switch between a clean view and an annotated one.
- **Hover a planet** to read its vitals.

## Why build it

Half the fun of a portfolio is having a sandbox. This is the first resident of the Lab — a place for the small, self-contained ideas that don't need to be products. Expect more.
