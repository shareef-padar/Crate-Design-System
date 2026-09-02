import { type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./StatusIcon.module.css";

export type StatusIconTone = "accent" | "success" | "danger" | "warning" | "info";
export type StatusIconSize = "sm" | "md" | "lg";
export type StatusIconShape = "circle" | "square";

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
  /** "circle" (default) for a standalone status cue; "square" for an icon
   *  tile inline in a list row (e.g. a Menu item). */
  shape?: StatusIconShape;
  className?: string;
}

/** A tinted shape behind an icon — for a prominent, non-inline status cue
 *  (an empty state, a confirmation screen, a result summary) or an icon
 *  tile in a list row. Not for use inside a small control like an Input's
 *  suffix. */
export function StatusIcon({
  icon,
  tone = "accent",
  size = "md",
  shape = "circle",
  className,
}: StatusIconProps) {
  return (
    <div
      className={cx(
        styles.circle,
        shape === "square" && styles.square,
        TONE_CLASS[tone],
        SIZE_CLASS[size],
        className,
      )}
      aria-hidden
    >
      {icon}
    </div>
  );
}
