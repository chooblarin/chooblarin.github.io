import { css } from "@emotion/core";
import Link from "next/link";
import * as React from "react";
import { PostTag } from "src/pages/tags";

type PostTagLinkProps = {
  tag: PostTag;
};

export const PostTagLink: React.FC<PostTagLinkProps> = ({ tag }) => (
  <Link href={`/tags/${tag.slug}`} passHref={true}>
    <a
      css={css`
        color: #6b6b6b;
        background: #eeeeee;
        font-size: 12px;
        padding: 7px 12px;
        border-radius: 2px;
      `}
    >{`#${tag.tagName}`}</a>
  </Link>
);
