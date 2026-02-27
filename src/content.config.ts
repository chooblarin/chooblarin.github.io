import { defineCollection } from "astro/content/config";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postImagePattern = /^\/images\/posts\/.+\.(png|jpg|jpeg|webp|avif)$/;
const postSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const embedType = z.enum(["twitter", "codepen"]);

const post = defineCollection({
  loader: glob({
    base: "./src/content/post",
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/u, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z
      .string()
      .regex(
        postImagePattern,
        "image must start with /images/posts/ and end with png/jpg/jpeg/webp/avif"
      )
      .optional(),
    date: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()),
    embeds: z.array(embedType).optional(),
    draft: z.boolean().optional(),
    slug: z
      .string()
      .regex(postSlugPattern, "slug must be lowercase kebab-case"),
  }),
});

export const collections = { post };
