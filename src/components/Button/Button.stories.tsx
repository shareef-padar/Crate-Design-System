import type { Meta, StoryObj } from "@storybook/react";
import { MagnifyingGlass, ArrowRight } from "@phosphor-icons/react";
import { Button } from "./Button";
import { IconButton } from "../IconButton";

const SearchIcon = <MagnifyingGlass />;
const ArrowIcon = <ArrowRight />;

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "padded" },
  args: { children: "Find warehouse" },
};
export default meta;
type Story = StoryObj<typeof Button>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
    {children}
  </div>
);

export const Variants: Story = {
  render: (args) => (
    <Row>
      <Button {...args} variant="primary" />
      <Button {...args} variant="secondary" />
      <Button {...args} variant="ghost" />
      <Button {...args} variant="danger">
        Cancel booking
      </Button>
    </Row>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Row>
      <Button {...args} size="sm" />
      <Button {...args} size="md" />
      <Button {...args} size="lg" />
    </Row>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Row>
      <Button {...args} leadingIcon={SearchIcon} />
      <Button {...args} variant="secondary" trailingIcon={ArrowIcon}>
        View listings
      </Button>
    </Row>
  ),
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => (
    <div style={{ maxInlineSize: "20rem" }}>
      <Button {...args} />
    </div>
  ),
};

export const IconOnly_UseIconButton: Story = {
  name: "Icon-only → use IconButton",
  render: () => (
    <Row>
      <IconButton icon={<MagnifyingGlass />} label="Search warehouses" variant="primary" />
      <IconButton icon={<MagnifyingGlass />} label="Search warehouses" variant="secondary" />
      <IconButton icon={<MagnifyingGlass />} label="Search warehouses" variant="ghost" />
    </Row>
  ),
};
