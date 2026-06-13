---
title: Rust on the client is here
cat: WASM
read: 11 min
pubDate: 2026-04-01
tint: "187,134,252"
code: "wasm_bindgen::prelude::*;"
excerpt: "A pragmatic look at shipping Rust to the browser via WASM: when it's worth it, when it isn't, and the toolchain that makes it bearable."
---

Every year someone declares that WebAssembly will replace JavaScript. It won't, and that's fine — that was never the point. WASM is a scalpel, not a hammer. Used in the right places it is transformative; used everywhere it's a liability.

## When it's worth it

Reach for Rust-in-the-browser when you have a CPU-bound core that's painful to express in JS: a physics solver, a parser, a CRDT merge, an image codec. These are pure functions over data, they don't touch the DOM, and they benefit enormously from real types and zero-cost abstractions.

> WASM is best where the work is heavy and the surface is small.

## When it isn't

If your code is mostly DOM glue and network calls, WASM adds a serialization tax at every boundary crossing and ships a bigger bundle for no gain. The browser's JS engine is astonishingly good at exactly that kind of work.

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn merge_doc(a: &[u8], b: &[u8]) -> Vec<u8> {
    let doc = Doc::decode(a).merge(Doc::decode(b));
    doc.encode()
}
```

## The toolchain that makes it bearable

wasm-bindgen plus wasm-pack gets you typed bindings and an npm-shaped package. Pair it with vite-plugin-wasm and the developer experience is finally boring in the best way — you import a function and call it. That boringness is the whole milestone.
