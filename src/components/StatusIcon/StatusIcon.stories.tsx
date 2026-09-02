import type { Meta, StoryObj } from "@storybook/react";
import { Check, X, WarningCircle } from "@phosphor-icons/react";
import { StatusIcon } from "./StatusIcon";
import { Inline } from "../../primitives/Inline";

const meta: Meta<typeof StatusIcon> = {
  title: "Components/StatusIcon",
  component: StatusIcon,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof StatusIcon>;

/** From the Cargoz status-icon reference (Figma node 7500:59140). */
export const Tones: Story = {
  render: () => (
    <Inline gap={6} align="center">
      <StatusIcon tone="success" size="lg" icon={<Check weight="bold" />} />
      <StatusIcon tone="danger" size="lg" icon={<X weight="bold" />} />
      <StatusIcon tone="warning" size="lg" icon={<WarningCircle weight="fill" />} />
    </Inline>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Inline gap={6} align="center">
      <StatusIcon tone="success" size="sm" icon={<Check weight="bold" />} />
      <StatusIcon tone="success" size="md" icon={<Check weight="bold" />} />
      <StatusIcon tone="success" size="lg" icon={<Check weight="bold" />} />
    </Inline>
  ),
};

/** Default tone — matches EmptyState's own default look. */
export const Accent: Story = {
  render: () => <StatusIcon size="lg" icon={<Check weight="bold" />} />,
};
