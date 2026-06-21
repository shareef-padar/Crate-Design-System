import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Inline, Heading, Text } from "../../src";

const meta: Meta = {
  title: "Foundations/RTL",
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

/**
 * Demonstrates logical-property layout. The same component flips automatically when the
 * Direction toolbar is set to RTL — icon, padding, and order all mirror with no extra code.
 */
export const DirectionAware: Story = {
  name: "Direction-aware layout",
  render: () => (
    <Stack gap={4} align="stretch" style={{ inlineSize: "24rem" }}>
      <Text size="body-sm" color="muted">
        Switch the <strong>Direction</strong> control in the toolbar to RTL (Arabic). The
        leading marker, spacing, and alignment mirror automatically.
      </Text>

      <Box background="surface" border radius="md" padding={4}>
        <Inline gap={3} align="center">
          <span
            style={{
              inlineSize: "2.5rem",
              blockSize: "2.5rem",
              flexShrink: 0,
              display: "grid",
              placeItems: "center",
              borderRadius: "var(--crate-radius-full)",
              background: "var(--crate-color-action-subtle)",
              color: "var(--crate-color-action)",
              fontWeight: 700,
            }}
          >
            ع
          </span>
          <Stack gap={1}>
            <Heading level={4} size="h5">
              مستودع القوز
            </Heading>
            <Text color="secondary" size="body-sm">
              تخزين جاف · متاح الآن في دبي
            </Text>
          </Stack>
        </Inline>
      </Box>

      <Box
        background="surface"
        border
        radius="md"
        padding={4}
        style={{ borderInlineStartWidth: "4px", borderInlineStartColor: "var(--crate-color-action)" }}
      >
        <Text>
          The accent bar sits on the <strong>inline-start</strong> edge — left in English,
          right in Arabic.
        </Text>
      </Box>
    </Stack>
  ),
};
