import { type CSSProperties } from "react";
import { cx } from "../../utils/cx";
import styles from "./Skeleton.module.css";

export type SkeletonVariant = "text" | "rect" | "circle";

export interface SkeletonProps {
  variant?: SkeletonVariant;
  /** CSS width (e.g. "12rem", "60%"). */
  width?: string;
  /** CSS height. Defaults per variant. */
  height?: string;
  className?: string;
}

/** Loading placeholder. Pulses gently; respects reduced-motion. */
export function Skeleton({ variant = "text", width, height, className }: SkeletonProps) {
  const style: CSSProperties = {
    inlineSize: width,
    blockSize: height,
  };
  return (
    <span
      className={cx(styles.skeleton, styles[variant], className)}
      style={style}
      aria-hidden
    />
  );
}
