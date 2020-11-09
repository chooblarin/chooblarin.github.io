import { css } from "@emotion/core";
import * as React from "react";
import { Footer } from "./Footer";
import { HomeHeader } from "./HomeHeader";

export const Layout: React.FC = ({ children }) => (
  <div css={css``}>
    <HomeHeader />
    <main
      css={css`
        max-width: 740px;
        line-height: 1.5;
        margin: 0 auto;
        padding: 0 20px 100px;

        code {
          background: #e7e7ea;
          border-radius: 4px;
          padding: 2px 6px;
          font-weight: 600;
        }

        pre > code {
          padding: 0.8rem;
          background: #011627;
          border: 2px solid #aaa;
          font-weight: 500;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: 600;
          line-height: 1;
          color: #676767;
          margin: 2rem 0 1rem;
          padding-top: 0.875rem;
        }
        h1 {
          font-size: 2.25rem;
        }
        h2 {
          font-size: 1.85rem;
        }
        h3 {
          font-size: 1.55rem;
        }
        h4 {
          font-size: 1.25rem;
        }
        h5 {
          font-size: 1rem;
        }
        h6 {
          font-size: 0.875rem;
        }
        p {
          margin: 1.5rem 0;
        }
        li::marker {
          color: #676767;
        }
      `}
    >
      {children}
    </main>
    <Footer />
  </div>
);
