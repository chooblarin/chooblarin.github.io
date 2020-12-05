import { css } from "@emotion/core";
import React from "react";
import { Svg } from "react-optimized-image";
import Codepen from "src/assets/codepen.svg";
import Email from "src/assets/email.svg";
import Github from "src/assets/github.svg";
import Linkedin from "src/assets/linkedin.svg";
import Twitter from "src/assets/twitter.svg";

const twitterLink = "https://twitter.com/chooblarin";
const githubLink = "https://github.com/chooblarin";
const codepenLink = "https://codepen.io/chooblarin";
const linkedInLink = "https://linkedin.com/in/sota-hatakeyama-35bb07120";
const mailToLink = "mailto:choo.bla.rin@gmail.com";

const serviceIconStyle = css`
  width: 32px;
  height: 32px;
  color: #4a4a4a;
  color: var(--color-text);
  transition: color 0.2s linear;
  &:hover {
    color: #983bc9;
    color: var(--color-primary);
  }
`;

export const SocialAccountLinks: React.FC = () => (
  <div
    css={css`
      display: flex;
      justify-content: center;
      color: #777777;

      a {
        padding: 0 8px;
      }
    `}
  >
    <a
      href={twitterLink}
      title="Twitter"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Svg src={Twitter} css={serviceIconStyle} />
    </a>

    <a
      href={githubLink}
      title="GitHub"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Svg src={Github} css={serviceIconStyle} />
    </a>

    <a
      href={codepenLink}
      title="CodePen"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Svg src={Codepen} css={serviceIconStyle} />
    </a>

    <a
      href={linkedInLink}
      title="LinkedIn"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Svg src={Linkedin} css={serviceIconStyle} />
    </a>

    <a href={mailToLink}>
      <Svg src={Email} css={serviceIconStyle} />
    </a>
  </div>
);
