import { type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./SegmentedControl.module.css";

export interface SegmentOption {
  value: string;
  label: ReactNode;
}

export interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  /** Accessible label for the group. */
  label?: string;
  className?: string;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  label,
  className,
}: SegmentedControlProps) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cx(styles.track, className)}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={selected}
            type="button"
            className={cx(styles.option, selected && styles.selected)}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
