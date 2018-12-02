/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";
import { Link } from "gatsby";

export default ({ post }) => {
  const { slug, title, date } = post.frontmatter;
  return (
    <div
      css={css`
        padding: 8px;
      `}
    >
      <Global
        styles={css`
          a {
            color: #1eaedb;
            background-color: transparent;
            text-decoration: none;
          }
          a:active,
          a:hover {
            outline: 0;
          }
          a:hover {
            color: #0fa0ce;
          }
        `}
      />
      <Link to={`/post/${slug}`}>
        <h3
          css={css`
            margin: 0;
            font-size: 20px;
          `}
        >
          {title}
        </h3>
      </Link>
      <p
        css={css`
          margin: 0;
          font-size: 12px;
        `}
      >
        {date}
      </p>
    </div>
  );
};
