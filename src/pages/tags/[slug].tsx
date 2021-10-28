import { BlogPostListItem } from "@/components/BlogPostListItem";
import { Layout } from "@/components/Layout";
import { BlogPost } from "@/lib/BlogPost";
import { getAllBlogPosts } from "@/lib/post-files-handler";
import { slugify } from "@/lib/util";
import { GetStaticPaths, GetStaticProps } from "next";
import * as React from "react";
import { PostTag } from ".";

type TagProps = {
  tag: PostTag;
  posts: BlogPost[];
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) {
    return { notFound: true };
  }

  const slug = context.params.slug as string;

  const allPosts = await getAllBlogPosts();

  let tagName = "";
  const posts: BlogPost[] = [];

  for (const { post } of allPosts) {
    const tagNames = post.tags || [];
    for (const tn of tagNames) {
      if (slugify(tn) !== slug) {
        continue;
      }

      posts.push(post);

      if (!tagName) {
        tagName = tn;
      }
    }
  }

  const props: TagProps = {
    tag: { tagName, slug },
    posts,
  };

  return {
    props,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllBlogPosts();
  const slugs = allPosts.reduce((acc, p) => {
    const tagNames = p.post.tags || [];
    for (const tagName of tagNames) {
      const slug = slugify(tagName);
      acc.add(slug);
    }
    return acc;
  }, new Set<string>());

  const paths = Array.from(slugs).map((slug) => `/tags/${slug}`);

  return {
    paths,
    fallback: false,
  };
};

const Tag: React.FC<TagProps> = ({ tag, posts }) => {
  return (
    <div>
      <Layout>
        <h1>#{tag.tagName}</h1>
        <div>
          <ul>
            {posts.map((post) => (
              <BlogPostListItem key={post.slug} post={post} />
            ))}
          </ul>
        </div>
      </Layout>
    </div>
  );
};

export default Tag;
