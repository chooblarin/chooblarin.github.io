import { cva, type VariantProps } from "class-variance-authority";

import styles from "./PostItem.module.css";

export const postItemVariants = cva(styles.root, {
  variants: {
    emphasis: {
      default: styles.emphasisDefault,
      subtle: styles.emphasisSubtle,
    },
  },
  defaultVariants: {
    emphasis: "default",
  },
});

export type PostItemVariantProps = VariantProps<typeof postItemVariants>;
