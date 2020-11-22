import { BlogPostListItem } from "@/components/BlogPostListItem";
import { Layout } from "@/components/Layout";
import { RectLink } from "@/components/RectLink";
import { BlogPost } from "@/lib/BlogPost";
import { getAllBlogPosts } from "@/lib/post-files-handler";
import { css } from "@emotion/core";
import { GetStaticProps } from "next";
import Head from "next/head";
import * as React from "react";

type HomeProps = {
  posts: BlogPost[];
};

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllBlogPosts();
  const latestPosts = allPosts.slice(0, 5).map(({ post }) => post);

  const props: HomeProps = {
    posts: latestPosts,
  };
  return {
    props,
  };
};

const Home: React.FC<HomeProps> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>chooblarin's blog</title>
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <link rel="mask-icon" href="mask-icon.svg" color="#000000" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="manifest" href="site.webmanifest" />
      </Head>
      <Layout>
        <section>
          {posts.map((post) => (
            <BlogPostListItem key={post.slug} post={post} />
          ))}

          <div
            css={css`
              margin: 40px 0 20px;
            `}
          >
            <RectLink href="/page/1">View all</RectLink>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Home;
