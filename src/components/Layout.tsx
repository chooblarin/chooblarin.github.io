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
        margin: 0 auto;
        padding: 0 20px;
      `}
    >
      {children}
    </main>
    <Footer />
  </div>
);
