/** @jsx jsx */
import { jsx, css } from "@emotion/core";

export default ({ post }) => {
  const { slug, title, date } = post.frontmatter;
  return (
    <a href={`/post/${slug}`}>
      <div>
        <h3
          css={css`
            &:hover {
              color: #983bc9;
            }
            margin: 0;
            padding: 12px 0;
          `}
        >
          {title}
        </h3>
        <p
          css={css`
            font-size: 1.4rem;
            color: #878787;
            margin: 0;
            padding-bottom: 24px;
          `}
        >
          {date}
        </p>
      </div>
    </a>
  );
};
