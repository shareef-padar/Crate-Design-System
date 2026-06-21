import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { CalendarBlank, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import { useFieldControl } from "../FormField/FieldContext";
import { IconButton } from "../IconButton";
import styles from "./DatePicker.module.css";

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  min?: Date;
  max?: Date;
  placeholder?: string;
  /** BCP-47 locale for month/day formatting. Default "en-AE". */
  locale?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Calendar date picker. FormField-compatible; opens a month grid below the trigger. */
export function DatePicker({
  value,
  defaultValue = null,
  onChange,
  min,
  max,
  placeholder = "Select a date",
  locale = "en-AE",
  disabled,
  id,
  className,
}: DatePickerProps) {
  const field = useFieldControl({ disabled, id });
  const labelId = useId();
  const [internal, setInternal] = useState<Date | null>(defaultValue);
  const selected = value !== undefined ? value : internal;
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<Date>(() =>
    startOfDay(selected ?? new Date()),
  );
  const wrapRef = useRef<HTMLDivElement>(null);
  const today = startOfDay(new Date());

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const select = (day: Date) => {
    if (value === undefined) setInternal(day);
    onChange?.(day);
    setOpen(false);
  };

  const onTriggerKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  };

  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(view);

  // Weekday short names, starting Sunday (2023-01-01 was a Sunday).
  const weekdayFmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    weekdayFmt.format(new Date(2023, 0, 1 + i)),
  );

  const year = view.getFullYear();
  const month = view.getMonth();
  const startOffset = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const outOfRange = (d: Date) =>
    (min && d < startOfDay(min)) || (max && d > startOfDay(max));

  const triggerText = selected
    ? new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(selected)
    : placeholder;

  return (
    <div className={cx(styles.wrap, className)} ref={wrapRef}>
      <button
        type="button"
        id={field.id}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={field["aria-invalid"]}
        aria-describedby={field["aria-describedby"]}
        disabled={field.disabled}
        className={cx(styles.trigger, !selected && styles.placeholder)}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKey}
      >
        <span>{triggerText}</span>
        <CalendarBlank className={styles.triggerIcon} aria-hidden />
      </button>

      {open && (
        <div className={styles.popover} role="dialog" aria-label="Choose date">
          <div className={styles.header}>
            <IconButton
              size="sm"
              variant="ghost"
              label="Previous month"
              icon={<CaretLeft />}
              onClick={() => setView(new Date(year, month - 1, 1))}
            />
            <span className={styles.monthLabel} id={labelId}>
              {monthLabel}
            </span>
            <IconButton
              size="sm"
              variant="ghost"
              label="Next month"
              icon={<CaretRight />}
              onClick={() => setView(new Date(year, month + 1, 1))}
            />
          </div>

          <div className={styles.grid} role="grid" aria-labelledby={labelId}>
            {weekdays.map((w) => (
              <span key={w} className={styles.weekday} role="columnheader">
                {w}
              </span>
            ))}
            {cells.map((d, i) =>
              d ? (
                <button
                  key={i}
                  type="button"
                  className={cx(
                    styles.day,
                    selected && isSameDay(d, selected) && styles.selected,
                    isSameDay(d, today) && styles.today,
                  )}
                  aria-pressed={selected ? isSameDay(d, selected) : undefined}
                  disabled={outOfRange(d) || undefined}
                  onClick={() => select(d)}
                >
                  {d.getDate()}
                </button>
              ) : (
                <span key={i} />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
