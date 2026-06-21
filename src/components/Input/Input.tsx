import {
  forwardRef,
  isValidElement,
  cloneElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cx } from "../../utils/cx";
import { useFieldControl } from "../FormField/FieldContext";
import { InputSelect } from "./InputSelect";
import field from "../_shared/field.module.css";
import styles from "./Input.module.css";

export type InputSize = "sm" | "md" | "lg";

/** How adornments attach: subtle inline text/icon, or a filled bordered segment. */
export type AdornmentVariant = "inline" | "addon";

const SIZE_CLASS: Record<InputSize, string> = {
  sm: field.sm,
  md: field.md,
  lg: field.lg,
};

export interface InputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size" | "prefix"> {
  inputSize?: InputSize;
  /** Content before the input — currency, "https://", a country code, an icon. */
  prefix?: ReactNode;
  /** Content after the input — a unit, "%", a clear button, an icon. */
  suffix?: ReactNode;
  /** Adornment style. "inline" (default) is subtle; "addon" is a filled segment. */
  adornment?: AdornmentVariant;
}

/** Single-line text input. Inherits id / aria / invalid state from a FormField.
 *  Pass `prefix` / `suffix` for currency, units, phone codes, icons, etc. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    inputSize = "md",
    type = "text",
    disabled,
    required,
    id,
    className,
    prefix,
    suffix,
    adornment = "inline",
    ...rest
  },
  ref,
) {
  const fieldProps = useFieldControl({ disabled, required, id });

  // No adornments → plain input, unchanged behaviour.
  if (!prefix && !suffix) {
    return (
      <input
        ref={ref}
        type={type}
        className={cx(field.control, SIZE_CLASS[inputSize], className)}
        {...fieldProps}
        {...rest}
      />
    );
  }

  const invalid = fieldProps["aria-invalid"] === true;

  // A dropdown adornment (InputSelect) renders directly — it manages its own
  // box + divider. Plain text/icon adornments get the padded wrapper span.
  const renderAdornment = (node: ReactNode, side: "prefix" | "suffix") => {
    if (node == null) return null;
    if (isValidElement(node) && node.type === InputSelect) {
      return cloneElement(node as React.ReactElement<{ side?: "prefix" | "suffix" }>, { side });
    }
    return (
      <span className={cx(styles.adornment, styles[side], adornment === "addon" && styles.addon)}>
        {node}
      </span>
    );
  };

  return (
    <div
      className={cx(
        styles.group,
        SIZE_CLASS[inputSize],
        adornment === "addon" && styles.addonVariant,
        invalid && styles.invalid,
        disabled && styles.disabled,
        className,
      )}
    >
      {renderAdornment(prefix, "prefix")}
      <input
        ref={ref}
        type={type}
        className={cx(field.control, styles.bare)}
        {...fieldProps}
        {...rest}
      />
      {renderAdornment(suffix, "suffix")}
    </div>
  );
});
