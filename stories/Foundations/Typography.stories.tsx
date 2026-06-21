import type { Meta, StoryObj } from "@storybook/react";
import { Heading, Text } from "../../src";
import { Section } from "./_helpers";

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

const mono: React.CSSProperties = {
  fontFamily: "ui-monospace, Menlo, monospace",
  fontSize: "0.75rem",
  color: "var(--crate-color-text-muted)",
  inlineSize: "9rem",
  flexShrink: 0,
};

function Row({ note, children }: { note: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        alignItems: "baseline",
        padding: "0.75rem 0",
        borderBlockEnd: "1px solid var(--crate-color-border)",
      }}
    >
      <span style={mono}>{note}</span>
      <div>{children}</div>
    </div>
  );
}

export const Scale: Story = {
  render: () => (
    <div style={{ maxInlineSize: "52rem" }}>
      <Section title="Headings — Manrope">
        <Row note="display">
          <Heading level={1} size="display">
            Find warehouse in Dubai
          </Heading>
        </Row>
        <Row note="h1 / 32px">
          <Heading level={1}>Find warehouse in Dubai</Heading>
        </Row>
        <Row note="h2 / 24px">
          <Heading level={2}>Find warehouse in Dubai</Heading>
        </Row>
        <Row note="h3 / 20px">
          <Heading level={3}>Find warehouse in Dubai</Heading>
        </Row>
        <Row note="h4 / 18px">
          <Heading level={4}>Find warehouse in Dubai</Heading>
        </Row>
        <Row note="h5 / 16px">
          <Heading level={5}>Find warehouse in Dubai</Heading>
        </Row>
        <Row note="h6 / 14px">
          <Heading level={6}>Find warehouse in Dubai</Heading>
        </Row>
      </Section>

      <Section title="Body — Lato">
        <Row note="body-lg / 18px">
          <Text size="body-lg">
            Flexible storage with no yearly lock-ins. Move in within 48 hours.
          </Text>
        </Row>
        <Row note="body / 16px ✓ floor">
          <Text size="body">
            Flexible storage with no yearly lock-ins. Move in within 48 hours.
          </Text>
        </Row>
        <Row note="body-sm / 14px">
          <Text size="body-sm" color="secondary">
            Meta and helper text only — never paragraphs.
          </Text>
        </Row>
        <Row note="caption / 12px">
          <Text size="caption" color="muted">
            Labels and legal text only.
          </Text>
        </Row>
      </Section>

      <Section title="Weights">
        <Text color="secondary" style={{ marginBlockEnd: "0.75rem" }}>
          Body (Lato) ships Light, Regular, and Bold — there is no real medium/semibold, so
          Crate doesn&rsquo;t offer one for body text.
        </Text>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Text weight="light">Lato Light 300</Text>
          <Text weight="regular">Lato Regular 400</Text>
          <Text weight="bold">Lato Bold 700</Text>
        </div>
        <Text color="secondary" style={{ margin: "1.25rem 0 0.75rem" }}>
          Headings (Manrope) have the full range — Medium and Semibold are used for smaller
          headings and, in Phase 2, for buttons and labels.
        </Text>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Heading level={4} size="h4" style={{ fontWeight: "var(--crate-font-weight-medium)" }}>
            Manrope Medium 500
          </Heading>
          <Heading level={4} size="h4" style={{ fontWeight: "var(--crate-font-weight-semibold)" }}>
            Manrope Semibold 600
          </Heading>
          <Heading level={4} size="h4">
            Manrope Bold 700
          </Heading>
        </div>
      </Section>
    </div>
  ),
};
