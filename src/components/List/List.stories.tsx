import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle } from "@phosphor-icons/react";
import { List, ListItem } from "./List";

const meta: Meta = {
  title: "Components/List",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

export const Unordered: Story = {
  render: () => (
    <List>
      <ListItem>AC / dry storage</ListItem>
      <ListItem>Cold storage</ListItem>
      <ListItem>Open yard</ListItem>
    </List>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <List variant="plain">
      <ListItem icon={<CheckCircle weight="fill" />}>No yearly lock-ins</ListItem>
      <ListItem icon={<CheckCircle weight="fill" />}>Move in within 48 hours</ListItem>
      <ListItem icon={<CheckCircle weight="fill" />}>Verified warehouses only</ListItem>
    </List>
  ),
};

export const Divided: Story = {
  render: () => (
    <div style={{ maxInlineSize: "24rem" }}>
      <List variant="plain" divided>
        <ListItem>Dubai — 1,200 warehouses</ListItem>
        <ListItem>Sharjah — 340 warehouses</ListItem>
        <ListItem>Riyadh — 25 warehouses</ListItem>
      </List>
    </div>
  ),
};
