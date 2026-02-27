import React, { type ReactNode } from "react";

import "../styles.css";

type LinkTone = "default" | "muted";

export type LinkProps = {
  href: string;
  children?: ReactNode;
  external?: boolean;
  underline?: boolean;
  tone?: LinkTone;
  className?: string;
  rel?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
};

const joinClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(" ");

export default function Link({
  href,
  children,
  external = false,
  underline = true,
  tone = "default",
  className,
  rel,
  target,
}: LinkProps) {
  const resolvedTarget = external ? "_blank" : target;
  const resolvedRel = external ? rel ?? "noopener noreferrer" : rel;

  return (
    <a
      href={href}
      target={resolvedTarget}
      rel={resolvedRel}
      className={joinClassNames("ds-link", className)}
      data-tone={tone}
      data-underline={underline ? "true" : "false"}
    >
      {children}
    </a>
  );
}
