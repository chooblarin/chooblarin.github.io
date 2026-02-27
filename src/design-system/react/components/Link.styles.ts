import { cva, type VariantProps } from "class-variance-authority";

import styles from "./Link.module.css";

export const linkVariants = cva(styles.root, {
  variants: {
    intent: {
      brand: styles.intentBrand,
      muted: styles.intentMuted,
      danger: styles.intentDanger,
    },
    decoration: {
      always: styles.decorationAlways,
      hover: styles.decorationHover,
      none: styles.decorationNone,
    },
  },
  defaultVariants: {
    intent: "brand",
    decoration: "always",
  },
});

export type LinkVariantProps = VariantProps<typeof linkVariants>;
