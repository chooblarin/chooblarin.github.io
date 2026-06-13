import { cva, type VariantProps } from "class-variance-authority";

import styles from "./TagList.module.css";

export const tagListVariants = cva(styles.root, {
  variants: {
    variant: { chip: styles.variantChip, plain: styles.variantPlain },
  },
  defaultVariants: { variant: "chip" },
});

export const tagLinkVariants = cva(styles.link, {
  variants: { variant: { chip: styles.linkChip, plain: styles.linkPlain } },
  defaultVariants: { variant: "chip" },
});

export type TagListVariantProps = VariantProps<typeof tagListVariants>;
