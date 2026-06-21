import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { cx } from "../../utils/cx";
import { useFieldControl } from "../FormField/FieldContext";
import field from "../_shared/field.module.css";
import styles from "./Autocomplete.module.css";

export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

/** Combobox: type to filter, choose from a listbox. Full keyboard + ARIA support. */
export function Autocomplete({
  options,
  value,
  onChange,
  placeholder = "Search…",
  emptyText = "No matches",
  disabled,
  id,
  className,
}: AutocompleteProps) {
  const fieldProps = useFieldControl({ disabled, id });
  const base = useId();
  const wrapRef = useRef<HTMLDivElement>(null);

  const labelFor = (v?: string) => options.find((o) => o.value === v)?.label ?? "";
  const [query, setQuery] = useState(() => labelFor(value));
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (value !== undefined) setQuery(labelFor(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const choose = (opt: AutocompleteOption) => {
    setQuery(opt.label);
    onChange?.(opt.value);
    setOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && open && filtered[active]) {
      e.preventDefault();
      choose(filtered[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const listId = `${base}-listbox`;
  const optionId = (i: number) => `${base}-opt-${i}`;

  return (
    <div className={cx(styles.wrap, className)} ref={wrapRef}>
      <input
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && filtered.length ? optionId(active) : undefined}
        aria-describedby={fieldProps["aria-describedby"]}
        aria-invalid={fieldProps["aria-invalid"]}
        id={fieldProps.id}
        disabled={fieldProps.disabled}
        className={cx(field.control, field.md)}
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      {open && (
        <ul className={styles.listbox} role="listbox" id={listId}>
          {filtered.length === 0 ? (
            <li className={styles.empty}>{emptyText}</li>
          ) : (
            filtered.map((opt, i) => (
              <li
                key={opt.value}
                id={optionId(i)}
                role="option"
                aria-selected={i === active}
                className={cx(styles.option, i === active && styles.active)}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(opt);
                }}
              >
                {opt.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
