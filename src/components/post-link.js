/** @jsx jsx */
import { jsx, css } from "@emotion/core";

export default ({ post }) => {
  const { slug, title, date } = post.frontmatter;
  return (
    <div
      css={css`
        padding: 8px;
      `}
    >
      <a href={`/post/${slug}`}>
        <h3
          css={css`
            margin: 0;
            &:hover {
              color: #983bc9;
            }
          `}
        >
          {title}
        </h3>
      </a>
      <p
        css={css`
          font-size: 1.4rem;
          margin: 4px 0 12px;
          color: #878787;
        `}
      >
        {date}
      </p>
    </div>
  );
};
