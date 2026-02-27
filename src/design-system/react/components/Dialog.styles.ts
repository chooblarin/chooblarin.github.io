import { cva } from "class-variance-authority";

import styles from "./Dialog.module.css";

export const dialogTriggerStyles = cva(styles.trigger);
export const dialogBackdropStyles = cva(styles.backdrop);
export const dialogPopupStyles = cva(styles.popup);
export const dialogTitleStyles = cva(styles.title);
export const dialogDescriptionStyles = cva(styles.description);
export const dialogContentStyles = cva(styles.content);
export const dialogActionsStyles = cva(styles.actions);
export const dialogCloseStyles = cva(styles.close);
