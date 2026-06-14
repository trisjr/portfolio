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
    teamSize: z.number().optional(),
    stack: z.array(z.string()),
    featured: z.boolean().default(false),
    tint: z.string(),
    order: z.number(),
    highlights: z.array(z.string()),
    // Detailed breakdown grouped by area (e.g. Frontend / Backend); each area
    // has its own bullet list. Falls back to `highlights` on the detail page
    // when empty.
    responsibilities: z
      .array(z.object({ area: z.string(), items: z.array(z.string()) }))
      .default([]),
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
    // Corporate-style CV data, rendered on `/resume`. All optional so the rest
    // of the site keeps working even if a field is omitted.
    cv: z
      .object({
        designation: z.string(),
        gender: z.string().optional(),
        education: z.object({ degree: z.string(), school: z.string() }),
        summary: z.array(z.string()).default([]),
        // Technical-skills taxonomy (Programming Languages, Backend, ...).
        technicalSkills: z
          .array(z.object({ title: z.string(), items: z.array(z.string()) }))
          .default([]),
        softSkills: z.array(z.string()).default([]),
        // Self-rated proficiency table; `level` is 1–5 per `proficiencyLegend`.
        proficiency: z
          .array(
            z.object({
              skill: z.string(),
              level: z.number(),
              experience: z.string(),
              lastUsed: z.string(),
            }),
          )
          .default([]),
        proficiencyLegend: z.array(z.string()).default([]),
        languages: z
          .array(z.object({ name: z.string(), level: z.string() }))
          .default([]),
      })
      .optional(),
  }),
});

export const collections = { projects, blog, profile };
