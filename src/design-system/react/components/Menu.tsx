import { Menu as BaseMenu } from "@base-ui/react/menu";
import React from "react";

import { cn } from "../lib/cn";
import {
  menuItemStyles,
  menuPopupStyles,
  menuPositionerStyles,
  menuTriggerStyles,
} from "./Menu.styles";

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
      <BaseMenu.Trigger className={cn(menuTriggerStyles())}>
        {triggerLabel}
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          sideOffset={8}
          className={cn(menuPositionerStyles())}
        >
          <BaseMenu.Popup className={cn(menuPopupStyles())}>
            {items.map((item) => {
              const disabled = item.disabled || disabledKeySet.has(item.key);

              return (
                <BaseMenu.Item
                  key={item.key}
                  disabled={disabled}
                  className={cn(menuItemStyles())}
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
