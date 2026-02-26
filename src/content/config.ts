import { defineCollection, z } from "astro:content";

const postImagePattern = /^\/images\/posts\/.+\.(png|jpg|jpeg|webp|avif)$/;

const post = defineCollection({
  type: "content",
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
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
});

export const collections = { post };
