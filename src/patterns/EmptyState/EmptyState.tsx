import { type ReactNode } from "react";
import { Package } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { StatusIcon, type StatusIconTone } from "../../components/StatusIcon";
import styles from "./EmptyState.module.css";

export interface EmptyStateProps {
  title: ReactNode;
  description?: ReactNode;
  /** Optional icon/illustration. */
  icon?: ReactNode;
  /**
   * Tint for the icon circle. Default "accent" (teal) — switch to
   * "danger"/"warning" for a failed-state empty state, e.g. "No results
   * because the search failed" vs. a neutral "No results yet".
   */
  tone?: StatusIconTone;
  /** Optional action (e.g. a Button). */
  action?: ReactNode;
  className?: string;
}

const DefaultIcon = <Package weight="duotone" />;

/** Friendly empty / no-results state with an optional action. */
export function EmptyState({
  title,
  description,
  icon,
  tone = "accent",
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cx(styles.empty, className)}>
      <StatusIcon icon={icon ?? DefaultIcon} tone={tone} size="md" className={styles.icon} />
      <Heading level={3} size="h4">
        {title}
      </Heading>
      {description && (
        <Text color="secondary" className={styles.description}>
          {description}
        </Text>
      )}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
