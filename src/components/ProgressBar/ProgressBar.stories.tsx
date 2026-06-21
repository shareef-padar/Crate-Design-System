import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";
import { Stack } from "../../primitives/Stack";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Determinate: Story = {
  render: () => (
    <Stack gap={4} style={{ maxInlineSize: "30rem" }}>
      <ProgressBar value={25} label="Upload progress" />
      <ProgressBar value={64} label="Upload progress" />
      <ProgressBar value={100} label="Upload progress" />
    </Stack>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div style={{ maxInlineSize: "30rem" }}>
      <ProgressBar label="Loading listings" />
    </div>
  ),
};

export const Small: Story = {
  render: () => (
    <div style={{ maxInlineSize: "30rem" }}>
      <ProgressBar value={48} size="sm" label="Progress" />
    </div>
  ),
};
