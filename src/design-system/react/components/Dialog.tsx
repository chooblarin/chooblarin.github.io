import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import React, { type ReactNode } from "react";

import "../styles.css";

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
      <BaseDialog.Trigger className="ds-dialog-trigger">
        {triggerLabel}
      </BaseDialog.Trigger>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="ds-dialog-backdrop" />
        <BaseDialog.Popup className="ds-dialog-popup">
          <BaseDialog.Title className="ds-dialog-title">{title}</BaseDialog.Title>
          {description && (
            <BaseDialog.Description className="ds-dialog-description">
              {description}
            </BaseDialog.Description>
          )}
          <div className="ds-dialog-content">{children}</div>
          <div className="ds-dialog-actions">
            <BaseDialog.Close className="ds-dialog-close">
              {closeLabel}
            </BaseDialog.Close>
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
