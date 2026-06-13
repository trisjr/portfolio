---
title: The 60fps scroll checklist
cat: Frontend
read: 6 min
pubDate: 2026-03-01
tint: "0,245,255"
code: "will-change: transform;"
excerpt: Twelve things I check before I let any page ship. Most jank dies in the compositor — here's how to keep it there.
---

Smooth scrolling is not a feature you add; it's a discipline you maintain. Jank is almost always something cheap that ran on the main thread when it should have stayed on the compositor. Here's the checklist I run before anything ships.

## Animate only transform and opacity

These two properties can be handled entirely by the compositor thread — no layout, no paint. Animating top, left, width, or height forces a reflow on every frame and is the single most common cause of scroll jank.

```css
.card {
  will-change: transform;
  transform: translateY(var(--y));
}
```

> Most jank dies in the compositor. Your job is to keep it there.

## Respect the user

Honor prefers-reduced-motion, debounce scroll handlers behind requestAnimationFrame, and never block the main thread with synchronous layout reads inside a scroll listener. Measure with the performance panel, not your gut — the frame budget is 16ms and it disappears fast.

Do these consistently and 60fps stops being something you chase and becomes the default state of every page you build.
