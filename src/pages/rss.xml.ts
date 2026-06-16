import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import { getPostSummary } from "../lib/postMetadata";
import { getPosts } from "../lib/posts";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site ?? "https://chooblarin.com",
    items: posts.map((post) => ({
      title: post.data.title,
      description: getPostSummary(post, SITE_DESCRIPTION),
      pubDate: post.data.date,
      link: `/post/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
