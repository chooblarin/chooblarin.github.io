import { BlogPost } from "@/lib/BlogPost";
import { css } from "@emotion/react";
import { format } from "date-fns";
import Link from "next/link";
import * as React from "react";

type BlogPostListItemProps = {
  post: BlogPost;
};

export const BlogPostListItem = ({ post }: BlogPostListItemProps) => {
  const { title, date, slug } = post;

  const formattedDate = format(new Date(date), "MMMM dd, yyyy");

  return (
    <Link href={`/post/${slug}`} passHref={true}>
      <a
        css={css`
          text-decoration: none;
          .post-item {
            padding: 8px 0;
          }
          .title {
            font-size: 24px;
            color: var(--color-text);
            margin: 12px 0px 8px;
            transition: color 0.2s linear;
          }
          .date {
            font-size: 14px;
            color: var(--color-sub-text);
            margin: 8px 0;
          }
          &:hover {
            .title {
              color: var(--color-primary);
            }
          }
        `}
      >
        <div className="post-item">
          <p className="title">{title}</p>
          <p className="date">{formattedDate}</p>
        </div>
      </a>
    </Link>
  );
};
