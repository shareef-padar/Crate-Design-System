import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Link.module.css";

export type LinkVariant = "default" | "subtle";

export interface LinkProps extends ComponentPropsWithoutRef<"a"> {
  /** "default" is underlined; "subtle" underlines on hover/focus only. */
  variant?: LinkVariant;
  children: ReactNode;
}

/** Inline text link. Accent-colored, always keyboard-focusable, never color-only. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { variant = "default", className, children, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cx(styles.link, variant === "subtle" && styles.subtle, className)}
      {...rest}
    >
      {children}
    </a>
  );
});
