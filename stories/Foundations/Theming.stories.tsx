import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Inline, Heading, Text } from "../../src";

const meta: Meta = {
  title: "Foundations/Theming",
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

/** A token-driven preview card. Nothing here is hard-coded — flip the Theme toolbar. */
function PreviewCard() {
  return (
    <Box
      background="surface"
      radius="lg"
      border
      padding={6}
      style={{ inlineSize: "22rem", boxShadow: "var(--crate-shadow-sm)" }}
    >
      <Stack gap={4}>
        <Inline justify="between" align="start">
          <Heading level={3} size="h4">
            Al Quoz Warehouse
          </Heading>
          <span
            style={{
              fontSize: "var(--crate-font-size-caption)",
              fontWeight: 700,
              color: "var(--crate-color-success-text)",
              background: "var(--crate-color-success-subtle)",
              padding: "0.125rem 0.5rem",
              borderRadius: "var(--crate-radius-full)",
            }}
          >
            Verified
          </span>
        </Inline>
        <Text color="secondary">
          Dry storage · 2,500 sqft · Available now in Dubai.
        </Text>
        <Inline gap={2} align="baseline">
          <Heading level={4} size="h3">
            AED 18
          </Heading>
          <Text color="muted" size="body-sm">
            / sqft / month
          </Text>
        </Inline>
        <button
          style={{
            background: "var(--crate-color-action)",
            color: "var(--crate-color-text-on-action)",
            border: "none",
            borderRadius: "var(--crate-radius-md)",
            padding: "0.75rem 1rem",
            font: "inherit",
            fontWeight: 700,
            cursor: "pointer",
            minBlockSize: "var(--crate-size-touch-min)",
          }}
        >
          Contact warehouse
        </button>
      </Stack>
    </Box>
  );
}

export const LightAndDark: Story = {
  name: "Light & Dark",
  render: () => (
    <Stack gap={4} align="center">
      <Text size="body-sm" color="muted">
        Use the <strong>Theme</strong> control in the toolbar to switch Light / Dark.
        Every value below comes from semantic tokens.
      </Text>
      <PreviewCard />
    </Stack>
  ),
};
