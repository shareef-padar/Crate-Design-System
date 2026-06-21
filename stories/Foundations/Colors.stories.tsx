import type { Meta, StoryObj } from "@storybook/react";
import { Ramp, Pair, Section } from "./_helpers";

const meta: Meta = {
  title: "Foundations/Colors",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const TEXT_STEPS = [25, ...STEPS];
const RAMPS = [
  "primary",
  "secondary",
  "red",
  "orange",
  "green",
  "blue",
  "soft-violet",
  "yellow",
  "mint",
  "sky-blue",
  "coral",
];

export const Palette: Story = {
  render: () => (
    <div style={{ maxInlineSize: "60rem" }}>
      <Section title="Primitive ramps">
        <p style={{ color: "var(--crate-color-text-secondary)", marginBlockEnd: "1.5rem" }}>
          The raw color scales. <strong>Primary</strong> is the teal/green family,{" "}
          <strong>secondary</strong> is purple. The <strong>600</strong> step is the base.
          Values shown are brand-accurate placeholders pending the exact Figma palette.
        </p>
        {RAMPS.map((r) => (
          <Ramp key={r} name={r} steps={STEPS} />
        ))}
        <Ramp name="text" steps={TEXT_STEPS} />
      </Section>

      <Section title="Semantic roles — contrast check">
        <p style={{ color: "var(--crate-color-text-secondary)", marginBlockEnd: "1rem" }}>
          Live WCAG contrast ratios for the theme selected in the toolbar. Toggle Light/Dark
          to verify both. Target: <strong>AA (4.5)</strong> for text, AAA (7) where possible.
        </p>
        <div style={{ display: "grid", gap: "0.5rem" }}>
          <Pair label="Text primary on background" fg="color-text-primary" bg="color-bg" />
          <Pair label="Text secondary on background" fg="color-text-secondary" bg="color-bg" />
          <Pair label="Text muted on background" fg="color-text-muted" bg="color-bg" />
          <Pair label="Text primary on surface" fg="color-text-primary" bg="color-surface" />
          <Pair label="On-action text on action" fg="color-text-on-action" bg="color-action" />
          <Pair label="Danger text on danger subtle" fg="color-danger-text" bg="color-danger-subtle" />
          <Pair label="Success text on success subtle" fg="color-success-text" bg="color-success-subtle" />
          <Pair label="Warning text on warning subtle" fg="color-warning-text" bg="color-warning-subtle" />
          <Pair label="Info text on info subtle" fg="color-info-text" bg="color-info-subtle" />
        </div>
      </Section>
    </div>
  ),
};
