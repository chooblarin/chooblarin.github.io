import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { BlogPostContent } from "../../lib/BlogPost";
import {
  getAllBlogPosts,
  getBlogPostContent,
} from "../../lib/post-files-handler";

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
    <div>
      <h1>{postContent.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postContent.content }} />
    </div>
  );
};

export default Post;
