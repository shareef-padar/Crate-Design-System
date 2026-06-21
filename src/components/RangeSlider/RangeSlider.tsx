import {
  forwardRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";
import { cx } from "../../utils/cx";
import { useFieldControl } from "../FormField/FieldContext";
import styles from "./RangeSlider.module.css";

export interface RangeSliderProps
  extends Omit<ComponentPropsWithoutRef<"input">, "type" | "value" | "defaultValue" | "onChange"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  /** Show the current value beside the slider. */
  showValue?: boolean;
  /** Format the displayed value (e.g. add "sqft"). */
  formatValue?: (value: number) => string;
}

/** Styled native range input. Fill grows with the value; FormField-compatible. */
export const RangeSlider = forwardRef<HTMLInputElement, RangeSliderProps>(
  function RangeSlider(
    {
      value,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      showValue = false,
      formatValue,
      disabled,
      id,
      className,
      ...rest
    },
    ref,
  ) {
    const field = useFieldControl({ disabled, id });
    const [internal, setInternal] = useState(defaultValue);
    const current = value ?? internal;
    const pct = ((current - min) / (max - min)) * 100;

    return (
      <div className={cx(styles.wrap, className)}>
        <input
          ref={ref}
          type="range"
          className={styles.input}
          min={min}
          max={max}
          step={step}
          value={current}
          disabled={field.disabled}
          id={field.id}
          aria-describedby={field["aria-describedby"]}
          style={{ "--range-pct": `${pct}%` } as CSSProperties}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (value === undefined) setInternal(v);
            onChange?.(v);
          }}
          {...rest}
        />
        {showValue && (
          <span className={styles.value}>
            {formatValue ? formatValue(current) : current}
          </span>
        )}
      </div>
    );
  },
);
