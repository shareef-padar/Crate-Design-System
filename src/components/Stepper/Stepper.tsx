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
}

export function Stepper({
  value,
  onChange,
  min = 1,
  max = Infinity,
  step = 1,
  unit,
  label,
  className,
  ...rest
}: StepperProps) {
  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));

  return (
    <div
      role="group"
      aria-label={label}
      className={cx(styles.stepper, className)}
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
