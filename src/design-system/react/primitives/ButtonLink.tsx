import type { ReactNode } from "react";

import { cn } from "../lib/cn";
import {
  type ButtonLinkVariantProps,
  buttonLinkVariants,
} from "./ButtonLink.styles";

type ButtonLinkIntent = NonNullable<ButtonLinkVariantProps["intent"]>;
type ButtonLinkAppearance = NonNullable<ButtonLinkVariantProps["appearance"]>;
type ButtonLinkSize = NonNullable<ButtonLinkVariantProps["size"]>;

export type ButtonLinkProps = {
  href: string;
  children?: ReactNode;
  intent?: ButtonLinkIntent;
  appearance?: ButtonLinkAppearance;
  size?: ButtonLinkSize;
  external?: boolean;
  className?: string;
};

export default function ButtonLink({
  href,
  children,
  intent = "brand",
  appearance = "solid",
  size = "md",
  external = false,
  className,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        buttonLinkVariants({ intent, appearance, size }),
        className,
      )}
    >
      {children}
    </a>
  );
}
