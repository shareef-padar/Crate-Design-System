import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import { Inline } from "../../primitives/Inline";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {
  render: () => (
    <Inline gap={3} align="center">
      <Avatar name="Sharif Padar" size="sm" />
      <Avatar name="Coca Cola" size="md" />
      <Avatar name="Noon" size="lg" />
    </Inline>
  ),
};

export const Square: Story = {
  render: () => (
    <Inline gap={3} align="center">
      <Avatar name="Geepas" square size="md" />
      <Avatar name="Hilton" square size="lg" />
    </Inline>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Avatar
      size="lg"
      name="Warehouse"
      src="https://placehold.co/96x96/2EA191/FFFFFF.png?text=W"
    />
  ),
};
