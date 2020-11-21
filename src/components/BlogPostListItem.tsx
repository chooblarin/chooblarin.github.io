import { BlogPost } from "@/lib/BlogPost";
import { css } from "@emotion/core";
import Link from "next/link";
import * as React from "react";

type BlogPostListItemProps = {
  post: BlogPost;
};

export const BlogPostListItem: React.FC<BlogPostListItemProps> = ({ post }) => (
  <div css={css``}>
    <Link href={`/post/${post.slug}`}>{post.title}</Link>
  </div>
);
