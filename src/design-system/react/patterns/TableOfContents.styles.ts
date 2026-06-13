import { cva, type VariantProps } from "class-variance-authority";

import styles from "./TableOfContents.module.css";

export const tableOfContentsStyles = cva(styles.root);

export const tableOfContentsItemVariants = cva(styles.item, {
  variants: {
    depth: {
      "2": styles.depth2,
      "3": styles.depth3,
    },
    active: {
      true: styles.itemActive,
      false: "",
    },
  },
  defaultVariants: {
    depth: "2",
    active: false,
  },
});

export type TableOfContentsItemVariantProps = VariantProps<
  typeof tableOfContentsItemVariants
>;
