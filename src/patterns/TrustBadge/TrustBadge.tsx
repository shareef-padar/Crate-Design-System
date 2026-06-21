import { type ComponentType, type ReactNode } from "react";
import { SealCheck, ShieldCheck, Star, type IconProps } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import styles from "./TrustBadge.module.css";

export type TrustType = "verified" | "insured" | "topRated";

const ICON: Record<TrustType, ComponentType<IconProps>> = {
  verified: SealCheck,
  insured: ShieldCheck,
  topRated: Star,
};

const DEFAULT_LABEL: Record<TrustType, string> = {
  verified: "Verified",
  insured: "Insured",
  topRated: "Top rated",
};

const TONE_CLASS: Record<TrustType, string> = {
  verified: styles.verified,
  insured: styles.insured,
  topRated: styles.topRated,
};

export interface TrustBadgeProps {
  type: TrustType;
  /** Override the default label text. */
  label?: ReactNode;
  className?: string;
}

/** Structural trust signal — verified / insured / top-rated. Trust is core for Cargoz. */
export function TrustBadge({ type, label, className }: TrustBadgeProps) {
  const Glyph = ICON[type];
  return (
    <span className={cx(styles.badge, TONE_CLASS[type], className)}>
      <Glyph className={styles.icon} weight="fill" aria-hidden />
      {label ?? DEFAULT_LABEL[type]}
    </span>
  );
}
