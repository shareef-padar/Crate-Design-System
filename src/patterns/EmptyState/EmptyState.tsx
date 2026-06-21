import { type ReactNode } from "react";
import { Package } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import styles from "./EmptyState.module.css";

export interface EmptyStateProps {
  title: ReactNode;
  description?: ReactNode;
  /** Optional icon/illustration. */
  icon?: ReactNode;
  /** Optional action (e.g. a Button). */
  action?: ReactNode;
  className?: string;
}

const DefaultIcon = <Package weight="duotone" aria-hidden />;

/** Friendly empty / no-results state with an optional action. */
export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={cx(styles.empty, className)}>
      <div className={styles.icon} aria-hidden>
        {icon ?? DefaultIcon}
      </div>
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
