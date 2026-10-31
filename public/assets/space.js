/* ============================================================
   VIRTUAL SPACE — engine
   particle network · warp · cursor · reveal · nav · tweaks

   View Transitions aware:
   - bootOnce() runs a single time; it owns the persisted canvas/cursor
     and all global window/document listeners (which re-query fresh DOM
     on every fire, so they survive body swaps without re-binding).
   - bootPage() runs on every `astro:page-load` (initial load + each
     client-side navigation); it re-binds handlers on per-page chrome
     that ClientRouter swaps out, and repaints scroll-driven state.
   ============================================================ */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const TW_KEY = "vspace.tweaks.v1";

  /* ---------- Tweaks state (persisted across pages) ---------- */
  const ACCENTS = {
    blue:   ["#00D9FF", "#BB86FC", "0, 217, 255"],
    cyan:   ["#00F5FF", "#FF006E", "0, 245, 255"],
    purple: ["#BB86FC", "#00D9FF", "187, 134, 252"],
    pink:   ["#FF006E", "#00D9FF", "255, 0, 110"],
  };
  const DEFAULTS = { accent: "blue", density: "regular", glow: 1, grid: true, scan: false };
  let TW = Object.assign({}, DEFAULTS);
  try { Object.assign(TW, JSON.parse(localStorage.getItem(TW_KEY) || "{}")); } catch (e) {}

  function applyTweaks() {
    const root = document.documentElement.style;
    const a = ACCENTS[TW.accent] || ACCENTS.blue;
    root.setProperty("--accent", a[0]);
    root.setProperty("--accent-2", a[1]);
    root.setProperty("--accent-rgb", a[2]);
    root.setProperty("--glow", TW.glow);
    root.setProperty("--grid-opacity", TW.grid ? 1 : 0);
    document.body.classList.toggle("scan", !!TW.scan);
    PARTICLES.retune();
  }
  function saveTweaks() { try { localStorage.setItem(TW_KEY, JSON.stringify(TW)); } catch (e) {} }

  /* ---------- Particle network ---------- */
  const PARTICLES = (function () {
    let canvas, ctx, w, h, dpr, nodes = [], raf, density = 1, mouse = { x: -999, y: -999 };
    const DENS = { calm: 0.45, regular: 0.8, dense: 1.3 };
    // Warp jump: during a client-side navigation the field streaks radially
    // from the viewport centre (outward = forward, inward = back). `level`
    // eases toward `target` every frame, so the jump spools up and decays.
    const warp = { level: 0, target: 0, dir: 1, start: 0, timer: 0 };

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      // The canvas is pinned to the viewport (fixed, inset:0, width/height 100%),
      // so size it from the viewport directly. Reading clientWidth here is racy:
      // when init() runs synchronously on a hard reload, CSS hasn't laid the
      // canvas out yet and clientWidth reports the intrinsic 300×150 — shrinking
      // the bitmap so it looks zoomed once stretched. innerWidth never lies.
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function build() {
      const base = Math.round((w * h) / 18000 * density);
      const count = Math.max(18, Math.min(150, base));
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
          r: Math.random() * 1.6 + .6,
        });
      }
    }
    function accentRGB() {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim();
      return v || "0, 217, 255";
    }
    // A node that has flown past the edge (forward) or into the centre (back)
    // re-enters where the warp feeds from: near the centre, or at the rim.
    function respawn(n) {
      const a = Math.random() * Math.PI * 2;
      const R = Math.hypot(w, h) / 2;
      const r = warp.dir > 0 ? R * (.04 + Math.random() * .3) : R * (.7 + Math.random() * .3);
      n.x = w / 2 + Math.cos(a) * r; n.y = h / 2 + Math.sin(a) * r;
    }
    function frame() {
      const rgb = accentRGB();
      ctx.clearRect(0, 0, w, h);
      const LINK = 132;
      warp.level += (warp.target - warp.level) * (warp.target > warp.level ? .14 : .045);
      const wl = warp.level > .004 ? warp.level : 0;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (wl) {
          const dx = n.x - w / 2, dy = n.y - h / 2;
          const d = Math.hypot(dx, dy) || 1;
          const ux = dx / d, uy = dy / d;
          // farther from the centre = faster, like stars rushing past
          const sp = wl * (1.2 + d * .055) * warp.dir;
          n.x += ux * sp; n.y += uy * sp;
          const gone = n.x < -40 || n.x > w + 40 || n.y < -40 || n.y > h + 40;
          if (warp.dir > 0 ? gone : d < 24) { respawn(n); continue; }
          const tail = Math.abs(sp) * 4.5;
          ctx.beginPath();
          ctx.moveTo(n.x - ux * tail * warp.dir, n.y - uy * tail * warp.dir);
          ctx.lineTo(n.x, n.y);
          ctx.strokeStyle = "rgba(" + rgb + "," + (.65 + .2 * wl).toFixed(3) + ")";
          ctx.lineWidth = n.r * (2 - wl * .6); ctx.lineCap = "round"; ctx.stroke();
          continue;
        }
        // steer back inside rather than flip, so a node left past the edge
        // (e.g. after a warp) can't get stuck oscillating out of view
        if (n.x < 0 || n.x > w) n.vx = (n.x < 0 ? 1 : -1) * Math.abs(n.vx);
        if (n.y < 0 || n.y > h) n.vy = (n.y < 0 ? 1 : -1) * Math.abs(n.vy);
        // mouse gentle attraction
        const mdx = mouse.x - n.x, mdy = mouse.y - n.y;
        const md = Math.hypot(mdx, mdy);
        if (md < 160) { n.x += mdx / md * .35; n.y += mdy / md * .35; }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + rgb + ", .65)";
        ctx.fill();
      }
      // the network dissolves while warping and re-forms as the jump decays
      const net = 1 - Math.min(1, wl * 2);
      for (let i = 0; net && i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "rgba(" + rgb + "," + (0.14 * net * (1 - d / LINK)).toFixed(3) + ")";
            ctx.lineWidth = 1; ctx.stroke();
          }
        }
        // link to mouse
        const dm = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
        if (dm < 170) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = "rgba(" + rgb + "," + (0.2 * net * (1 - dm / 170)).toFixed(3) + ")";
          ctx.lineWidth = 1; ctx.stroke();
        }
      }
      raf = requestAnimationFrame(frame);
    }
    return {
      init() {
        canvas = document.getElementById("space-canvas");
        if (!canvas) return;
        ctx = canvas.getContext("2d");
        size(); this.retune(); build();
        window.addEventListener("resize", () => { size(); build(); });
        if (!coarse) window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
        if (!reduce) raf = requestAnimationFrame(frame);
        else { frame(); cancelAnimationFrame(raf); } // single static paint
      },
      retune() {
        density = DENS[TW.density] || DENS.regular;
        if (canvas) build();
      },
      // spool up on link click; settle() once the new page is in
      warp(dir) {
        if (reduce || !canvas) return;
        warp.dir = dir; warp.target = 1; warp.start = performance.now();
        clearTimeout(warp.timer);
        warp.timer = setTimeout(() => { warp.target = 0; }, 4000); // never stall mid-jump
      },
      settle() {
        if (reduce || !canvas) return;
        // hold the jump long enough to read even when the page was prefetched
        const hold = Math.max(0, warp.start + 480 - performance.now());
        clearTimeout(warp.timer);
        warp.timer = setTimeout(() => { warp.target = 0; }, hold);
      },
    };
  })();

  /* ---------- Custom cursor (static persisted elements) ---------- */
  function initCursor() {
    if (coarse) return;
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;
    let rx = -50, ry = -50, mx = -50, my = -50;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });
    (function loop() {
      rx += (mx - rx) * .18; ry += (my - ry) * .18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();
    const interactive = 'a, button, input, textarea, .card, .chip, .tw__sw, [data-hover]';
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(interactive)) document.body.classList.add("hovering");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(interactive)) document.body.classList.remove("hovering");
    });
  }

  /* ---------- Scroll reveal ----------
     Uses a scroll/rAF visibility check (reliable inside preview iframes,
     where IntersectionObserver does not always fire). */
  function revealInView(root) {
    const els = (root || document).querySelectorAll(".reveal:not(.in)");
    const vh = window.innerHeight || document.documentElement.clientHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add("in");
    });
  }

  /* Whatever is already on screen when a client-side navigation swaps the
     page in arrives with the warp zoom itself — settle it so it doesn't
     stagger in a second time. */
  function settleReveals() {
    if (reduce) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add("in", "settled");
    });
  }

  /* ---------- Count-up numbers ---------- */
  function runCounter(el) {
    if (el.dataset.done) return; el.dataset.done = "1";
    const end = parseFloat(el.dataset.count); const suf = el.dataset.suffix || "";
    if (reduce) { el.textContent = end + suf; return; }
    const dur = 1200, t0 = performance.now();
    (function step(t) {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      const val = end % 1 ? (end * e).toFixed(1) : Math.round(end * e);
      el.textContent = val + suf;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  function checkCounters() {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    document.querySelectorAll("[data-count]").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0) runCounter(el);
    });
  }

  /* ---------- Global scroll state (nav / back-to-top) ---------- */
  function onScroll() {
    const y = window.scrollY;
    const nav = document.querySelector(".nav");
    const totop = document.getElementById("totop");
    if (nav) nav.classList.toggle("scrolled", y > 24);
    if (totop) totop.classList.toggle("show", y > 600);
    if (!reduce) revealInView();
    checkCounters();
  }

  /* ---------- Per-page chrome bindings ---------- */
  function bindChrome() {
    const totop = document.getElementById("totop");
    if (totop) totop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));

    const burger = document.querySelector(".nav__burger");
    const drawer = document.querySelector(".drawer");
    if (burger && drawer) {
      const close = () => drawer.classList.remove("open");
      burger.addEventListener("click", () => drawer.classList.add("open"));
      drawer.querySelector(".drawer__scrim").addEventListener("click", close);
      drawer.querySelector(".drawer__close").addEventListener("click", close);
      drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
    }
  }

  /* ---------- Tweaks panel + host protocol ---------- */
  function bindTweaks() {
    const panel = document.getElementById("tweaks");
    if (!panel) return;
    const totop = document.getElementById("totop");

    // wire controls
    panel.querySelectorAll("[data-acc]").forEach((sw) => {
      sw.style.background = "linear-gradient(135deg," + ACCENTS[sw.dataset.acc][0] + "," + ACCENTS[sw.dataset.acc][1] + ")";
      sw.classList.toggle("on", TW.accent === sw.dataset.acc);
      sw.addEventListener("click", () => {
        TW.accent = sw.dataset.acc;
        panel.querySelectorAll("[data-acc]").forEach((x) => x.classList.toggle("on", x === sw));
        applyTweaks(); saveTweaks();
      });
    });
    panel.querySelectorAll("[data-dens]").forEach((b) => {
      b.classList.toggle("on", TW.density === b.dataset.dens);
      b.addEventListener("click", () => {
        TW.density = b.dataset.dens;
        panel.querySelectorAll("[data-dens]").forEach((x) => x.classList.toggle("on", x === b));
        applyTweaks(); saveTweaks();
      });
    });
    const glow = panel.querySelector("[data-glow]");
    if (glow) { glow.value = TW.glow; glow.addEventListener("input", () => { TW.glow = parseFloat(glow.value); applyTweaks(); saveTweaks(); }); }
    const wire = (sel, key) => {
      const sw = panel.querySelector(sel); if (!sw) return;
      sw.classList.toggle("on", !!TW[key]);
      sw.addEventListener("click", () => { TW[key] = !TW[key]; sw.classList.toggle("on", TW[key]); applyTweaks(); saveTweaks(); });
    };
    wire("[data-grid]", "grid");
    wire("[data-scan]", "scan");

    const opener = document.getElementById("tw-open");
    const show = (v) => {
      panel.classList.toggle("show", v);
      if (totop) totop.style.display = v ? "none" : "";
      if (opener) opener.style.display = v ? "none" : "";
    };
    if (opener) opener.addEventListener("click", () => show(!panel.classList.contains("show")));
    panel.querySelector(".tw__x").addEventListener("click", () => {
      show(false);
      try { window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*"); } catch (e) {}
    });
  }

  /* ---------- boot: once vs per-page ---------- */
  function bootOnce() {
    if (window.__spaceOnce) return;
    window.__spaceOnce = true;

    PARTICLES.init();
    initCursor();

    // global listeners — they re-query fresh DOM on every fire, so they
    // keep working after ClientRouter swaps the body. Bound exactly once.
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // host protocol (tweaks panel) — listen once; show()/panel resolved live.
    window.addEventListener("message", (e) => {
      const t = e && e.data && e.data.type;
      if (t !== "__activate_edit_mode" && t !== "__deactivate_edit_mode") return;
      const panel = document.getElementById("tweaks");
      if (!panel) return;
      const on = t === "__activate_edit_mode";
      panel.classList.toggle("show", on);
      const totop = document.getElementById("totop");
      const opener = document.getElementById("tw-open");
      if (totop) totop.style.display = on ? "none" : "";
      if (opener) opener.style.display = on ? "none" : "";
    });

    // expose reveal helper for dynamically-injected content (per-page scripts)
    window.__revealInView = revealInView;

    // warp jump across client-side navigations; the page zoom that rides
    // along with it lives in space.css (html[data-astro-transition]).
    document.addEventListener("astro:before-preparation", (e) => PARTICLES.warp(e.direction === "back" ? -1 : 1));
    document.addEventListener("astro:after-swap", () => { settleReveals(); PARTICLES.settle(); });

    // per-page boot: fires on initial load and after every client-side nav.
    document.addEventListener("astro:page-load", bootPage);
  }

  function bootPage() {
    applyTweaks();
    bindChrome();
    bindTweaks();

    // initial reveal paint
    if (reduce) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
    } else {
      requestAnimationFrame(() => requestAnimationFrame(() => revealInView(document)));
      // guaranteed fallback if scroll/rAF is throttled
      setTimeout(() => document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < (window.innerHeight || 800)) el.classList.add("in");
      }), 1200);
    }

    // initial scroll-driven state + counters for the new page
    onScroll();

    // year stamp
    document.querySelectorAll("[data-year]").forEach((e) => e.textContent = new Date().getFullYear());

    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch (e) {}
  }

  bootOnce();
})();
