import { useId, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import { FieldContext } from "./FieldContext";
import styles from "./FormField.module.css";

export interface FormFieldProps {
  /** Field label, in plain language (e.g. "Where do you need storage?"). */
  label: ReactNode;
  /** Optional helper text shown below the control. Hidden when an error is shown. */
  helper?: ReactNode;
  /** Error message. Its presence marks the field invalid. */
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  /** Override the generated control id. */
  id?: string;
  /** The control (Input, Select, Textarea, …). */
  children: ReactNode;
  className?: string;
}

/**
 * Labelled form row. Owns the label, helper, error, required mark, and all the ARIA
 * wiring; the control inside reads it via `useFieldControl`.
 */
export function FormField({
  label,
  helper,
  error,
  required = false,
  disabled = false,
  id,
  children,
  className,
}: FormFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const helperId = `${fieldId}-helper`;
  const errorId = `${fieldId}-error`;
  const invalid = Boolean(error);
  const describedBy = invalid ? errorId : helper ? helperId : undefined;

  return (
    <div className={cx(styles.field, className)}>
      <label htmlFor={fieldId} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden>
            *
          </span>
        )}
      </label>

      <FieldContext.Provider
        value={{ id: fieldId, describedBy, invalid, required, disabled }}
      >
        {children}
      </FieldContext.Provider>

      {invalid ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : helper ? (
        <p id={helperId} className={styles.helper}>
          {helper}
        </p>
      ) : null}
    </div>
  );
}
