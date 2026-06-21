import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cx } from "../../utils/cx";
import { useFieldControl } from "../FormField/FieldContext";
import field from "../_shared/field.module.css";
import styles from "./Textarea.module.css";

export type TextareaProps = ComponentPropsWithoutRef<"textarea">;

/** Multi-line text input. Inherits id / aria / invalid state from a FormField. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { rows = 4, disabled, required, id, className, ...rest },
    ref,
  ) {
    const fieldProps = useFieldControl({ disabled, required, id });
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cx(field.control, styles.textarea, className)}
        {...fieldProps}
        {...rest}
      />
    );
  },
);
