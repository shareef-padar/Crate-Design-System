import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties } from "react";
import { cx, spaceVar, type Space } from "../../utils/cx";
import styles from "./Card.module.css";

export type CardElevation = "none" | "sm" | "md";

const ELEVATION_CLASS: Record<CardElevation, string> = {
  none: styles.elevNone,
  sm: styles.elevSm,
  md: styles.elevMd,
};

export interface CardProps extends ComponentPropsWithoutRef<"div"> {
  /** Inner padding. Defaults to the density-aware card padding token. */
  padding?: Space | "default";
  /** Shadow depth. Border-led by default ("none"); raise only for floating cards. */
  elevation?: CardElevation;
  /** Adds hover/focus affordance for clickable cards. */
  interactive?: boolean;
}

/** Surface container. Separates with a 1px border by default — shadows are opt-in. */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { padding = "default", elevation = "none", interactive = false, className, style, ...rest },
  ref,
) {
  const vars: CSSProperties = {
    padding: padding === "default" ? "var(--crate-card-padding)" : spaceVar(padding),
    ...style,
  };
  return (
    <div
      ref={ref}
      className={cx(
        styles.card,
        ELEVATION_CLASS[elevation],
        interactive && styles.interactive,
        className,
      )}
      style={vars}
      {...(interactive ? { tabIndex: 0 } : {})}
      {...rest}
    />
  );
});
