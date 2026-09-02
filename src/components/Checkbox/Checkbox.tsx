import {
  forwardRef,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cx } from "../../utils/cx";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  /** Label beside the control. */
  label?: ReactNode;
  /** Secondary description below the label. */
  description?: ReactNode;
  /**
   * "Some but not all" state — for a parent checkbox representing a partially
   * selected group. Purely visual (the DOM `indeterminate` property isn't a
   * JSX attribute); `checked` still controls the actual form value.
   */
  indeterminate?: boolean;
}

/** Checkbox with an inline label. Teal fill when checked. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { label, description, indeterminate = false, disabled, className, ...rest },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <label
        className={cx(
          styles.root,
          !description && styles.singleLine,
          disabled && styles.disabled,
          className,
        )}
      >
        <span className={styles.control}>
          <input
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            type="checkbox"
            className={cx(styles.input, indeterminate && styles.indeterminate)}
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
          <svg className={styles.dash} viewBox="0 0 16 16" aria-hidden>
            <path
              d="M4 8h8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
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
