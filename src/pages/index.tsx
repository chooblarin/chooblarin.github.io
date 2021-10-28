import { BlogPostListItem } from "@/components/BlogPostListItem";
import { Layout } from "@/components/Layout";
import { RectLink } from "@/components/RectLink";
import { BlogPost } from "@/lib/BlogPost";
import { getAllBlogPosts } from "@/lib/post-files-handler";
import { css } from "@emotion/react";
import { GetStaticProps } from "next";
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
