import { type ReactNode } from "react";
import { Check, Minus, X } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import { Badge, type BadgeTone } from "../../components/Badge";
import styles from "./ComparisonCard.module.css";

export type ComparisonRowState = "yes" | "no" | "partial";

export interface ComparisonRow {
  label: string;
  /** Text value, e.g. "AED 10/CBM". Omit and use `state` for a boolean row. */
  value?: ReactNode;
  /** Boolean feature row — renders a check/cross/dash icon instead of `value`. */
  state?: ComparisonRowState;
  /** Dim the row, e.g. "N/A" — not offered by this plan. */
  muted?: boolean;
}

export interface ComparisonSection {
  label: string;
  badge?: { label: string; tone?: BadgeTone };
  rows: ComparisonRow[];
}

export interface ComparisonCardProps {
  /** e.g. "WH-01" */
  title: ReactNode;
  sections: ComparisonSection[];
  className?: string;
}

const STATE_ICON: Record<ComparisonRowState, ReactNode> = {
  yes: <Check weight="bold" className={styles.stateYes} />,
  no: <X weight="bold" className={styles.stateNo} />,
  partial: <Minus weight="bold" className={styles.statePartial} />,
};

const STATE_LABEL: Record<ComparisonRowState, string> = {
  yes: "Included",
  no: "Not included",
  partial: "Partially included",
};

/**
 * Side-by-side warehouse/plan comparison card — labeled sections of
 * zebra-striped rows, each row either a text value or a yes/no/partial
 * icon. Place a few of these in a row (e.g. an `Inline`) to compare plans.
 */
export function ComparisonCard({ title, sections, className }: ComparisonCardProps) {
  return (
    <div className={cx(styles.card, className)}>
      <div className={styles.header}>{title}</div>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>{section.label}</span>
            {section.badge && (
              <Badge tone={section.badge.tone ?? "neutral"} size="sm">
                {section.badge.label}
              </Badge>
            )}
          </div>
          {section.rows.map((row, rowIndex) => (
            <div
              key={row.label}
              className={cx(
                styles.row,
                rowIndex % 2 === 1 && styles.rowAlt,
                row.muted && styles.rowMuted,
              )}
            >
              <span className={styles.rowLabel}>{row.label}</span>
              {row.state ? (
                <span className={styles.rowIcon} role="img" aria-label={STATE_LABEL[row.state]}>
                  {STATE_ICON[row.state]}
                </span>
              ) : (
                <span className={styles.rowValue}>{row.value}</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
