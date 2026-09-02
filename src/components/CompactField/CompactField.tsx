import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import styles from "./CompactField.module.css";

export interface CompactSelectFieldProps
  extends Omit<ComponentPropsWithoutRef<"select">, "size"> {
  /** Small caption above the value, e.g. "Period". */
  label: string;
  /** <option> / <optgroup> elements. */
  children: ReactNode;
}

/**
 * A caption above a bold value, styled as a dropdown trigger — no border of
 * its own. Meant to sit inside a `FieldGroup` alongside other compact
 * fields (e.g. "Period | Size"), not as a standalone field — use `Select`
 * for a normal, independently-bordered dropdown.
 */
export const CompactSelectField = forwardRef<HTMLSelectElement, CompactSelectFieldProps>(
  function CompactSelectField({ label, id, className, children, ...rest }, ref) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    return (
      <label htmlFor={fieldId} className={cx(styles.segment, className)}>
        <span className={styles.caption}>{label}</span>
        <span className={styles.valueRow}>
          <select ref={ref} id={fieldId} className={styles.control} {...rest}>
            {children}
          </select>
          <CaretDown className={styles.chevron} aria-hidden />
        </span>
      </label>
    );
  },
);

export interface CompactInputFieldProps extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  /** Small caption above the value, e.g. "Size (sqft)". */
  label: string;
}

/**
 * A caption above a bold, directly-editable value — no border of its own,
 * no dropdown chevron. Meant to sit inside a `FieldGroup` alongside other
 * compact fields — use `Input` for a normal, independently-bordered field.
 */
export const CompactInputField = forwardRef<HTMLInputElement, CompactInputFieldProps>(
  function CompactInputField({ label, id, className, ...rest }, ref) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    return (
      <label htmlFor={fieldId} className={cx(styles.segment, className)}>
        <span className={styles.caption}>{label}</span>
        <span className={styles.valueRow}>
          <input ref={ref} id={fieldId} className={styles.control} {...rest} />
        </span>
      </label>
    );
  },
);
