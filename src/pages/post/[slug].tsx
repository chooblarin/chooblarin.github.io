import { Layout } from "@/components/Layout";
import { PostTagLink } from "@/components/PostTagLink";
import { BlogPostContent } from "@/lib/BlogPost";
import { mathJaxConfigScript } from "@/lib/mathjax";
import { getAllBlogPosts, getBlogPostContent } from "@/lib/post-files-handler";
import { slugify } from "@/lib/util";
import { css } from "@emotion/core";
import { format } from "date-fns";
import "highlight.js/styles/night-owl.css";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import * as React from "react";
import { siteConfig } from "src/constants";

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
  const { title, date, tags, content } = postContent;
  const formattedDate = format(new Date(date), "MMMM dd, yyyy");
  const tagItems = (tags || []).map((tagName) => ({
    tagName,
    slug: slugify(tagName),
  }));
  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={`%s | ${siteConfig.title}`}
        openGraph={{
          title,
        }}
      />
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
      <Layout>
        <h1>{title}</h1>
        <p
          css={css`
            font-size: 14px;
            color: #767676;
          `}
        >
          {formattedDate}
        </p>

        <div
          css={css`
            list-style: none;
            margin: 0 0 72px;
            ul {
              margin: 0;
              padding: 0;
            }
            li {
              display: inline-block;
              margin: 8px 8px 8px 0;
            }
          `}
        >
          <ul>
            {tagItems.map((item) => (
              <li key={item.slug}>
                <PostTagLink tag={item} />
              </li>
            ))}
          </ul>
        </div>

        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Layout>
    </>
  );
};

export default Post;
