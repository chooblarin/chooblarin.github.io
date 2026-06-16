import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { slugify } from "./util";

export type Post = CollectionEntry<"post">;

export const POSTS_PER_PAGE = 10;

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

export const getLatestPosts = async (limit: number): Promise<Post[]> =>
  (await getPosts()).slice(0, limit);

export type PostPage = {
  posts: Post[];
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
};

export const getPostPages = async (
  countPerPage = POSTS_PER_PAGE,
): Promise<PostPage[]> => {
  const posts = await getPosts();
  const pageCount = Math.ceil(posts.length / countPerPage);

  return Array.from({ length: pageCount }, (_, index) => ({
    posts: posts.slice(index * countPerPage, (index + 1) * countPerPage),
    page: index + 1,
    hasPrev: index > 0,
    hasNext: index + 1 < pageCount,
  }));
};

export type TagGroup = {
  slug: string;
  tag: string;
  posts: Post[];
  count: number;
};

export const getTagGroups = async (): Promise<TagGroup[]> => {
  const posts = await getPosts();
  const groups = new Map<string, { tag: string; posts: Post[] }>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = slugify(tag);
      const group = groups.get(slug) ?? { tag, posts: [] };
      group.posts.push(post);
      groups.set(slug, group);
    }
  }

  return Array.from(groups, ([slug, { tag, posts }]) => ({
    slug,
    tag,
    posts,
    count: posts.length,
  }));
};

export const getTagList = async (): Promise<TagGroup[]> =>
  (await getTagGroups()).sort((a, b) => a.tag.localeCompare(b.tag));
