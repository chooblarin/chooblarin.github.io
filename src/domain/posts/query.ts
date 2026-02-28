import { type CollectionEntry, getCollection } from "astro:content";

const sortByDateDesc = (
  a: CollectionEntry<"post">,
  b: CollectionEntry<"post">,
) => b.data.date.getTime() - a.data.date.getTime();

export const isPublishedPost = (post: CollectionEntry<"post">) =>
  post.data.draft !== true;

export const getPublishedPosts = async () =>
  (await getCollection("post")).filter(isPublishedPost).sort(sortByDateDesc);
