/* ============================================================
   VIRTUAL SPACE — engine
   particle network · cursor · reveal · nav · tweaks
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

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
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
    function frame() {
      const rgb = accentRGB();
      ctx.clearRect(0, 0, w, h);
      const LINK = 132;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        // mouse gentle attraction
        const mdx = mouse.x - n.x, mdy = mouse.y - n.y;
        const md = Math.hypot(mdx, mdy);
        if (md < 160) { n.x += mdx / md * .35; n.y += mdy / md * .35; }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + rgb + ", .65)";
        ctx.fill();
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "rgba(" + rgb + "," + (0.14 * (1 - d / LINK)).toFixed(3) + ")";
            ctx.lineWidth = 1; ctx.stroke();
          }
        }
        // link to mouse
        const dm = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
        if (dm < 170) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = "rgba(" + rgb + "," + (0.2 * (1 - dm / 170)).toFixed(3) + ")";
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
    };
  })();

  /* ---------- Custom cursor ---------- */
  function initCursor() {
    if (coarse) return;
    const dot = document.createElement("div"); dot.className = "cursor-dot";
    const ring = document.createElement("div"); ring.className = "cursor-ring";
    document.body.append(dot, ring);
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
  function initReveal() {
    if (reduce) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { revealInView(); ticking = false; });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    // initial paint (next frame so layout is settled)
    requestAnimationFrame(() => requestAnimationFrame(revealInView.bind(null, document)));
    // guaranteed fallback: if anything throttles scroll/rAF, reveal everything
    setTimeout(() => document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || 800)) el.classList.add("in");
    }), 1200);
    // expose for dynamically-injected content
    window.__revealInView = revealInView;
  }

  /* ---------- Count-up numbers ---------- */
  function initCounters() {
    const els = Array.from(document.querySelectorAll("[data-count]"));
    if (!els.length) return;
    const run = (el) => {
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
    };
    const check = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      els.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < vh * 0.9 && r.bottom > 0) run(el); });
    };
    window.addEventListener("scroll", check, { passive: true });
    requestAnimationFrame(() => requestAnimationFrame(check));
  }

  /* ---------- Nav / drawer / back-to-top ---------- */
  function initChrome() {
    const nav = document.querySelector(".nav");
    const totop = document.getElementById("totop");
    const onScroll = () => {
      const y = window.scrollY;
      if (nav) nav.classList.toggle("scrolled", y > 24);
      if (totop) totop.classList.toggle("show", y > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
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
  function initTweaks() {
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
    window.addEventListener("message", (e) => {
      const t = e && e.data && e.data.type;
      if (t === "__activate_edit_mode") show(true);
      else if (t === "__deactivate_edit_mode") show(false);
    });
    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch (e) {}
  }

  /* ---------- boot ---------- */
  function boot() {
    applyTweaks();
    PARTICLES.init();
    initCursor();
    initReveal();
    initCounters();
    initChrome();
    initTweaks();
    // year stamp
    document.querySelectorAll("[data-year]").forEach((e) => e.textContent = new Date().getFullYear());
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
