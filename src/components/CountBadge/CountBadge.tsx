import { type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./CountBadge.module.css";

export type CountBadgeTone = "danger" | "accent" | "neutral" | "success";

const TONE_CLASS: Record<CountBadgeTone, string> = {
  danger: styles.danger,
  accent: styles.accent,
  neutral: styles.neutral,
  success: styles.success,
};

export interface CountBadgeProps {
  /** The number to show. Capped by `max` (e.g. "99+"). */
  count?: number;
  /** Cap before showing the "+" overflow. Default 99. */
  max?: number;
  /** Render a bare dot (no number) — for "has unread" without a count. */
  dot?: boolean;
  /** Show the badge even when count is 0. Default false (0 hides it). */
  showZero?: boolean;
  tone?: CountBadgeTone;
  /**
   * Wrap a target (icon, avatar, button) to overlay the badge on its
   * top-end corner. Omit to render the badge inline on its own.
   */
  children?: ReactNode;
  /** Accessible text, e.g. "3 unread notifications". Falls back to the count. */
  label?: string;
  className?: string;
}

/** Notification count / status dot. Overlays a child, or renders standalone. */
export function CountBadge({
  count = 0,
  max = 99,
  dot = false,
  showZero = false,
  tone = "danger",
  children,
  label,
  className,
}: CountBadgeProps) {
  const hidden = !dot && count <= 0 && !showZero;
  const display = count > max ? `${max}+` : String(count);
  const a11yLabel = label ?? (dot ? undefined : `${display}`);

  const badge = hidden ? null : (
    <span
      className={cx(
        styles.badge,
        TONE_CLASS[tone],
        dot && styles.isDot,
        Boolean(children) && styles.overlay,
        className,
      )}
      role={dot ? undefined : "status"}
      aria-label={a11yLabel}
    >
      {!dot && <span aria-hidden>{display}</span>}
    </span>
  );

  if (!children) return badge;

  return (
    <span className={styles.anchor}>
      {children}
      {badge}
    </span>
  );
}
