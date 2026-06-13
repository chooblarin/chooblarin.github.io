import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const post = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/post",
    // Every post sets its own `slug` in frontmatter; use it as the entry id so
    // existing URLs (/post/<slug>) are preserved after the Content Layer move.
    generateId: ({ entry, data }) =>
      typeof data.slug === "string" && data.slug.length > 0
        ? data.slug
        : entry.replace(/\.(mdx?|markdown)$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
});

export const collections = { post };
