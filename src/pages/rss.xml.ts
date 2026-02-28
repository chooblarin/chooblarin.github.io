import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import { getPublishedPosts } from "../domain/posts/query";

export const GET = async (context: APIContext) => {
  const posts = await getPublishedPosts();

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site ?? "https://chooblarin.com",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? SITE_DESCRIPTION,
      pubDate: post.data.date,
      link: `/post/${post.data.slug}`,
    })),
  });
};
