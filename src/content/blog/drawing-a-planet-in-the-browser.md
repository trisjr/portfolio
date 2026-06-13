---
title: Drawing a planet in the browser
cat: WebGL
read: 13 min
pubDate: 2026-01-01
tint: "0,217,255"
code: "gl.drawArraysInstanced(...)"
excerpt: The rendering tricks behind Atlas — instanced arcs, GPU picking, and how to fake atmosphere cheaply.
---

Atlas draws a living 3D globe with tens of thousands of animated arcs streaming live telemetry — at 60fps, on a laptop. None of that is possible if you draw things the obvious way. It's all in the tricks.

## Instancing is everything

Fifty thousand arcs is fifty thousand draw calls if you're naive — and that's a slideshow. With instanced rendering you upload the geometry once and a buffer of per-arc attributes, then draw them all in a single call. The GPU does the heavy lifting.

```js
gl.drawArraysInstanced(
  gl.TRIANGLE_STRIP,
  0, segments,
  arcCount   // <- one call, every arc
);
```

> If you're issuing a draw call per object, you've already lost the frame.

## Faking the atmosphere

Real atmospheric scattering is expensive. A convincing fake is a single fresnel term in the fragment shader — brighter at the limb, transparent at the center. It costs nothing and reads as a glowing edge of air around the planet.

## Picking on the GPU

To know which node the cursor is over, render an off-screen pass where each object's color encodes its ID, then read back a single pixel. No raycasting math, no CPU loop over geometry — the GPU already knows what's under the mouse.
