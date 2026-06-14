// Generates the social-share OG image (1200x630) into public/og.png.
// Run with: npm run og   (or: node scripts/gen-og.mjs)
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "..", "public", "og.png");

const W = 1200;
const H = 630;

// Deterministic star field so the image is reproducible across builds.
let seed = 1337;
const rand = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};
const stars = Array.from({ length: 90 }, () => {
  const x = (rand() * W).toFixed(1);
  const y = (rand() * H).toFixed(1);
  const r = (rand() * 1.6 + 0.3).toFixed(2);
  const o = (rand() * 0.5 + 0.15).toFixed(2);
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#F5F5F7" opacity="${o}"/>`;
}).join("");

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0A0E27"/>
      <stop offset="1" stop-color="#070A1C"/>
    </linearGradient>
    <radialGradient id="aura" cx="14%" cy="0%" r="80%">
      <stop offset="0" stop-color="rgba(0,217,255,0.18)"/>
      <stop offset="60%" stop-color="rgba(0,217,255,0)"/>
    </radialGradient>
    <radialGradient id="aura2" cx="100%" cy="100%" r="70%">
      <stop offset="0" stop-color="rgba(187,134,252,0.16)"/>
      <stop offset="60%" stop-color="rgba(187,134,252,0)"/>
    </radialGradient>
    <linearGradient id="name" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#00D9FF"/>
      <stop offset="60%" stop-color="#BB86FC"/>
      <stop offset="100%" stop-color="#00F5FF"/>
    </linearGradient>
    <pattern id="grid" width="54" height="54" patternUnits="userSpaceOnUse">
      <path d="M54 0 H0 V54" fill="none" stroke="rgba(0,217,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#aura)"/>
  <rect width="${W}" height="${H}" fill="url(#aura2)"/>
  ${stars}

  <g font-family="'Helvetica Neue', Arial, sans-serif">
    <!-- brand mark -->
    <text x="90" y="130" font-size="34" font-weight="700" fill="#00D9FF" letter-spacing="1">T<tspan fill="#A0AEC0">_</tspan></text>

    <!-- name -->
    <text x="86" y="320" font-size="150" font-weight="800" fill="url(#name)" letter-spacing="-3">TrisJr</text>

    <!-- role -->
    <text x="90" y="392" font-size="40" font-weight="600" fill="#F5F5F7" letter-spacing="0.5">Full-Stack Developer · AI-Native Architect</text>

    <!-- tagline -->
    <text x="90" y="452" font-size="27" font-weight="400" fill="#A0AEC0">Building fast, thoughtful, AI-native software from Hue, Vietnam.</text>

    <!-- url chip -->
    <text x="90" y="552" font-size="24" font-weight="500" fill="#00D9FF" font-family="'IBM Plex Mono', monospace">trisjr.github.io/portfolio</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log("Wrote", out);
