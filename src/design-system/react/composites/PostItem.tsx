import React from "react";

import Link from "../components/Link";
import { cn } from "../lib/cn";
import { formatDisplayDate } from "./date";
import { postItemVariants, type PostItemVariantProps } from "./PostItem.styles";
import styles from "./PostItem.module.css";

type PostItemEmphasis = NonNullable<PostItemVariantProps["emphasis"]>;

export type PostItemProps = {
  href: string;
  title: string;
  date: Date | string;
  description?: string;
  emphasis?: PostItemEmphasis;
  className?: string;
};

export default function PostItem({
  href,
  title,
  date,
  description,
  emphasis = "default",
  className,
}: PostItemProps) {
  return (
    <Link
      href={href}
      intent="muted"
      decoration="none"
      className={cn(postItemVariants({ emphasis }), className)}
    >
      <article className={styles.body}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
        <p className={styles.date}>{formatDisplayDate(date)}</p>
      </article>
    </Link>
  );
}
