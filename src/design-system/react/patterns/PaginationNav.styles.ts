import { cva } from "class-variance-authority";

import styles from "./PaginationNav.module.css";

export const paginationNavStyles = cva(styles.root);
export const paginationNavListStyles = cva(styles.list);
export const paginationNavItemStyles = cva(styles.item);
export const paginationNavLinkStyles = cva(styles.link);
