import type { ReactNode } from "react";

import { cn } from "../lib/cn";
import { type LinkVariantProps, linkVariants } from "./Link.styles";

type LinkIntent = NonNullable<LinkVariantProps["intent"]>;
type LinkDecoration = NonNullable<LinkVariantProps["decoration"]>;

export type LinkProps = {
  href: string;
  children?: ReactNode;
  intent?: LinkIntent;
  decoration?: LinkDecoration;
  external?: boolean;
  className?: string;
  rel?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
};

export default function Link({
  href,
  children,
  intent = "brand",
  decoration = "always",
  external = false,
  className,
  rel,
  target,
}: LinkProps) {
  const resolvedTarget = external ? "_blank" : target;
  const resolvedRel = external ? (rel ?? "noopener noreferrer") : rel;

  return (
    <a
      href={href}
      target={resolvedTarget}
      rel={resolvedRel}
      className={cn(linkVariants({ intent, decoration }), className)}
    >
      {children}
    </a>
  );
}
