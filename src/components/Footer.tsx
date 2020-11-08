import { css } from "@emotion/core";
import * as React from "react";

export const Footer: React.FC = () => (
  <footer
    css={css`
      width: 100%;
      height: 140px;
      border-top: 1px solid #e1e1e1;
    `}
  >
    <div
      css={css`
        width: 100%;
        max-width: 740px;
        height: 100%;
        margin: 0 auto;
        font-size: 12px;
        color: #9b9b9b;
        padding: 2rem 0;
      `}
    >
      <p
        css={css`
          margin: 0 20px;
        `}
      >
        &copy; 2020 chooblarin
      </p>
    </div>
  </footer>
);
