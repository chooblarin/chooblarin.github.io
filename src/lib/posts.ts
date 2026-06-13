import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"post">;

const byDateDesc = (a: Post, b: Post) =>
  b.data.date.getTime() - a.data.date.getTime();

/**
 * Get all published posts sorted by date (newest first).
 * Drafts are excluded in production builds but kept while developing.
 */
export const getPosts = async (): Promise<Post[]> => {
  const posts = await getCollection("post", ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return posts.sort(byDateDesc);
};
