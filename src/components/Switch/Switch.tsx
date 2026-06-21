import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Switch.module.css";

export interface SwitchProps
  extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  /** Label beside the switch. */
  label?: ReactNode;
}

/** On/off toggle. A checkbox with role=switch under the hood. */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, disabled, className, ...rest },
  ref,
) {
  return (
    <label className={cx(styles.root, disabled && styles.disabled, className)}>
      <span className={styles.control}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          className={styles.input}
          disabled={disabled}
          {...rest}
        />
        <span className={styles.thumb} aria-hidden />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
});
