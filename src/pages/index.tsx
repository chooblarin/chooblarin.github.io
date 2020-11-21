import { BlogPostListItem } from "@/components/BlogPostListItem";
import { Layout } from "@/components/Layout";
import { BlogPost } from "@/lib/BlogPost";
import { getAllBlogPosts } from "@/lib/post-files-handler";
import { GetStaticProps } from "next";
import Head from "next/head";
import * as React from "react";

type HomeProps = {
  posts: BlogPost[];
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllBlogPosts();
  const props: HomeProps = {
    posts: posts.map(({ post }) => post),
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <section>
          {posts.map((post) => (
            <BlogPostListItem key={post.slug} post={post} />
          ))}
        </section>
      </Layout>
    </div>
  );
};

export default Home;
