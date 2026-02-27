import { Button as BaseButton } from "@base-ui/react/button";
import React, { type ReactNode } from "react";

import "../styles.css";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "sm" | "md";

export type ButtonProps = {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

const joinClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(" ");

export default function Button({
  children,
  variant = "solid",
  size = "md",
  disabled = false,
  type = "button",
  onClick,
  className,
}: ButtonProps) {
  return (
    <BaseButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={joinClassNames("ds-button", className)}
      data-variant={variant}
      data-size={size}
    >
      {children}
    </BaseButton>
  );
}
