import { css } from "@emotion/core";
import Link, { LinkProps } from "next/link";
import * as React from "react";

export type RectLinkProps = {} & LinkProps;

export const RectLink: React.FC<RectLinkProps> = ({ children, ...rest }) => (
  <Link passHref={true} {...rest}>
    <a
      css={css`
        padding: 5px 14px;
        border: 1px solid #dddddd;
        margin: 48px 0;
      `}
    >
      {children}
    </a>
  </Link>
);
