import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./List.module.css";

export interface ListProps extends ComponentPropsWithoutRef<"ul"> {
  /** "unordered" (bullets), "ordered" (numbers), or "plain" (no markers). */
  variant?: "unordered" | "ordered" | "plain";
  /** Add divider lines between items. */
  divided?: boolean;
  children: ReactNode;
}

/** Styled list. Use with ListItem. */
export function List({
  variant = "unordered",
  divided = false,
  className,
  children,
  ...rest
}: ListProps) {
  const Tag = variant === "ordered" ? "ol" : "ul";
  return (
    <Tag
      className={cx(styles.list, styles[variant], divided && styles.divided, className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export interface ListItemProps extends ComponentPropsWithoutRef<"li"> {
  /** Optional leading icon/marker (replaces the bullet). */
  icon?: ReactNode;
  children: ReactNode;
}

export function ListItem({ icon, className, children, ...rest }: ListItemProps) {
  return (
    <li className={cx(styles.item, Boolean(icon) && styles.hasIcon, className)} {...rest}>
      {icon && (
        <span className={styles.icon} aria-hidden>
          {icon}
        </span>
      )}
      <span>{children}</span>
    </li>
  );
}
