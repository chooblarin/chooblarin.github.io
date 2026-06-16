import { cn } from "../lib/cn";
import Link from "../primitives/Link";
import {
  paginationNavItemStyles,
  paginationNavLinkStyles,
  paginationNavListStyles,
  paginationNavStyles,
} from "./PaginationNav.styles";

export type PaginationNavProps = {
  prevHref?: string;
  nextHref?: string;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
};

export default function PaginationNav({
  prevHref,
  nextHref,
  prevLabel = "前のページへ",
  nextLabel = "次のページへ",
  className,
}: PaginationNavProps) {
  if (!prevHref && !nextHref) {
    return null;
  }

  return (
    <nav
      className={cn(paginationNavStyles(), className)}
      aria-label="ページネーション"
    >
      <ul className={cn(paginationNavListStyles())}>
        {prevHref && (
          <li className={cn(paginationNavItemStyles())}>
            <Link
              href={prevHref}
              intent="muted"
              decoration="none"
              className={cn(paginationNavLinkStyles())}
            >
              {prevLabel}
            </Link>
          </li>
        )}
        {nextHref && (
          <li className={cn(paginationNavItemStyles())}>
            <Link
              href={nextHref}
              intent="muted"
              decoration="none"
              className={cn(paginationNavLinkStyles())}
            >
              {nextLabel}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
