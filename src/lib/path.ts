// Prefixes internal paths with Astro's configured `base` (e.g. "/portfolio/"),
// so links and assets resolve correctly when the site is served from a subpath.
const RAW = import.meta.env.BASE_URL;
const BASE = RAW.endsWith("/") ? RAW : RAW + "/";

export const url = (path = "") => BASE + String(path).replace(/^\/+/, "");
