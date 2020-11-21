import { Layout } from "@/components/Layout";
import { getAllBlogPosts } from "@/lib/post-files-handler";
import { slugify } from "@/lib/util";
import { GetStaticProps } from "next";
import Link from "next/link";
import * as React from "react";

type TagsProps = {
  tags: PostTagWithCount[];
};

type PostTag = {
  tagName: string;
  slug: string;
};

type PostTagWithCount = PostTag & { count: number };

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllBlogPosts();
  const tagSet = posts.reduce((acc, p) => {
    const tagNames = p.post.tags || [];

    for (const tagName of tagNames) {
      const slug = slugify(tagName);
      if (!acc[slug]) {
        acc[slug] = { tagName, slug, count: 0 };
      }
      acc[slug].count += 1;
    }

    return acc;
  }, {} as { [tagName: string]: PostTagWithCount });

  const tags = Object.values(tagSet).sort((a, b) =>
    a.slug.localeCompare(b.slug)
  );

  const props: TagsProps = { tags };

  return {
    props,
  };
};

export const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div>
      <Layout>
        <h1>Tags</h1>
        <ul>
          {tags.map(({ tagName, slug, count }) => (
            <li key={slug}>
              <Link href={`/tags/${slug}`}>{`${tagName} (${count})`}</Link>
            </li>
          ))}
        </ul>
      </Layout>
    </div>
  );
};

export default Tags;
