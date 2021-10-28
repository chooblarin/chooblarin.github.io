import { css } from "@emotion/react";
import Link from "next/link";
import * as React from "react";
import { ColorThemeSwitch } from "./ColorThemeSwitch";
import { SocialAccountLinks } from "./SocialAccountLinks";
import { TitleLogo } from "./TitleLogo";

export const HomeHeader: React.FC = () => (
  <header
    css={css`
      color: #4a4a4a;
      color: var(--color-text);
      position: relative;
      padding: 12px 8px;
    `}
  >
    <div
      css={css`
        display: flex;
        justify-content: flex-end;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        max-width: 740px;
        margin: 20px auto;
        padding: 0 20px;
      `}
    >
      <ColorThemeSwitch />
    </div>
    <section
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 740px;
        margin: 72px auto;
      `}
    >
      <Link href="/">
        <a
          css={css`
            cursor: pointer;
          `}
        >
          <TitleLogo />
        </a>
      </Link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        css={css`
          width: 64px;
          height: 64px;
          color: #4a4a4a;
          color: var(--color-text);
          margin-bottom: 20px;
        `}
      >
        <g stroke="currentColor" strokeWidth="8">
          <path
            fill="currentColor"
            d="M88 236 A54 64 0 0 0 196 236Z M316 236 A54 64 0 0,0 424 236Z"
          />
          <path
            fill="none"
            d="M68 335 H444 M77 335 A196 208 0 0 0 435 335 M117 376 H396 M146 350 V402 M200 350 V430 M256 350 V436 M312 350 V430 M366 350 V402 M16 256 A240 240 0 1 0 496 256 A240 240 0 1 0 16 256"
          />
        </g>
      </svg>
      <SocialAccountLinks />
    </section>
  </header>
);
