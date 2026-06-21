import type { Meta, StoryObj } from "@storybook/react";
import { Box, Grid, Stack, Inline, Heading, Text } from "../../src";
import { breakpoints } from "../../src";
import { Section } from "./_helpers";
import styles from "./_responsive.module.css";

const meta: Meta = {
  title: "Foundations/Responsive",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

const mono: React.CSSProperties = {
  fontFamily: "ui-monospace, Menlo, monospace",
  fontSize: "0.8125rem",
};

function DemoTile({ label }: { label: string }) {
  return (
    <Box
      background="surface"
      border
      radius="md"
      padding={4}
      style={{ minBlockSize: "4.5rem", display: "grid", placeItems: "center" }}
    >
      <Text weight="bold">{label}</Text>
    </Box>
  );
}

export const Overview: Story = {
  render: () => (
    <div style={{ maxInlineSize: "60rem" }}>
      <Section title="Breakpoints">
        <Text color="secondary" style={{ marginBlockEnd: "1rem" }}>
          Phones → warehouse tablets → office desktops. Drag the Storybook viewport, or use
          the device presets, to watch layouts respond.
        </Text>
        <Box background="surface" border radius="md" padding={4}>
          <Stack gap={2}>
            {Object.entries(breakpoints).map(([name, px]) => (
              <Inline key={name} justify="between">
                <Text weight="bold" style={mono}>
                  {name}
                </Text>
                <Text color="muted" style={mono}>
                  ≥ {px}px
                </Text>
              </Inline>
            ))}
          </Stack>
        </Box>
      </Section>

      <Section title="Grid — auto-fit, container-adaptive">
        <Text color="secondary" style={{ marginBlockEnd: "1rem" }}>
          One <code>{`<Grid min="14rem">`}</code>. Columns wrap based on available width — no
          breakpoint code. Resize the viewport to see it reflow from 4 → 2 → 1 column.
        </Text>
        <Grid min="14rem" gap={4}>
          {["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Riyadh", "UAQ"].map((c) => (
            <DemoTile key={c} label={c} />
          ))}
        </Grid>
      </Section>

      <Section title="Container queries — a component adapts to ITS column">
        <Text color="secondary" style={{ marginBlockEnd: "1rem" }}>
          The same card is stacked in a narrow column and horizontal in a wide one — it
          responds to its <strong>container</strong>, not the screen. This is what lets one
          component live on a marketing page and in a dashboard sidebar.
        </Text>
        <Grid min="20rem" gap={6} style={{ alignItems: "start" }}>
          <div className={styles.cqWrap}>
            <Text size="body-sm" color="muted" style={{ marginBlockEnd: "0.5rem" }}>
              Narrow container → stacked
            </Text>
            <div className={styles.cqCard}>
              <div className={styles.cqThumb} />
              <Stack gap={1}>
                <Heading level={3} size="h5">
                  Al Quoz Warehouse
                </Heading>
                <Text size="body-sm" color="secondary">
                  Dry storage · 2,500 sqft
                </Text>
              </Stack>
            </div>
          </div>
          <div className={styles.cqWrap} style={{ gridColumn: "span 2" }}>
            <Text size="body-sm" color="muted" style={{ marginBlockEnd: "0.5rem" }}>
              Wide container → horizontal
            </Text>
            <div className={styles.cqCard}>
              <div className={styles.cqThumb} />
              <Stack gap={1}>
                <Heading level={3} size="h5">
                  Al Quoz Warehouse
                </Heading>
                <Text size="body-sm" color="secondary">
                  Dry storage · 2,500 sqft · Available now in Dubai
                </Text>
              </Stack>
            </div>
          </div>
        </Grid>
      </Section>

      <Section title="Density — switch in the toolbar">
        <Text color="secondary" style={{ marginBlockEnd: "1rem" }}>
          Toggle <strong>Density</strong> (toolbar) between Comfortable and Compact. The same
          components tighten for data-dense dashboards — one brand, many surfaces.
        </Text>
        <div className={styles.densityCard}>
          <Stack gap={4}>
            <Inline gap={3}>
              <span className={styles.control}>Where do you need storage?</span>
              <span className={styles.control}>What are you storing?</span>
            </Inline>
            <Text color="muted" size="body-sm">
              Control height, padding, and card spacing all read density-aware tokens.
            </Text>
          </Stack>
        </div>
      </Section>
    </div>
  ),
};
