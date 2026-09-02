import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cx } from "../../utils/cx";
import { StatusIcon, type StatusIconTone } from "../StatusIcon";
import styles from "./Menu.module.css";

export type MenuAlign = "start" | "end";

export interface MenuProps {
  /** A single focusable trigger element (usually a Button/IconButton). Gets
   *  onClick + aria-haspopup + aria-expanded merged in automatically. */
  trigger: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;
  children: ReactNode;
  /** Which edge of the trigger the panel's edge aligns to. Default "start". */
  align?: MenuAlign;
  className?: string;
}

/**
 * A button that opens a floating action list — closes on an outside click,
 * Escape, or picking an item. Not portaled (matches Tooltip's precedent in
 * Crate): it clips inside an `overflow: hidden` ancestor, same tradeoff.
 */
export function Menu({ trigger, children, align = "start", className }: MenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const triggerEl = isValidElement(trigger)
    ? cloneElement(trigger, {
        onClick: (e: MouseEvent<HTMLButtonElement>) => {
          trigger.props.onClick?.(e);
          setOpen((o) => !o);
        },
        "aria-haspopup": "menu",
        "aria-expanded": open,
      } as Partial<ButtonHTMLAttributes<HTMLButtonElement>>)
    : trigger;

  return (
    <div ref={rootRef} className={cx(styles.root, className)}>
      {triggerEl}
      {open && (
        <div
          role="menu"
          className={cx(styles.panel, align === "end" && styles.alignEnd)}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export interface MenuItemProps extends Omit<ComponentPropsWithoutRef<"button">, "title"> {
  icon: ReactNode;
  iconTone?: StatusIconTone;
  title: ReactNode;
  description?: ReactNode;
}

/** One row in a `Menu` — a tinted icon tile, a title, and an optional description. */
export function MenuItem({
  icon,
  iconTone = "accent",
  title,
  description,
  className,
  type = "button",
  ...rest
}: MenuItemProps) {
  return (
    <button role="menuitem" type={type} className={cx(styles.item, className)} {...rest}>
      <StatusIcon icon={icon} tone={iconTone} shape="square" size="sm" />
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        {description && <span className={styles.description}>{description}</span>}
      </span>
    </button>
  );
}

/** A hairline divider between groups of MenuItems. */
export function MenuDivider() {
  return <div role="separator" className={styles.divider} />;
}
