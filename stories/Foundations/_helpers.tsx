import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTheme } from "../../src/theme";

/* ---------- color math (WCAG) ---------- */

function parseRgb(value: string): [number, number, number] {
  const m = value.match(/rgba?\(([^)]+)\)/);
  if (!m) return [0, 0, 0];
  const [r, g, b] = m[1].split(",").map((n) => parseFloat(n));
  return [r, g, b];
}

function toHex([r, g, b]: [number, number, number]): string {
  const h = (n: number) => Math.round(n).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase();
}

function luminance([r, g, b]: [number, number, number]): number {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function contrastRatio(a: string, b: string): number {
  const la = luminance(parseRgb(a));
  const lb = luminance(parseRgb(b));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** Resolve a `--crate-*` variable to its computed rgb string for the current theme. */
function useResolved(varName: string): string {
  const ref = useRef<HTMLSpanElement>(null);
  const [color, setColor] = useState("rgb(0, 0, 0)");
  const { theme, dir } = useTheme();
  useEffect(() => {
    if (ref.current) setColor(getComputedStyle(ref.current).backgroundColor);
  }, [varName, theme, dir]);
  return color;
}

/* ---------- display components ---------- */

const mono: React.CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: "0.75rem",
};

export function Swatch({ token, label }: { token: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hex, setHex] = useState("");
  const { theme, dir } = useTheme();
  useEffect(() => {
    if (ref.current) setHex(toHex(parseRgb(getComputedStyle(ref.current).backgroundColor)));
  }, [token, theme, dir]);
  return (
    <div style={{ minInlineSize: "5.5rem" }}>
      <div
        ref={ref}
        style={{
          background: `var(--crate-${token})`,
          blockSize: "3.5rem",
          borderRadius: "var(--crate-radius-md)",
          border: "1px solid var(--crate-color-border)",
        }}
      />
      <div style={{ marginBlockStart: "0.375rem", ...mono }}>
        {label ?? token}
      </div>
      <div style={{ ...mono, color: "var(--crate-color-text-muted)" }}>{hex}</div>
    </div>
  );
}

export function Ramp({ name, steps }: { name: string; steps: (number | string)[] }) {
  return (
    <div style={{ marginBlockEnd: "1.5rem" }}>
      <div
        style={{
          marginBlockEnd: "0.5rem",
          fontWeight: 600,
          fontFamily: "var(--crate-font-family-heading)",
          textTransform: "capitalize",
        }}
      >
        {name.replace("-", " ")}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {steps.map((s) => (
          <Swatch key={s} token={`${name}-${s}`} label={String(s)} />
        ))}
      </div>
    </div>
  );
}

export function Pair({
  label,
  fg,
  bg,
}: {
  label: string;
  fg: string;
  bg: string;
}) {
  const fgColor = useResolved(fg);
  const bgColor = useResolved(bg);
  const ratio = contrastRatio(fgColor, bgColor);
  const grade =
    ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA Large" : "Fail";
  const ok = ratio >= 4.5;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "0.75rem 1rem",
        background: `var(--crate-${bg})`,
        color: `var(--crate-${fg})`,
        border: "1px solid var(--crate-color-border)",
        borderRadius: "var(--crate-radius-md)",
      }}
    >
      <span style={{ fontWeight: 600 }}>{label}</span>
      <span style={{ ...mono, display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <span>{ratio.toFixed(2)}</span>
        <span
          style={{
            padding: "0.125rem 0.5rem",
            borderRadius: "var(--crate-radius-full)",
            background: ok ? "var(--crate-color-success)" : "var(--crate-color-danger)",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          {grade}
        </span>
      </span>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBlockEnd: "2.5rem" }}>
      <h2
        style={{
          fontFamily: "var(--crate-font-family-heading)",
          fontSize: "var(--crate-font-size-h3)",
          marginBlockEnd: "1rem",
          color: "var(--crate-color-text-primary)",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
