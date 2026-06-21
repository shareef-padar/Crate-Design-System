import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./Breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: "Home", href: "#" },
        { label: "Dubai", href: "#" },
        { label: "Al Quoz Warehouse" },
      ]}
    />
  ),
};
