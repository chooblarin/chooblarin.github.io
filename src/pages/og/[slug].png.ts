import type { APIRoute, GetStaticPaths } from "astro";
import { renderGeneratedOgImage } from "../../lib/ogImage";
import { getPostImage } from "../../lib/postMetadata";
import { getPosts, type Post } from "../../lib/posts";

export const getStaticPaths = (async () => {
  const posts = await getPosts();

  return posts
    .filter((post) => !getPostImage(post))
    .map((post) => ({
      params: { slug: post.id },
      props: { post },
    }));
}) satisfies GetStaticPaths;

export const GET = (async ({ props }) => {
  const post = props.post as Post;
  const png = await renderGeneratedOgImage(post.data.title);

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}) satisfies APIRoute;
