import { BlogPostListItem } from "@/components/BlogPostListItem";
import { Layout } from "@/components/Layout";
import { RectLink } from "@/components/RectLink";
import { BlogPost } from "@/lib/BlogPost";
import { getAllBlogPosts } from "@/lib/post-files-handler";
import { chunk } from "@/lib/util";
import { css } from "@emotion/react";
import { GetStaticPaths, GetStaticProps } from "next";
import * as React from "react";
import { postsPerPage } from "src/constants";

type PageProps = {
  posts: BlogPost[];
  prevPage: number | null;
  nextPage: number | null;
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) {
    return { notFound: true };
  }

  const p = context.params.p as string;
  const pageNumber = parseInt(p);

  const allPosts = await getAllBlogPosts();
  const chunked = chunk(allPosts, postsPerPage);

  let prevPage: number | null = null;
  let nextPage: number | null = null;

  const chunkIndex = pageNumber - 1;
  const posts = chunked[chunkIndex].map((c) => c.post);
  if (chunkIndex - 1 >= 0) {
    prevPage = pageNumber - 1;
  }
  if (chunkIndex + 1 < chunked.length) {
    nextPage = pageNumber + 1;
  }

  const props: PageProps = {
    posts,
    prevPage,
    nextPage,
  };

  return {
    props,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllBlogPosts();
  const chunked = chunk(posts, postsPerPage);
  const paths = chunked.map((_, index) => index + 1).map((p) => `/page/${p}`);
  return {
    paths,
    fallback: false,
  };
};

const Page: React.FC<PageProps> = ({ posts, prevPage, nextPage }) => {
  return (
    <div>
      <Layout>
        <div>
          {posts.map((post) => (
            <BlogPostListItem key={post.slug} post={post} />
          ))}
        </div>

        <div
          css={css`
            display: flex;
            justify-content: space-between;
            margin: 48px 0;
          `}
        >
          {prevPage ? (
            <RectLink href={`/page/${prevPage}`}>&lt; Newer posts</RectLink>
          ) : (
            <span />
          )}
          {nextPage ? (
            <RectLink href={`/page/${nextPage}`}>Older posts &gt;</RectLink>
          ) : (
            <span />
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Page;
