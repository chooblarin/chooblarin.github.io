import { cva, type VariantProps } from "class-variance-authority";

import styles from "./ButtonLink.module.css";

export const buttonLinkVariants = cva(styles.root, {
  variants: {
    intent: {
      brand: styles.intentBrand,
      neutral: styles.intentNeutral,
      danger: styles.intentDanger,
    },
    appearance: {
      solid: styles.appearanceSolid,
      outline: styles.appearanceOutline,
      ghost: styles.appearanceGhost,
    },
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
    },
  },
  compoundVariants: [
    { intent: "brand", appearance: "solid", class: styles.brandSolid },
    { intent: "brand", appearance: "outline", class: styles.brandOutline },
    { intent: "brand", appearance: "ghost", class: styles.brandGhost },
    { intent: "neutral", appearance: "solid", class: styles.neutralSolid },
    { intent: "neutral", appearance: "outline", class: styles.neutralOutline },
    { intent: "neutral", appearance: "ghost", class: styles.neutralGhost },
    { intent: "danger", appearance: "solid", class: styles.dangerSolid },
    { intent: "danger", appearance: "outline", class: styles.dangerOutline },
    { intent: "danger", appearance: "ghost", class: styles.dangerGhost },
  ],
  defaultVariants: {
    intent: "brand",
    appearance: "solid",
    size: "md",
  },
});

export type ButtonLinkVariantProps = VariantProps<typeof buttonLinkVariants>;
