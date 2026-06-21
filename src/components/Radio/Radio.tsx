import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Radio.module.css";

export interface RadioProps
  extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  /** Label beside the control. */
  label?: ReactNode;
  /** Secondary description below the label. */
  description?: ReactNode;
}

/** Radio with an inline label. Group radios by giving them the same `name`. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, description, disabled, className, ...rest },
  ref,
) {
  return (
    <label className={cx(styles.root, disabled && styles.disabled, className)}>
      <span className={styles.control}>
        <input
          ref={ref}
          type="radio"
          className={styles.input}
          disabled={disabled}
          {...rest}
        />
        <span className={styles.dot} aria-hidden />
      </span>
      {(label || description) && (
        <span className={styles.text}>
          {label && <span className={styles.label}>{label}</span>}
          {description && <span className={styles.description}>{description}</span>}
        </span>
      )}
    </label>
  );
});
