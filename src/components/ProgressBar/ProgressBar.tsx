import { type CSSProperties } from "react";
import { cx } from "../../utils/cx";
import styles from "./ProgressBar.module.css";

export interface ProgressBarProps {
  /** 0–max. Omit for an indeterminate bar. */
  value?: number;
  max?: number;
  /** Accessible label describing what's loading. */
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

/** Determinate or indeterminate progress indicator. */
export function ProgressBar({
  value,
  max = 100,
  label,
  size = "md",
  className,
}: ProgressBarProps) {
  const indeterminate = value === undefined;
  const pct = indeterminate ? 0 : Math.max(0, Math.min(1, value / max)) * 100;
  return (
    <div
      className={cx(styles.track, size === "sm" && styles.sm, className)}
      role="progressbar"
      aria-label={label}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : max}
      aria-valuenow={indeterminate ? undefined : value}
    >
      <div
        className={cx(styles.fill, indeterminate && styles.indeterminate)}
        style={indeterminate ? undefined : ({ inlineSize: `${pct}%` } as CSSProperties)}
      />
    </div>
  );
}
