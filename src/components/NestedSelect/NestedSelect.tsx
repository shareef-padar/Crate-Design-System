import { useEffect, useId, useRef, useState } from "react";
import { CaretDown, CaretLeft, CaretRight, Check } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import { Checkbox } from "../Checkbox";
import { useFieldControl } from "../FormField/FieldContext";
import field from "../_shared/field.module.css";
import styles from "./NestedSelect.module.css";

export interface NestedSelectOption {
  value: string;
  label: string;
  children?: NestedSelectOption[];
}

function collectLeafValues(option: NestedSelectOption): string[] {
  if (!option.children?.length) return [option.value];
  return option.children.flatMap(collectLeafValues);
}

function countSelected(leaves: string[], selected: Set<string>): number {
  return leaves.filter((v) => selected.has(v)).length;
}

export interface NestedSelectProps {
  options: NestedSelectOption[];
  /** Selected leaf (childless) values. */
  value: string[];
  onChange: (value: string[]) => void;
  /** Root reset option, e.g. "Any Location". Selecting it clears `value`. */
  allLabel: string;
  /** Accessible label for the control. */
  label?: string;
  /** Override the trigger's summary text. Defaults to a generic "n selected". */
  summarize?: (selected: string[]) => string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

/**
 * Hierarchical multi-select: pick individual leaves or whole groups, drilling
 * into a group in-place to choose from its children. Parent checkboxes show
 * an indeterminate state when only some descendants are selected.
 *
 * Scope note: baseline keyboard support (Tab/Space/Enter/Escape) via native
 * checkboxes and buttons, not a full ARIA tree/menu pattern — that's a much
 * larger undertaking than this component's other parts and was left out
 * deliberately rather than half-implemented.
 */
export function NestedSelect({
  options,
  value,
  onChange,
  allLabel,
  label,
  summarize,
  disabled,
  id,
  className,
}: NestedSelectProps) {
  const fieldProps = useFieldControl({ disabled, id });
  const base = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState<NestedSelectOption[]>([]);

  const selected = new Set(value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) setPath([]);
  }, [open]);

  const toggleLeaf = (val: string) => {
    const next = new Set(selected);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    onChange([...next]);
  };

  const toggleGroup = (option: NestedSelectOption) => {
    const leaves = collectLeafValues(option);
    const allIn = leaves.every((v) => selected.has(v));
    const next = new Set(selected);
    leaves.forEach((v) => (allIn ? next.delete(v) : next.add(v)));
    onChange([...next]);
  };

  const setLevelSelection = (items: NestedSelectOption[], select: boolean) => {
    const leaves = items.flatMap(collectLeafValues);
    const next = new Set(selected);
    leaves.forEach((v) => (select ? next.add(v) : next.delete(v)));
    onChange([...next]);
  };

  const defaultSummarize = (selectedValues: string[]) => {
    if (selectedValues.length === 0) return allLabel;
    const match = options.find((opt) => {
      const leaves = collectLeafValues(opt);
      return leaves.length === selectedValues.length && leaves.every((v) => selected.has(v));
    });
    return match ? match.label : `${selectedValues.length} selected`;
  };

  const triggerText = (summarize ?? defaultSummarize)(value);
  const currentNode = path[path.length - 1];
  const currentItems = currentNode ? currentNode.children ?? [] : options;

  return (
    <div className={cx(styles.wrap, className)} ref={wrapRef}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-describedby={fieldProps["aria-describedby"]}
        aria-label={label}
        id={fieldProps.id}
        disabled={fieldProps.disabled}
        className={cx(field.control, field.md, styles.trigger)}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.triggerText}>{triggerText}</span>
        <CaretDown className={styles.triggerCaret} aria-hidden />
      </button>

      {open && (
        <div className={styles.panel} role="group" aria-label={label}>
          {currentNode && (
            <div className={styles.header}>
              <button
                type="button"
                className={styles.backButton}
                onClick={() => setPath((p) => p.slice(0, -1))}
              >
                <CaretLeft className={styles.backCaret} aria-hidden />
                <span className={styles.headerLabel}>{currentNode.label}</span>
                {(() => {
                  const count = countSelected(collectLeafValues(currentNode), selected);
                  return count > 0 && <span className={styles.count}>{count}</span>;
                })()}
              </button>
              <button
                type="button"
                className={styles.headerAction}
                onClick={() =>
                  setLevelSelection(
                    currentItems,
                    countSelected(currentItems.flatMap(collectLeafValues), selected) === 0,
                  )
                }
              >
                {countSelected(currentItems.flatMap(collectLeafValues), selected) > 0
                  ? "Clear all"
                  : "Select all"}
              </button>
            </div>
          )}

          {!currentNode && (
            <button type="button" className={styles.resetRow} onClick={() => onChange([])}>
              <span className={styles.rowLabel}>{allLabel}</span>
              {selected.size === 0 && <Check className={styles.resetCheck} aria-hidden />}
            </button>
          )}

          {currentItems.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            if (!hasChildren) {
              return (
                <Checkbox
                  key={item.value}
                  id={`${base}-${item.value}`}
                  className={styles.leafRow}
                  label={item.label}
                  checked={selected.has(item.value)}
                  onChange={() => toggleLeaf(item.value)}
                />
              );
            }
            const leaves = collectLeafValues(item);
            const count = countSelected(leaves, selected);
            const allIn = count === leaves.length;
            const someIn = count > 0 && !allIn;
            return (
              <div key={item.value} className={styles.groupRow}>
                <Checkbox
                  aria-label={item.label}
                  checked={allIn}
                  indeterminate={someIn}
                  onChange={() => toggleGroup(item)}
                />
                <button
                  type="button"
                  className={styles.drillButton}
                  onClick={() => setPath((p) => [...p, item])}
                >
                  <span className={styles.rowLabel}>{item.label}</span>
                  {count > 0 && <span className={styles.count}>{count}</span>}
                  <CaretRight className={styles.rowCaret} aria-hidden />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
