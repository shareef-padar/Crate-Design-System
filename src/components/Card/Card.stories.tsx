import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Stack } from "../../primitives/Stack";
import { Inline } from "../../primitives/Inline";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card style={{ maxInlineSize: "24rem" }}>
      <Stack gap={2}>
        <Heading level={3} size="h4">
          Border-led surface
        </Heading>
        <Text color="secondary">
          Cards separate with a 1px border and no shadow by default — calm and
          high-contrast for office LCD screens.
        </Text>
      </Stack>
    </Card>
  ),
};

export const Elevations: Story = {
  render: () => (
    <Inline gap={4} wrap>
      {(["none", "sm", "md"] as const).map((e) => (
        <Card key={e} elevation={e} style={{ inlineSize: "12rem" }}>
          <Text weight="bold">elevation="{e}"</Text>
        </Card>
      ))}
    </Inline>
  ),
};

export const WarehouseListing: Story = {
  name: "Cargoz listing card",
  render: () => (
    <Card interactive padding="default" style={{ maxInlineSize: "22rem" }}>
      <Stack gap={3}>
        <div
          style={{
            blockSize: "9rem",
            borderRadius: "var(--crate-radius-md)",
            background: "var(--crate-color-action-subtle)",
          }}
        />
        <Inline justify="between" align="start">
          <Heading level={3} size="h4">
            Al Quoz Warehouse
          </Heading>
          <Badge tone="success" dot>
            Available
          </Badge>
        </Inline>
        <Text color="secondary">Dry storage · Dubai · 2,500 sqft</Text>
        <Inline justify="between" align="center">
          <Stack gap={0}>
            <Text size="body-lg" weight="bold">
              AED 18 / sqft
            </Text>
            <Text size="body-sm" color="muted">
              per month
            </Text>
          </Stack>
          <Button size="sm">View details</Button>
        </Inline>
      </Stack>
    </Card>
  ),
};
