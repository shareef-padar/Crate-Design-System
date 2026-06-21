import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Spinner } from "../Spinner";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  danger: styles.danger,
};
const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * The button label. REQUIRED — Crate has no icon-only Button (a Cargoz audience rule).
   * For a genuinely icon-only control, use `IconButton`, which forces an `aria-label`.
   */
  children: ReactNode;
  /** Optional icon before the label. */
  leadingIcon?: ReactNode;
  /** Optional icon after the label. */
  trailingIcon?: ReactNode;
  /** Show a spinner and block interaction. */
  loading?: boolean;
  /** Stretch to the full width of the container. */
  fullWidth?: boolean;
}

/** The primary action control. Filled accent for the one main action; restraint elsewhere. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    children,
    leadingIcon,
    trailingIcon,
    loading = false,
    fullWidth = false,
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
      className={cx(
        styles.button,
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        fullWidth && styles.fullWidth,
        className,
      )}
      {...rest}
    >
      {loading ? (
        <span className={styles.icon} aria-hidden>
          <Spinner size="sm" inherit label="" />
        </span>
      ) : (
        leadingIcon && (
          <span className={styles.icon} aria-hidden>
            {leadingIcon}
          </span>
        )
      )}
      <span className={styles.label}>{children}</span>
      {trailingIcon && (
        <span className={styles.icon} aria-hidden>
          {trailingIcon}
        </span>
      )}
    </button>
  );
});
