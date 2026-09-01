import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MapPin } from "@phosphor-icons/react";
import { Tag } from "./Tag";
import { Inline } from "../../primitives/Inline";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Tones: Story = {
  render: () => (
    <Inline gap={2} wrap>
      <Tag tone="neutral">Neutral</Tag>
      <Tag tone="accent">Accent</Tag>
      <Tag tone="success">Success</Tag>
      <Tag tone="warning">Warning</Tag>
      <Tag tone="danger">Danger</Tag>
      <Tag tone="info">Info</Tag>
    </Inline>
  ),
};

export const Removable: Story = {
  render: () => (
    <Inline gap={2} wrap>
      <Tag tone="neutral" onRemove={() => {}} removeLabel="Remove Dubai filter">
        Dubai
      </Tag>
      <Tag tone="neutral" onRemove={() => {}} removeLabel="Remove size filter">
        1000+ sqft
      </Tag>
      <Tag tone="accent" icon={<MapPin weight="fill" />} onRemove={() => {}} removeLabel="Remove location filter">
        Al Quoz
      </Tag>
    </Inline>
  ),
};

/** Active-filter bar — the primary real-world use case: remove a token, it disappears. */
export const ActiveFilters: Story = {
  render: () => {
    const [filters, setFilters] = useState(["Dubai", "Warehouse", "1000–5000 sqft", "Fast move-in"]);
    if (filters.length === 0) {
      return <p>All filters cleared — re-run the story to reset.</p>;
    }
    return (
      <Inline gap={2} wrap>
        {filters.map((f) => (
          <Tag
            key={f}
            tone="neutral"
            onRemove={() => setFilters((prev) => prev.filter((x) => x !== f))}
            removeLabel={`Remove ${f} filter`}
          >
            {f}
          </Tag>
        ))}
      </Inline>
    );
  },
};
