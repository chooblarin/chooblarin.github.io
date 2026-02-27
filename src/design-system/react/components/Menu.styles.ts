import { cva } from "class-variance-authority";

import styles from "./Menu.module.css";

export const menuTriggerStyles = cva(styles.trigger);
export const menuPositionerStyles = cva(styles.positioner);
export const menuPopupStyles = cva(styles.popup);
export const menuItemStyles = cva(styles.item);
