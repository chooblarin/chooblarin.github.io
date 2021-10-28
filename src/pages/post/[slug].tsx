import { Layout } from "@/components/Layout";
import { PostTagLink } from "@/components/PostTagLink";
import { BlogPostContent } from "@/lib/BlogPost";
import { mathJaxConfigScript } from "@/lib/mathjax";
import { getAllBlogPosts, getBlogPostContent } from "@/lib/post-files-handler";
import { slugify } from "@/lib/util";
import { css } from "@emotion/react";
import { format } from "date-fns";
import "highlight.js/styles/night-owl.css";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import * as React from "react";
import { siteConfig } from "src/constants";

type PostProps = {
  postContent: BlogPostContent;
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) {
    return { notFound: true };
  }

  const slug = context.params.slug as string;

  const posts = await getAllBlogPosts();
  const found = posts.find(({ post }) => post.slug === slug);

  if (!found) {
    return { notFound: true };
  }

  const props: PostProps = {
    postContent: await getBlogPostContent(found.filename),
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
        <h1
          css={css`
            display: inline-block;
            line-height: 1.5;
            background: linear-gradient(90deg, #3b9ac9, #983bc9);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
          `}
        >
          {title}
        </h1>
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
