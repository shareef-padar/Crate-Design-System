import { cloneElement, useId, type ReactElement, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Tooltip.module.css";

export type TooltipPlacement = "top" | "bottom";

export interface TooltipProps {
  /** The tooltip text. */
  content: ReactNode;
  placement?: TooltipPlacement;
  /** A single focusable element (button, link, etc.). */
  children: ReactElement<{ "aria-describedby"?: string }>;
  className?: string;
}

/**
 * Shows a label on hover/focus of its child. The child gets `aria-describedby`, so the
 * tooltip is announced to screen readers as well as shown visually.
 */
export function Tooltip({
  content,
  placement = "top",
  children,
  className,
}: TooltipProps) {
  const id = useId();
  const child = cloneElement(children, { "aria-describedby": id });
  return (
    <span className={cx(styles.wrap, className)}>
      {child}
      <span
        id={id}
        role="tooltip"
        className={cx(styles.bubble, placement === "bottom" ? styles.bottom : styles.top)}
      >
        {content}
      </span>
    </span>
  );
}
