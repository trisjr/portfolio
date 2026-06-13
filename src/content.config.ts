import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    tagline: z.string(),
    year: z.string(),
    // `startDate`/`endDate` use "YYYY-MM"; omit `endDate` when ongoing/unknown.
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean().default(false),
    role: z.string(),
    stack: z.array(z.string()),
    featured: z.boolean().default(false),
    tint: z.string(),
    order: z.number(),
    highlights: z.array(z.string()),
    links: z.object({
      live: z.string().default("#"),
      code: z.string().default("#"),
    }),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    cat: z.string(),
    read: z.string(),
    pubDate: z.date(),
    tint: z.string(),
    code: z.string(),
    excerpt: z.string(),
  }),
});

const profile = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/profile" }),
  schema: z.object({
    name: z.string(),
    initial: z.string(),
    avatar: z.string(),
    brand: z.object({ first: z.string(), last: z.string() }),
    role: z.string(),
    titles: z.array(z.string()),
    roles: z.array(z.string()),
    heroBio: z.string(),
    footerTagline: z.string(),
    aboutPreviewTitle: z.string(),
    aboutPreviewBio: z.string(),
    aboutBio: z.array(z.string()),
    stats: z.array(
      z.object({
        value: z.number(),
        suffix: z.string().default(""),
        label: z.string(),
      }),
    ),
    terminal: z.object({
      role: z.string(),
      stack: z.array(z.string()),
      focus: z.string(),
      status: z.string(),
    }),
    skillChips: z.array(
      z.object({ name: z.string(), primary: z.boolean().default(false) }),
    ),
    skillGroups: z.array(
      z.object({ title: z.string(), items: z.array(z.string()) }),
    ),
    constellation: z.object({
      // `links` reference nodes by index — keep node order stable when editing.
      nodes: z.array(
        z.object({
          l: z.string(),
          x: z.number(),
          y: z.number(),
          s: z.enum(["sm", "md", "lg"]),
        }),
      ),
      links: z.array(z.array(z.number())),
    }),
    jobs: z.array(
      z.object({
        yr: z.string(),
        role: z.string(),
        org: z.string(),
        desc: z.string(),
      }),
    ),
    values: z.array(z.object({ title: z.string(), desc: z.string() })),
    socials: z.array(
      z.object({ name: z.string(), icon: z.string(), url: z.string() }),
    ),
    elsewhere: z.array(z.object({ name: z.string(), url: z.string() })),
    contact: z.object({
      channels: z.array(
        z.object({
          name: z.string(),
          icon: z.string(),
          value: z.string(),
          url: z.string(),
        }),
      ),
      status: z.string(),
    }),
  }),
});

export const collections = { projects, blog, profile };
