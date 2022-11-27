import { css } from "@emotion/react";
import Link from "next/link";
import { PostTag } from "src/pages/tags";

type PostTagLinkProps = {
  tag: PostTag;
};

export const PostTagLink = ({ tag }: PostTagLinkProps) => (
  <Link href={`/tags/${tag.slug}`} passHref={true} legacyBehavior>
    <a
      css={css`
        color: #6b6b6b;
        text-decoration: none;
        background: #eeeeee;
        font-size: 12px;
        padding: 7px 12px;
        border-radius: 2px;
      `}
    >{`#${tag.tagName}`}</a>
  </Link>
);
