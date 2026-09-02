import { type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./FieldGroup.module.css";

export interface FieldGroupProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a few compact fields/controls in one shared border, with a hairline
 * divider between each — e.g. "Period | Size" as a single control. Children
 * should own no border/background of their own (Stepper and SegmentedControl
 * both support `bordered={false}` for exactly this).
 */
export function FieldGroup({ children, className }: FieldGroupProps) {
  return <div className={cx(styles.group, className)}>{children}</div>;
}
