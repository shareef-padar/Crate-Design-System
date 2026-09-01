import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./RadioCard.module.css";

export interface RadioCardProps
  extends Omit<ComponentPropsWithoutRef<"input">, "type" | "title"> {
  title: ReactNode;
  /** Secondary description below the title. */
  description?: ReactNode;
  /** Right-aligned text on the title row, e.g. a price. */
  meta?: ReactNode;
}

/**
 * A bordered, selectable card for choosing between a few distinct options
 * or tiers (e.g. service level, unit size) — not a plain settings toggle.
 * Group cards by giving them the same `name`, like `Radio`.
 */
export const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(
  function RadioCard({ title, description, meta, disabled, className, ...rest }, ref) {
    return (
      <label className={cx(styles.card, disabled && styles.disabled, className)}>
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
        <span className={styles.body}>
          <span className={styles.titleRow}>
            <span className={styles.title}>{title}</span>
            {meta && <span className={styles.meta}>{meta}</span>}
          </span>
          {description && <span className={styles.description}>{description}</span>}
        </span>
      </label>
    );
  },
);
