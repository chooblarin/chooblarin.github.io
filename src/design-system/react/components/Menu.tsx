import { Menu as BaseMenu } from "@base-ui/react/menu";
import React from "react";

import "../styles.css";

export type MenuItem = {
  key: string;
  label: string;
  disabled?: boolean;
};

export type MenuProps = {
  triggerLabel: string;
  items: MenuItem[];
  onSelect?: (key: string) => void;
  disabledKeys?: string[];
};

export default function Menu({
  triggerLabel,
  items,
  onSelect,
  disabledKeys = [],
}: MenuProps) {
  const disabledKeySet = new Set(disabledKeys);

  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger className="ds-menu-trigger">{triggerLabel}</BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner sideOffset={8} className="ds-menu-positioner">
          <BaseMenu.Popup className="ds-menu-popup">
            {items.map((item) => {
              const disabled = item.disabled || disabledKeySet.has(item.key);

              return (
                <BaseMenu.Item
                  key={item.key}
                  disabled={disabled}
                  className="ds-menu-item"
                  onClick={() => {
                    if (!disabled) {
                      onSelect?.(item.key);
                    }
                  }}
                >
                  {item.label}
                </BaseMenu.Item>
              );
            })}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
