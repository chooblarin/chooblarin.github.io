import { cn } from "../lib/cn";
import Link from "../primitives/Link";
import { formatDisplayDate } from "./date";
import styles from "./PostItem.module.css";
import { type PostItemVariantProps, postItemVariants } from "./PostItem.styles";

type PostItemEmphasis = NonNullable<PostItemVariantProps["emphasis"]>;

export type PostItemProps = {
  href: string;
  title: string;
  date: Date | string;
  emphasis?: PostItemEmphasis;
  className?: string;
};

export default function PostItem({
  href,
  title,
  date,
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
        <div className={styles.title}>{title}</div>
        <div className={styles.date}>{formatDisplayDate(date)}</div>
      </article>
    </Link>
  );
}
