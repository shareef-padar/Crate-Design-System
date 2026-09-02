import { type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./StatusIcon.module.css";

export type StatusIconTone = "accent" | "success" | "danger" | "warning" | "info";
export type StatusIconSize = "sm" | "md" | "lg";

const TONE_CLASS: Record<StatusIconTone, string> = {
  accent: styles.accent,
  success: styles.success,
  danger: styles.danger,
  warning: styles.warning,
  info: styles.info,
};
const SIZE_CLASS: Record<StatusIconSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export interface StatusIconProps {
  icon: ReactNode;
  tone?: StatusIconTone;
  size?: StatusIconSize;
  className?: string;
}

/** A tinted circle behind an icon — for a prominent, non-inline status cue
 *  (an empty state, a confirmation screen, a result summary). Not for
 *  inline use inside a small control like an Input's suffix. */
export function StatusIcon({ icon, tone = "accent", size = "md", className }: StatusIconProps) {
  return (
    <div className={cx(styles.circle, TONE_CLASS[tone], SIZE_CLASS[size], className)} aria-hidden>
      {icon}
    </div>
  );
}
