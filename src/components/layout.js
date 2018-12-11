/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";

import HomeHeader from "../components/home-header";
import Footer from "../components/footer";

export default ({ children }) => {
  return (
    <div>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            padding: 0;
          }
          html {
            font-size: 62.5%;
          }
          body {
            font-size: 1.7rem;
            line-height: 1.6;
            font-weight: 400;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
              "Helvetica Neue", sans-serif;
            color: #222;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            margin-bottom: 2rem;
            font-weight: 400;
            color: #676767;
          }
          h1 {
            font-size: 3.4rem;
            line-height: 1.2;
            letter-spacing: -0.1rem;
          }
          h2 {
            font-size: 2.8rem;
            line-height: 1.25;
            letter-spacing: -0.1rem;
          }
          h3 {
            font-size: 2.6rem;
            line-height: 1.3;
            letter-spacing: -0.1rem;
          }
          h4 {
            font-size: 2.4rem;
            line-height: 1.35;
            letter-spacing: -0.08rem;
          }
          h5 {
            font-size: 1.8rem;
            line-height: 1.5;
            letter-spacing: -0.05rem;
          }
          h6 {
            font-size: 1.5rem;
            line-height: 1.6;
            letter-spacing: 0;
          }

          @media (min-width: 550px) {
            h1 {
              font-size: 3.6rem;
            }
            h2 {
              font-size: 2.8rem;
            }
            h3 {
              font-size: 2.4rem;
            }
            h4 {
              font-size: 2.4rem;
            }
            h5 {
              font-size: 2.4rem;
            }
            h6 {
              font-size: 1.5rem;
            }
          }
          audio,
          canvas,
          progress,
          video {
            display: inline-block;
            vertical-align: baseline;
          }
          a {
            color: #1eaedb;
            background-color: transparent;
            text-decoration: none;
          }
          a:hover {
            color: #983bc9;
          }
          a:active,
          a:hover {
            outline: 0;
          }
          img {
            border: 0;
          }
          svg:not(:root) {
            overflow: hidden;
          }
          figure {
            margin: 1em 40px;
          }
          pre {
            overflow: auto;
          }
          pre > code {
            font-size: 1.2rem;
          }
          ul {
            list-style: circle inside;
          }
          ol {
            list-style: decimal inside;
          }
          ol,
          ul {
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            padding-left: 0;
            margin-top: 0;
          }
          ul ul,
          ul ol,
          ol ol,
          ol ul {
            margin: 1.5rem 0 1.5rem 3rem;
            font-size: 90%;
          }
          li {
            margin-bottom: 1rem;
          }
          button,
          .button {
            margin-bottom: 1rem;
          }
          input,
          textarea,
          select,
          fieldset {
            margin-bottom: 1.5rem;
          }
          pre,
          blockquote,
          dl,
          figure,
          table,
          p,
          ul,
          ol,
          form {
            margin-bottom: 2.5rem;
          }
          hr {
            margin-top: 3rem;
            margin-bottom: 3.5rem;
            border-width: 0;
            border-top: 1px solid #e1e1e1;
          }
        `}
      />
      <HomeHeader />
      {children}
      <Footer />
    </div>
  );
};
