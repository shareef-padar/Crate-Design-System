import type { Meta, StoryObj } from "@storybook/react";
import { MagnifyingGlass, WarningCircle } from "@phosphor-icons/react";
import { EmptyState } from "./EmptyState";
import { Button } from "../../components/Button";

const meta: Meta<typeof EmptyState> = {
  title: "Patterns/EmptyState",
  component: EmptyState,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  render: () => (
    <EmptyState
      title="No warehouses found"
      description="Try adjusting your filters or search a different area."
      action={<Button variant="secondary">Clear filters</Button>}
    />
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <EmptyState
      icon={<MagnifyingGlass weight="duotone" />}
      title="No results for “Al Quoz cold storage”"
      description="Check the spelling, or try a broader search."
    />
  ),
};

/** A failed state — tone="danger" tints the icon circle red instead of teal. */
export const Failed: Story = {
  render: () => (
    <EmptyState
      icon={<WarningCircle weight="fill" />}
      tone="danger"
      title="Couldn't load listings"
      description="Something went wrong on our end. Please try again."
      action={<Button variant="secondary">Retry</Button>}
    />
  ),
};
