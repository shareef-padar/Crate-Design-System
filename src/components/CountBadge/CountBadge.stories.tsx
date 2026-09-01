import type { Meta, StoryObj } from "@storybook/react";
import { Bell, ShoppingCart } from "@phosphor-icons/react";
import { CountBadge } from "./CountBadge";
import { IconButton } from "../IconButton";
import { Avatar } from "../Avatar";
import { Inline } from "../../primitives/Inline";

const meta: Meta<typeof CountBadge> = {
  title: "Components/CountBadge",
  component: CountBadge,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof CountBadge>;

export const OnIconButton: Story = {
  render: () => (
    <Inline gap={6}>
      <CountBadge count={3}>
        <IconButton variant="ghost" icon={<Bell />} label="Notifications" />
      </CountBadge>
      <CountBadge count={12} tone="accent">
        <IconButton variant="ghost" icon={<ShoppingCart />} label="Cart" />
      </CountBadge>
      <CountBadge count={128}>
        <IconButton variant="ghost" icon={<Bell />} label="Notifications" />
      </CountBadge>
    </Inline>
  ),
};

export const DotOnly: Story = {
  render: () => (
    <CountBadge dot label="You have unread notifications">
      <IconButton variant="ghost" icon={<Bell />} label="Notifications" />
    </CountBadge>
  ),
};

export const OnAvatar: Story = {
  render: () => (
    <CountBadge dot tone="success" label="Online">
      <Avatar name="Amina Khalid" size="lg" />
    </CountBadge>
  ),
};

export const Tones: Story = {
  render: () => (
    <Inline gap={6}>
      <CountBadge count={4} tone="danger">
        <IconButton variant="ghost" icon={<Bell />} label="Notifications" />
      </CountBadge>
      <CountBadge count={4} tone="accent">
        <IconButton variant="ghost" icon={<Bell />} label="Notifications" />
      </CountBadge>
      <CountBadge count={4} tone="success">
        <IconButton variant="ghost" icon={<Bell />} label="Notifications" />
      </CountBadge>
      <CountBadge count={4} tone="neutral">
        <IconButton variant="ghost" icon={<Bell />} label="Notifications" />
      </CountBadge>
    </Inline>
  ),
};

export const Standalone: Story = {
  render: () => (
    <Inline gap={3} align="center">
      <CountBadge count={5} />
      <CountBadge count={0} showZero />
      <CountBadge count={0} />
      <span>← hidden when count is 0 and showZero is unset</span>
    </Inline>
  ),
};
