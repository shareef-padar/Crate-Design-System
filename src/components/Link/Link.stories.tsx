import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";
import { Text } from "../Text";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  parameters: { layout: "padded" },
  args: { href: "#", children: "View all warehouses" },
};
export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const Subtle: Story = {
  args: { variant: "subtle" },
};

export const InlineInText: Story = {
  render: () => (
    <Text style={{ maxInlineSize: "32rem" }}>
      Move in within 48 hours with no yearly lock-ins.{" "}
      <Link href="#">See how pricing works</Link> or talk to our team directly.
    </Text>
  ),
};
