import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  /** Label beside the control. */
  label?: ReactNode;
  /** Secondary description below the label. */
  description?: ReactNode;
}

/** Checkbox with an inline label. Accent fill when checked. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, description, disabled, className, ...rest }, ref) {
    return (
      <label className={cx(styles.root, disabled && styles.disabled, className)}>
        <span className={styles.control}>
          <input
            ref={ref}
            type="checkbox"
            className={styles.input}
            disabled={disabled}
            {...rest}
          />
          <svg className={styles.check} viewBox="0 0 16 16" aria-hidden>
            <path
              d="m3.5 8.5 3 3 6-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {(label || description) && (
          <span className={styles.text}>
            {label && <span className={styles.label}>{label}</span>}
            {description && <span className={styles.description}>{description}</span>}
          </span>
        )}
      </label>
    );
  },
);
