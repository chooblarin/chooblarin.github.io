import { useEffect, useMemo, useState } from "react";

import { cn } from "../lib/cn";
import styles from "./TableOfContents.module.css";
import {
  tableOfContentsItemVariants,
  tableOfContentsStyles,
} from "./TableOfContents.styles";

export type TableOfContentsHeading = {
  id: string;
  text: string;
  depth: 2 | 3;
};

export type TableOfContentsProps = {
  headings: TableOfContentsHeading[];
  activeTracking?: boolean;
  maxDepth?: 2 | 3;
  /** Distance from the viewport top that marks the "current" heading. */
  threshold?: number;
  className?: string;
};

const getHashId = () => {
  if (typeof window === "undefined") return "";
  return window.location.hash.replace(/^#/, "");
};

export default function TableOfContents({
  headings,
  activeTracking = true,
  maxDepth = 3,
  threshold = 120,
  className,
}: TableOfContentsProps) {
  const filteredHeadings = useMemo(
    () => headings.filter((heading) => heading.depth <= maxDepth),
    [headings, maxDepth],
  );

  const [activeId, setActiveId] = useState<string>(() => getHashId());

  useEffect(() => {
    if (filteredHeadings.length === 0) {
      setActiveId("");
      return;
    }

    if (!activeTracking || typeof window === "undefined") {
      const hashId = getHashId();
      setActiveId(
        hashId && filteredHeadings.some((h) => h.id === hashId)
          ? hashId
          : filteredHeadings[0].id,
      );
      return;
    }

    const headingIds = new Set(filteredHeadings.map((h) => h.id));
    const elements = filteredHeadings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    // The heading whose top is the last one above the threshold is "current".
    const resolveActiveId = () => {
      if (elements.length === 0) return filteredHeadings[0].id;

      const last = elements[elements.length - 1];
      const nearBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (nearBottom) return last.id;

      let currentId = elements[0].id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= threshold) {
          currentId = el.id;
          continue;
        }
        break;
      }
      return currentId;
    };

    let frameId: number | null = null;
    const update = () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() =>
        setActiveId(resolveActiveId()),
      );
    };

    const syncFromHash = () => {
      const hashId = getHashId();
      if (hashId && headingIds.has(hashId)) setActiveId(hashId);
    };

    const observer = new IntersectionObserver(update, {
      root: null,
      rootMargin: `-${threshold + 8}px 0px -70% 0px`,
      threshold: [0, 0.2, 0.5, 1],
    });
    elements.forEach((el) => observer.observe(el));

    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });

    syncFromHash();
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [activeTracking, filteredHeadings, threshold]);

  if (filteredHeadings.length === 0) {
    return null;
  }

  return (
    <aside className={cn(tableOfContentsStyles(), className)}>
      <nav className={styles.panel} aria-label="目次">
        <p className={styles.heading}>目次</p>
        <ul className={styles.list}>
          {filteredHeadings.map((heading) => {
            const isActive = activeTracking && heading.id === activeId;
            return (
              <li
                key={heading.id}
                className={cn(
                  tableOfContentsItemVariants({
                    depth: String(heading.depth) as "2" | "3",
                    active: isActive,
                  }),
                )}
              >
                <a
                  href={`#${heading.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(styles.link, isActive && styles.linkActive)}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
