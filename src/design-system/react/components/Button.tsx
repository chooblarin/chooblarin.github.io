import { Button as BaseButton } from "@base-ui/react/button";
import React, { type ReactNode } from "react";

import { cn } from "../lib/cn";
import { buttonVariants, type ButtonVariantProps } from "./Button.styles";

type ButtonIntent = NonNullable<ButtonVariantProps["intent"]>;
type ButtonAppearance = NonNullable<ButtonVariantProps["appearance"]>;
type ButtonSize = NonNullable<ButtonVariantProps["size"]>;

export type ButtonProps = {
  children?: ReactNode;
  intent?: ButtonIntent;
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  intent = "brand",
  appearance = "solid",
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
      className={cn(buttonVariants({ intent, appearance, size }), className)}
    >
      {children}
    </BaseButton>
  );
}
