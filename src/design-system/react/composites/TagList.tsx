import React from "react";

import Link from "../components/Link";
import { cn } from "../lib/cn";
import {
  tagLinkVariants,
  tagListVariants,
  type TagListVariantProps,
} from "./TagList.styles";
import styles from "./TagList.module.css";

type TagListVariant = NonNullable<TagListVariantProps["variant"]>;

export type TagListProps = {
  items: Array<{ label: string; href: string }>;
  variant?: TagListVariant;
  className?: string;
};

export default function TagList({
  items,
  variant = "chip",
  className,
}: TagListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={cn(tagListVariants({ variant }), className)}>
      {items.map((item) => (
        <li key={`${item.href}:${item.label}`} className={styles.item}>
          <Link
            href={item.href}
            intent="muted"
            decoration="none"
            className={cn(tagLinkVariants({ variant }))}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
