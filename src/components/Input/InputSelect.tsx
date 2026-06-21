import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import styles from "./Input.module.css";

export interface InputSelectProps
  extends Omit<ComponentPropsWithoutRef<"select">, "size"> {
  /** <option> / <optgroup> elements. */
  children: ReactNode;
  /** Accessible label — required since this select has no visible <label>. */
  "aria-label": string;
  /** Which side of the field it sits on — controls the divider. Auto-set by Input. */
  side?: "prefix" | "suffix";
}

/** Borderless native select made to drop into an Input `prefix` / `suffix`
 *  — e.g. a country-code or unit/currency picker attached to the field.
 *  Native select = correct keyboard, mobile, and screen-reader behavior. */
export const InputSelect = forwardRef<HTMLSelectElement, InputSelectProps>(
  function InputSelect({ className, children, disabled, side = "prefix", ...rest }, ref) {
    return (
      <span
        className={cx(
          styles.selectAdornment,
          side === "prefix" ? styles.prefixSelect : styles.suffixSelect,
          disabled && styles.selectDisabled,
        )}
      >
        <select
          ref={ref}
          disabled={disabled}
          className={cx(styles.adornmentSelect, className)}
          {...rest}
        >
          {children}
        </select>
        <span className={styles.adornmentChevron} aria-hidden>
          <CaretDown />
        </span>
      </span>
    );
  },
);
