import { useEffect, useId, useRef, type ReactNode, type MouseEvent } from "react";
import { X } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import { Heading } from "../Heading";
import { IconButton } from "../IconButton";
import styles from "./Modal.module.css";

export type ModalSize = "sm" | "md" | "lg";

const SIZE_CLASS: Record<ModalSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children?: ReactNode;
  /** Optional footer area (e.g. action buttons). */
  footer?: ReactNode;
  size?: ModalSize;
  className?: string;
}

/** Accessible dialog on the native <dialog> element: focus trap, Esc, and backdrop come free. */
export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  className,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  // Click on the backdrop (the dialog element itself, not the panel) closes.
  const onClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === ref.current) onClose();
  };

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      onClose={onClose}
      onCancel={onClose}
      onClick={onClick}
      aria-labelledby={title ? titleId : undefined}
    >
      <div className={cx(styles.panel, SIZE_CLASS[size], className)}>
        <div className={styles.header}>
          {title && (
            <Heading level={2} size="h4" id={titleId}>
              {title}
            </Heading>
          )}
          <IconButton
            variant="ghost"
            size="sm"
            label="Close"
            onClick={onClose}
            className={styles.close}
            icon={<X />}
          />
        </div>
        {children && <div className={styles.body}>{children}</div>}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </dialog>
  );
}
