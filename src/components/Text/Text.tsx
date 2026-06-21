import { type ElementType, type ComponentPropsWithoutRef } from "react";
import { cx } from "../../utils/cx";
import styles from "./Text.module.css";

export type TextSize = "body-lg" | "body" | "body-sm" | "caption";
// Lato ships only Light/Regular/Bold — no real 500/600, so we don't offer a fake
// "medium". For medium-weight UI labels use the Manrope-based Heading/Label components.
export type TextWeight = "light" | "regular" | "bold";
export type TextColor = "primary" | "secondary" | "muted" | "inherit";

const SIZE_CLASS: Record<TextSize, string> = {
  "body-lg": styles.bodyLg,
  body: styles.body,
  "body-sm": styles.bodySm,
  caption: styles.caption,
};
const WEIGHT_CLASS: Record<TextWeight, string> = {
  light: styles.light,
  regular: styles.regular,
  bold: styles.bold,
};
const COLOR_CLASS: Record<Exclude<TextColor, "inherit">, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  muted: styles.muted,
};

export interface TextProps extends ComponentPropsWithoutRef<"p"> {
  /** Type scale step. `caption`/`body-sm` are for meta/labels — never body copy. */
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  /** Element to render. Default: "p". */
  as?: ElementType;
}

/** Body text in Lato. Sizes come from the type scale; body is the 16px floor. */
export function Text({
  size = "body",
  weight = "regular",
  color = "primary",
  as,
  className,
  ...rest
}: TextProps) {
  const Component = as ?? "p";
  return (
    <Component
      className={cx(
        styles.text,
        SIZE_CLASS[size],
        WEIGHT_CLASS[weight],
        color !== "inherit" && COLOR_CLASS[color],
        className,
      )}
      {...rest}
    />
  );
}
