import { createContext, useContext, type HTMLAttributes } from "react";

export interface FieldContextValue {
  id: string;
  describedBy?: string;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
}

export const FieldContext = createContext<FieldContextValue | null>(null);

/**
 * Read the surrounding FormField, returning props to spread on the actual control
 * (input/select/textarea). Wires id, aria-describedby, aria-invalid, required, disabled
 * automatically — so individual controls don't re-implement accessibility plumbing.
 * Returns null-ish (empty) props when used outside a FormField.
 */
export function useFieldControl(
  own: { disabled?: boolean; required?: boolean; id?: string } = {},
): HTMLAttributes<HTMLElement> & {
  id?: string;
  required?: boolean;
  disabled?: boolean;
} {
  const ctx = useContext(FieldContext);
  if (!ctx) {
    return {
      id: own.id,
      required: own.required,
      disabled: own.disabled,
    };
  }
  return {
    id: own.id ?? ctx.id,
    "aria-describedby": ctx.describedBy,
    "aria-invalid": ctx.invalid || undefined,
    required: own.required ?? ctx.required,
    disabled: own.disabled ?? ctx.disabled,
  };
}
