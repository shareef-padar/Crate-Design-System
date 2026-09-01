import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Badge.module.css";

export type BadgeTone =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type BadgeSize = "sm" | "md";

const TONE_CLASS: Record<BadgeTone, string> = {
  neutral: styles.neutral,
  accent: styles.accent,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
  info: styles.info,
};

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  tone?: BadgeTone;
  size?: BadgeSize;
  /** Show a leading status dot. Ignored when `icon` is set. */
  dot?: boolean;
  /**
   * Optional leading icon (e.g. a Phosphor icon). Decorative — the badge text
   * carries the meaning, so the icon is hidden from assistive tech.
   */
  icon?: ReactNode;
  children: ReactNode;
}

/** Compact status label. Tones map to the semantic status colors (subtle backgrounds). */
export function Badge({
  tone = "neutral",
  size = "md",
  dot = false,
  icon,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cx(
        styles.badge,
        TONE_CLASS[tone],
        size === "sm" && styles.sm,
        className,
      )}
      {...rest}
    >
      {icon ? (
        <span className={styles.icon} aria-hidden>
          {icon}
        </span>
      ) : (
        dot && <span className={styles.dot} aria-hidden />
      )}
      {children}
    </span>
  );
}
