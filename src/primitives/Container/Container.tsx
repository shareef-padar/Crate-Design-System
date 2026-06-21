import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cx } from "../../utils/cx";
import styles from "./Container.module.css";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

const SIZE_CLASS: Record<ContainerSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
  full: styles.full,
};

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  /** Max content width. Default: "lg". */
  size?: ContainerSize;
}

/**
 * Page-level wrapper: centers content, caps width, and applies responsive inline padding
 * that grows on larger screens. Use it to frame marketing pages, product views, dashboards.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ size = "lg", className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cx(styles.container, SIZE_CLASS[size], className)}
        {...rest}
      />
    );
  },
);
