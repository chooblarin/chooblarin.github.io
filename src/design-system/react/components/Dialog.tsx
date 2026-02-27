import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import React, { type ReactNode } from "react";

import { cn } from "../lib/cn";
import {
  dialogActionsStyles,
  dialogBackdropStyles,
  dialogCloseStyles,
  dialogContentStyles,
  dialogDescriptionStyles,
  dialogPopupStyles,
  dialogTitleStyles,
  dialogTriggerStyles,
} from "./Dialog.styles";

export type DialogProps = {
  title: string;
  description?: string;
  triggerLabel?: string;
  closeLabel?: string;
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function Dialog({
  title,
  description,
  triggerLabel = "Open dialog",
  closeLabel = "Close",
  children,
  open,
  defaultOpen,
  onOpenChange,
}: DialogProps) {
  return (
    <BaseDialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
    >
      <BaseDialog.Trigger className={cn(dialogTriggerStyles())}>
        {triggerLabel}
      </BaseDialog.Trigger>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={cn(dialogBackdropStyles())} />
        <BaseDialog.Popup className={cn(dialogPopupStyles())}>
          <BaseDialog.Title className={cn(dialogTitleStyles())}>
            {title}
          </BaseDialog.Title>
          {description && (
            <BaseDialog.Description className={cn(dialogDescriptionStyles())}>
              {description}
            </BaseDialog.Description>
          )}
          <div className={cn(dialogContentStyles())}>{children}</div>
          <div className={cn(dialogActionsStyles())}>
            <BaseDialog.Close className={cn(dialogCloseStyles())}>
              {closeLabel}
            </BaseDialog.Close>
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
