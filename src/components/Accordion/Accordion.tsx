import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";
import { CaretDown, Plus, Minus } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import styles from "./Accordion.module.css";

export type AccordionIcon = "chevron" | "plus-minus";

interface AccordionContextValue {
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
  icon: AccordionIcon;
}
const AccordionContext = createContext<AccordionContextValue | null>(null);
const useAccordion = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used within <Accordion>");
  return ctx;
};

export interface AccordionProps {
  /** "single" allows one open at a time; "multiple" allows many. */
  type?: "single" | "multiple";
  /** Initially open item value(s). */
  defaultValue?: string | string[];
  /** The open/close indicator style for every item in this accordion. */
  icon?: AccordionIcon;
  children: ReactNode;
  className?: string;
}

export function Accordion({
  type = "single",
  defaultValue,
  icon = "chevron",
  children,
  className,
}: AccordionProps) {
  const [open, setOpen] = useState<string[]>(
    defaultValue == null ? [] : Array.isArray(defaultValue) ? defaultValue : [defaultValue],
  );
  const toggle = (value: string) =>
    setOpen((cur) =>
      cur.includes(value)
        ? cur.filter((v) => v !== value)
        : type === "single"
          ? [value]
          : [...cur, value],
    );
  return (
    <AccordionContext.Provider value={{ isOpen: (v) => open.includes(v), toggle, icon }}>
      <div className={cx(styles.accordion, className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  value: string;
  title: ReactNode;
  children: ReactNode;
}

export function AccordionItem({ value, title, children }: AccordionItemProps) {
  const { isOpen, toggle, icon } = useAccordion();
  const open = isOpen(value);
  const base = useId();
  return (
    <div className={styles.item}>
      <h3 className={styles.heading}>
        <button
          type="button"
          className={styles.trigger}
          id={`${base}-trigger`}
          aria-expanded={open}
          aria-controls={`${base}-panel`}
          onClick={() => toggle(value)}
        >
          <span>{title}</span>
          {icon === "plus-minus" ? (
            open ? (
              <Minus className={styles.plusMinus} weight="bold" aria-hidden />
            ) : (
              <Plus className={styles.plusMinus} weight="bold" aria-hidden />
            )
          ) : (
            <CaretDown className={cx(styles.caret, open && styles.caretOpen)} aria-hidden />
          )}
        </button>
      </h3>
      {open && (
        <div
          role="region"
          id={`${base}-panel`}
          aria-labelledby={`${base}-trigger`}
          className={styles.panel}
        >
          {children}
        </div>
      )}
    </div>
  );
}
