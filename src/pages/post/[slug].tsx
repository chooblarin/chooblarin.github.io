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
import Script from "next/script";
import { siteConfig } from "src/constants";
import { useCodepenEmbed } from "src/hooks/useCodepenEmbed";
import { useTwitterWidgets } from "src/hooks/useTwitterWidgets";

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

const Post = ({ postContent }: PostProps) => {
  const { title, date, tags, content } = postContent;
  const formattedDate = format(new Date(date), "MMMM dd, yyyy");
  const tagItems = (tags || []).map((tagName) => ({
    tagName,
    slug: slugify(tagName),
  }));

  useTwitterWidgets();
  useCodepenEmbed();

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={`%s | ${siteConfig.title}`}
        openGraph={{
          title,
        }}
      />
      {/* MathJax */}
      <Script
        async
        src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
        charSet="utf-8"
      />
      <Script
        id="mathjax-config"
        type="text/x-mathjax-config"
        dangerouslySetInnerHTML={{ __html: mathJaxConfigScript }}
      />
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
            &::selection {
              background: #932ab588;
            }
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

        <div
          css={css`
            ul {
              padding-left: 20px;
            }
          `}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Layout>
    </>
  );
};

export default Post;
