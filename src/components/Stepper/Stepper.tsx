import { type ComponentPropsWithoutRef } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import styles from "./Stepper.module.css";

export interface StepperProps
  extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Unit label shown beside the value, e.g. "Months" */
  unit?: string;
  /** Accessible label for the stepper group */
  label?: string;
  /**
   * Draw the stepper's own border/background. Set false to embed it inside
   * another bordered container (e.g. alongside a SegmentedControl in one
   * shared row) without a doubled-up border.
   */
  bordered?: boolean;
}

export function Stepper({
  value,
  onChange,
  min = 1,
  max = Infinity,
  step = 1,
  unit,
  label,
  bordered = true,
  className,
  ...rest
}: StepperProps) {
  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));

  return (
    <div
      role="group"
      aria-label={label}
      className={cx(styles.stepper, !bordered && styles.unbordered, className)}
      {...rest}
    >
      <button
        type="button"
        aria-label="Decrease"
        className={styles.btn}
        onClick={decrement}
        disabled={value <= min}
      >
        <Minus weight="bold" size={16} />
      </button>

      <output className={styles.display}>
        <span className={styles.value}>{value}</span>
        {unit && <span className={styles.unit}>{unit}</span>}
      </output>

      <button
        type="button"
        aria-label="Increase"
        className={styles.btn}
        onClick={increment}
        disabled={value >= max}
      >
        <Plus weight="bold" size={16} />
      </button>
    </div>
  );
}
