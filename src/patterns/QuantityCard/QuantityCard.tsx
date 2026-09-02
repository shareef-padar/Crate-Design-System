import { type ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Card } from "../../components/Card";
import { Stepper } from "../../components/Stepper";
import styles from "./QuantityCard.module.css";

export interface QuantityCardProps {
  title: ReactNode;
  /** e.g. "~0.2 CBM each · think large moving box" */
  description?: ReactNode;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  className?: string;
}

/**
 * A bordered row for picking a quantity of one item — packing materials,
 * add-on services, anywhere Cargoz needs "how many of X". Card + Stepper
 * composed, not reinvented: stack a few in a Stack for a picker list (see
 * the Figma reference's "Medium Box" / "Large box" list).
 */
export function QuantityCard({
  title,
  description,
  value,
  onChange,
  min = 0,
  max,
  step,
  unit,
  className,
}: QuantityCardProps) {
  return (
    <Card padding={5} className={cx(styles.card, className)}>
      <div className={styles.text}>
        <span className={styles.title}>{title}</span>
        {description && <span className={styles.description}>{description}</span>}
      </div>
      <Stepper
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        unit={unit}
        label={typeof title === "string" ? title : undefined}
      />
    </Card>
  );
}
