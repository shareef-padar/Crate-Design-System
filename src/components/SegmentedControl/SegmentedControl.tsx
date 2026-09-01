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
  /**
   * Draw the track's own background/padding. Set false to embed the control
   * inside another bordered container (e.g. alongside a Stepper in one
   * shared row) — the selected option switches from an elevated white pill
   * to a filled+bordered one, since there's no track behind it for contrast.
   */
  bordered?: boolean;
  className?: string;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  label,
  bordered = true,
  className,
}: SegmentedControlProps) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cx(styles.track, !bordered && styles.unbordered, className)}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={selected}
            type="button"
            className={cx(
              styles.option,
              !bordered && styles.optionUnbordered,
              selected && (bordered ? styles.selected : styles.selectedUnbordered),
            )}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
