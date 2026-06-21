import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import { useFieldControl } from "../FormField/FieldContext";
import field from "../_shared/field.module.css";
import styles from "./Select.module.css";

export type SelectSize = "sm" | "md" | "lg";

const SIZE_CLASS: Record<SelectSize, string> = {
  sm: field.sm,
  md: field.md,
  lg: field.lg,
};

export interface SelectProps
  extends Omit<ComponentPropsWithoutRef<"select">, "size"> {
  selectSize?: SelectSize;
  /** <option> / <optgroup> elements. */
  children: ReactNode;
}

/** Native select, styled. Native = correct keyboard, mobile, and screen-reader behavior. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { selectSize = "md", disabled, required, id, className, children, ...rest },
  ref,
) {
  const fieldProps = useFieldControl({ disabled, required, id });
  return (
    <span className={styles.wrap}>
      <select
        ref={ref}
        className={cx(field.control, SIZE_CLASS[selectSize], styles.select, className)}
        {...fieldProps}
        {...rest}
      >
        {children}
      </select>
      <span className={styles.chevron} aria-hidden>
        <CaretDown />
      </span>
    </span>
  );
});
