import { css } from "@emotion/react";
import Link, { LinkProps } from "next/link";
import * as React from "react";

export type RectLinkProps = { children: React.ReactNode } & LinkProps;

export const RectLink = ({ children, ...rest }: RectLinkProps) => (
  <Link passHref={true} {...rest} legacyBehavior>
    <a
      css={css`
        text-decoration: none;
        padding: 5px 14px;
        border: 1px solid #dddddd;
        transition: border-color 0.2s linear;
        &:hover {
          border: 1px solid #9c9c9c;
        }
      `}
    >
      {children}
    </a>
  </Link>
);
