import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Spinner } from "../Spinner";
import styles from "./IconButton.module.css";

export type IconButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type IconButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASS: Record<IconButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  danger: styles.danger,
};
const SIZE_CLASS: Record<IconButtonSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export interface IconButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  /** The icon to render. */
  icon: ReactNode;
  /**
   * Optional short label describing the action. Shown as a tooltip (native `title`)
   * on hover — the simplest way to tell people what the button does.
   */
  label?: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  loading?: boolean;
}

/** A square, icon-only button. Pass `label` to show a tooltip describing the action. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      icon,
      label,
      variant = "secondary",
      size = "md",
      loading = false,
      disabled,
      type = "button",
      className,
      ...rest
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        title={label}
        className={cx(
          styles.iconButton,
          VARIANT_CLASS[variant],
          SIZE_CLASS[size],
          className,
        )}
        {...rest}
      >
        <span className={styles.icon} aria-hidden>
          {loading ? <Spinner size="sm" inherit label="" /> : icon}
        </span>
      </button>
    );
  },
);
