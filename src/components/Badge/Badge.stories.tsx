import type { Meta, StoryObj } from "@storybook/react";
import { Clock, ShieldCheck, Lightning } from "@phosphor-icons/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Badge>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
    {children}
  </div>
);

export const Tones: Story = {
  render: () => (
    <Row>
      <Badge tone="neutral">Draft</Badge>
      <Badge tone="accent">Featured</Badge>
      <Badge tone="success">Available</Badge>
      <Badge tone="warning">Limited</Badge>
      <Badge tone="danger">Full</Badge>
      <Badge tone="info">New</Badge>
    </Row>
  ),
};

export const WithDot: Story = {
  render: () => (
    <Row>
      <Badge tone="success" dot>
        Available now
      </Badge>
      <Badge tone="warning" dot>
        2 units left
      </Badge>
      <Badge tone="danger" dot>
        Fully booked
      </Badge>
    </Row>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Row>
      <Badge tone="info" icon={<Clock weight="bold" />}>
        Pending review
      </Badge>
      <Badge tone="success" icon={<ShieldCheck weight="fill" />}>
        Verified owner
      </Badge>
      <Badge tone="accent" icon={<Lightning weight="fill" />}>
        Fast move-in
      </Badge>
    </Row>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Row>
      <Badge tone="success" size="sm">
        Verified
      </Badge>
      <Badge tone="success" size="md">
        Verified
      </Badge>
    </Row>
  ),
};
