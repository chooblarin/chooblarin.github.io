/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Link } from "gatsby";

const buttonStyle = {
  padding: "5px 14px",
  border: "1px solid #ddd",
  margin: "48px 0"
};

export default ({ page, first, last }) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
      `}
    >
      {!first && (
        <div style={{ ...buttonStyle, marginRight: "auto" }}>
          <Link to={`page/${page - 1}`}>&lt; Newer posts</Link>
        </div>
      )}
      {!last && (
        <div style={{ ...buttonStyle, marginLeft: "auto" }}>
          <Link to={`page/${page + 1}`}>Older posts &gt;</Link>
        </div>
      )}
    </div>
  );
};
