import React, {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";

import Link from "../components/Link";
import { cn } from "../lib/cn";
import {
  tableOfContentsItemVariants,
  tableOfContentsStyles,
} from "./TableOfContents.styles";
import styles from "./TableOfContents.module.css";

export type TableOfContentsHeading = {
  id: string;
  text: string;
  depth: 2 | 3;
};

export type TableOfContentsProps = {
  headings: TableOfContentsHeading[];
  activeTracking?: boolean;
  maxDepth?: 2 | 3;
  stickyTop?: number;
  className?: string;
};

const getHashId = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.hash.replace(/^#/, "");
};

export default function TableOfContents({
  headings,
  activeTracking = true,
  maxDepth = 3,
  stickyTop = 128,
  className,
}: TableOfContentsProps) {
  const filteredHeadings = useMemo(
    () => headings.filter((heading) => heading.depth <= maxDepth),
    [headings, maxDepth]
  );

  const [activeId, setActiveId] = useState<string>(() => getHashId());

  useEffect(() => {
    if (filteredHeadings.length === 0) {
      setActiveId("");
      return;
    }

    if (!activeTracking) {
      const hashId = getHashId();
      if (hashId && filteredHeadings.some((heading) => heading.id === hashId)) {
        setActiveId(hashId);
        return;
      }
      setActiveId(filteredHeadings[0].id);
      return;
    }

    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const headingIds = new Set(filteredHeadings.map((heading) => heading.id));
    const observedElements = filteredHeadings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);

    const syncFromHash = () => {
      const hashId = getHashId();
      if (hashId && headingIds.has(hashId)) {
        setActiveId(hashId);
      }
    };

    const resolveActiveId = () => {
      if (observedElements.length === 0) {
        return filteredHeadings[0].id;
      }

      const pivot = stickyTop + 16;
      let currentId = observedElements[0].id;

      for (const element of observedElements) {
        if (element.getBoundingClientRect().top <= pivot) {
          currentId = element.id;
          continue;
        }
        break;
      }

      return currentId;
    };

    let frameId: number | null = null;

    const updateActiveId = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(() => {
        setActiveId(resolveActiveId());
      });
    };

    const observer = new IntersectionObserver(
      () => {
        updateActiveId();
      },
      {
        root: null,
        rootMargin: `-${stickyTop + 8}px 0px -70% 0px`,
        threshold: [0, 0.2, 0.5, 1],
      }
    );

    observedElements.forEach((element) => observer.observe(element));

    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("resize", updateActiveId);
    window.addEventListener("scroll", updateActiveId, { passive: true });

    syncFromHash();
    updateActiveId();

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("resize", updateActiveId);
      window.removeEventListener("scroll", updateActiveId);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [activeTracking, filteredHeadings, stickyTop]);

  if (filteredHeadings.length === 0) {
    return null;
  }

  const rootStyle = {
    ["--toc-sticky-top" as const]: `${stickyTop}px`,
  } as CSSProperties;

  return (
    <aside className={cn(tableOfContentsStyles(), className)} style={rootStyle}>
      <nav className={styles.panel} aria-label="目次">
        <h2 className={styles.heading}>目次</h2>
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
                  })
                )}
              >
                <Link
                  href={`#${heading.id}`}
                  intent={isActive ? "brand" : "muted"}
                  decoration="none"
                  className={cn(styles.link, isActive && styles.linkActive)}
                >
                  {heading.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
