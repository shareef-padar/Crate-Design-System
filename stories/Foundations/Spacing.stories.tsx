import type { Meta, StoryObj } from "@storybook/react";
import { Section } from "./_helpers";

const meta: Meta = {
  title: "Foundations/Spacing",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

const SPACE = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20];
const RADIUS = ["sm", "md", "lg", "xl", "full"];
const mono: React.CSSProperties = {
  fontFamily: "ui-monospace, Menlo, monospace",
  fontSize: "0.75rem",
  color: "var(--crate-color-text-muted)",
};

export const Scales: Story = {
  render: () => (
    <div style={{ maxInlineSize: "48rem" }}>
      <Section title="Spacing — 4px base">
        <div style={{ display: "grid", gap: "0.5rem" }}>
          {SPACE.map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ ...mono, inlineSize: "4rem" }}>space-{s}</span>
              <div
                style={{
                  blockSize: "1rem",
                  inlineSize: `var(--crate-space-${s})`,
                  background: "var(--crate-color-action)",
                  borderRadius: "var(--crate-radius-sm)",
                }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Corner radius">
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {RADIUS.map((r) => (
            <div key={r} style={{ textAlign: "center" }}>
              <div
                style={{
                  inlineSize: "5rem",
                  blockSize: "5rem",
                  background: "var(--crate-color-action-subtle)",
                  border: "2px solid var(--crate-color-action)",
                  borderRadius: `var(--crate-radius-${r})`,
                }}
              />
              <div style={{ ...mono, marginBlockStart: "0.5rem" }}>radius-{r}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Elevation">
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {["sm", "md", "lg", "xl"].map((e) => (
            <div key={e} style={{ textAlign: "center" }}>
              <div
                style={{
                  inlineSize: "6rem",
                  blockSize: "4rem",
                  background: "var(--crate-color-surface)",
                  borderRadius: "var(--crate-radius-md)",
                  boxShadow: `var(--crate-shadow-${e})`,
                }}
              />
              <div style={{ ...mono, marginBlockStart: "0.75rem" }}>shadow-{e}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};
