/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";
import React from "react";

import CanvasTile from "../components/canvas-tile";
import Footer from "../components/footer";
import { global as globalSty } from "../components/styles/global";

const styles = css`
  @import url("https://fonts.googleapis.com/css?family=VT323");
  .container {
    position: relative;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 740px;
    margin: 0 auto;
    padding: 0 20px;
  }
  h1 {
    font-family: "VT323", monospace;
    font-size: calc(50px + calc(1vw * 0.2));
    text-align: center;
  }
  .container404 {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    color: #676767;
    z-index: 2;
  }
  a {
    display: inline-block;
    margin: 4rem 0 8rem;
    font-size: 2rem;
  }
`;

export default class extends React.Component {
  render() {
    return (
      <div css={styles}>
        <Global styles={globalSty} />
        <div className="container">
          <CanvasTile />
          <main>
            <h1>PAGE NOT FOUND</h1>
            <div className="container404">
              <NotFoundImage />
            </div>
            <a href="/">Back to Home</a>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

function NotFoundImage() {
  return (
    <svg viewBox="0 0 488 488">
      <g stroke="currentColor" strokeWidth="8" fill="none" fillRule="evenodd">
        <path
          d="M56 323h376m-367 0c31.514 74.977 101.638 123.268 179 123.268S391.486 397.978 423 323m-318 41h279m-250-26v52m54-52v80m56-80v86m56-86v80m54-80v52M4 244c0 85.744 45.744 164.974 120 207.846 74.256 42.872 165.744 42.872 240 0S484 329.744 484 244 438.256 79.026 364 36.154c-74.256-42.872-165.744-42.872-240 0S4 158.256 4 244"
          fill="#FFF"
        />
        <g strokeLinecap="square">
          <path d="M314 207.658l73.92 73.605M388 207.658l-73.92 73.605" />
        </g>
        <g strokeLinecap="square">
          <path d="M100 209.658l73.92 73.605M174 209.658l-73.92 73.605" />
        </g>
      </g>
    </svg>
  );
}
