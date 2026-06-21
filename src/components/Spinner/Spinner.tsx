import { type CSSProperties } from "react";
import { cx } from "../../utils/cx";
import styles from "./Spinner.module.css";

export type SpinnerSize = "sm" | "md" | "lg";

const SIZE: Record<SpinnerSize, string> = {
  sm: "1rem",
  md: "1.25rem",
  lg: "1.5rem",
};

export interface SpinnerProps {
  size?: SpinnerSize;
  /** Accessible label. Set to undefined when decorative inside a labelled control. */
  label?: string;
  /** Inherit the surrounding text color instead of the accent. */
  inherit?: boolean;
  className?: string;
}

/** Indeterminate loading indicator. */
export function Spinner({
  size = "md",
  label = "Loading",
  inherit = false,
  className,
}: SpinnerProps) {
  const style = { "--spinner-size": SIZE[size] } as CSSProperties;
  return (
    <span
      className={cx(styles.spinner, inherit && styles.inherit, className)}
      style={style}
      role="status"
      aria-label={label}
    />
  );
}
