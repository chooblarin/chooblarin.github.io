/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";

import HomeHeader from "../components/home-header";
import Footer from "../components/footer";
import { global as globalSty } from "./styles/global";

export default ({ children }) => {
  return (
    <div>
      <Global styles={globalSty} />
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
};
