import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import { IconButton } from "../IconButton";
import styles from "./Toast.module.css";

export type ToastTone = "info" | "success" | "warning" | "danger";

export interface ToastOptions {
  title?: ReactNode;
  message?: ReactNode;
  tone?: ToastTone;
  /** Auto-dismiss after this many ms. Pass 0 to keep until dismissed. Default 5000. */
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  /** Show a toast; returns its id. */
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

const TONE_CLASS: Record<ToastTone, string> = {
  info: styles.info,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
};

export interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = ++counter.current;
      const duration = options.duration ?? 5000;
      setToasts((list) => [...list, { ...options, id }]);
      if (duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), duration),
        );
      }
      return id;
    },
    [dismiss],
  );

  const timersAtMount = timers.current;
  useEffect(() => () => timersAtMount.forEach(clearTimeout), [timersAtMount]);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div className={styles.viewport} role="region" aria-label="Notifications">
            {toasts.map((t) => (
              <div
                key={t.id}
                className={cx(styles.toast, TONE_CLASS[t.tone ?? "info"])}
                role={t.tone === "danger" || t.tone === "warning" ? "alert" : "status"}
              >
                <div className={styles.body}>
                  {t.title && <p className={styles.title}>{t.title}</p>}
                  {t.message && <div className={styles.message}>{t.message}</div>}
                </div>
                <IconButton
                  variant="ghost"
                  size="sm"
                  label="Dismiss"
                  onClick={() => dismiss(t.id)}
                  icon={<X />}
                />
              </div>
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}
