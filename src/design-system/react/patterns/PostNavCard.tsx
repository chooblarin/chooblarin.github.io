import { cn } from "../lib/cn";
import Link from "../primitives/Link";
import { formatDisplayDate } from "./date";
import styles from "./PostNavCard.module.css";
import { postNavCardStyles } from "./PostNavCard.styles";

export type PostNavCardProps = {
  href: string;
  label?: string;
  title: string;
  date: Date | string;
  className?: string;
};

export default function PostNavCard({
  href,
  label = "前の記事",
  title,
  date,
  className,
}: PostNavCardProps) {
  return (
    <Link
      href={href}
      intent="muted"
      decoration="none"
      className={cn(postNavCardStyles(), className)}
    >
      <span className={styles.label}>{label}</span>
      <p className={styles.title}>{title}</p>
      <p className={styles.date}>{formatDisplayDate(date)}</p>
    </Link>
  );
}
