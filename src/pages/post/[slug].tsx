import { BlogPostContent } from "@/lib/BlogPost";
import { mathJaxConfigScript } from "@/lib/mathjax";
import { getAllBlogPosts, getBlogPostContent } from "@/lib/post-files-handler";
import { css } from "@emotion/core";
import "highlight.js/styles/night-owl.css";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React from "react";

type PostProps = {
  postContent?: BlogPostContent;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params.slug as string;

  const posts = await getAllBlogPosts();
  const found = posts.find(({ post }) => post.slug === slug);

  let postContent: BlogPostContent | undefined;

  if (found) {
    postContent = await getBlogPostContent(found.filename);
  }

  const props: PostProps = {
    postContent,
  };

  return { props };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllBlogPosts();
  const paths = posts.map(({ post }) => `/post/${post.slug}`);
  return {
    paths,
    fallback: false,
  };
};

const Post: React.FC<PostProps> = ({ postContent }) => {
  return (
    <>
      <Head>
        {/* Twitter */}
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        />

        {/* CodePen */}
        <script
          async
          src="https://static.codepen.io/assets/embed/ei.js"
          charSet="utf-8"
        />

        {/* MathJax */}
        <script
          async
          src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
          charSet="utf-8"
        />
        <script
          type="text/x-mathjax-config"
          dangerouslySetInnerHTML={{ __html: mathJaxConfigScript }}
        />
      </Head>
      <main
        css={css`
          max-width: 740px;
          margin: 0 auto;
          padding: 0 20px;
        `}
      >
        <h1>{postContent.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postContent.content }} />
      </main>
    </>
  );
};

export default Post;
