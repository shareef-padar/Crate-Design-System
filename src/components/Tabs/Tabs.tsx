import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cx } from "../../utils/cx";
import styles from "./Tabs.module.css";

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  base: string;
}
const TabsContext = createContext<TabsContextValue | null>(null);
const useTabs = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within <Tabs>");
  return ctx;
};

export interface TabsProps {
  /** Controlled active value. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
  className,
}: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const base = useId();
  const active = value ?? internal;
  const setValue = useCallback(
    (v: string) => {
      if (value === undefined) setInternal(v);
      onValueChange?.(v);
    },
    [value, onValueChange],
  );
  return (
    <TabsContext.Provider value={{ value: active, setValue, base }}>
      <div className={cx(styles.tabs, className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export interface TabListProps {
  /** Accessible name for the tab set. */
  label: string;
  children: ReactNode;
}

export function TabList({ label, children }: TabListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { setValue } = useTabs();

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    const tabs = Array.from(
      ref.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') ?? [],
    );
    const current = tabs.findIndex((t) => t === document.activeElement);
    let next = current;
    if (e.key === "ArrowRight") next = (current + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    const target = tabs[next];
    if (target) {
      e.preventDefault();
      target.focus();
      setValue(target.dataset.value ?? "");
    }
  };

  return (
    <div ref={ref} role="tablist" aria-label={label} className={styles.list} onKeyDown={onKeyDown}>
      {children}
    </div>
  );
}

export interface TabProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}

export function Tab({ value, children, disabled }: TabProps) {
  const { value: active, setValue, base } = useTabs();
  const selected = active === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${base}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${base}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      data-value={value}
      disabled={disabled}
      className={cx(styles.tab, selected && styles.tabSelected)}
      onClick={() => setValue(value)}
    >
      {children}
    </button>
  );
}

export interface TabPanelProps {
  value: string;
  children: ReactNode;
}

export function TabPanel({ value, children }: TabPanelProps) {
  const { value: active, base } = useTabs();
  if (active !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`${base}-panel-${value}`}
      aria-labelledby={`${base}-tab-${value}`}
      tabIndex={0}
      className={styles.panel}
    >
      {children}
    </div>
  );
}
