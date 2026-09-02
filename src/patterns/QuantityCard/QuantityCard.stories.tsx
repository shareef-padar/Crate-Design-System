import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { QuantityCard } from "./QuantityCard";
import { Stack } from "../../primitives/Stack";

const meta: Meta<typeof QuantityCard> = {
  title: "Patterns/QuantityCard",
  component: QuantityCard,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof QuantityCard>;

/** A single row (Figma node 989:21744). */
export const Single: Story = {
  render: () => {
    const [qty, setQty] = useState(1);
    return (
      <div style={{ maxInlineSize: "40rem" }}>
        <QuantityCard
          title="20ft Container"
          description="33 CBM · 160 sqft · 10–11 pallets"
          value={qty}
          onChange={setQty}
          max={20}
        />
      </div>
    );
  },
};

/** A packing-materials picker — the reference's "Medium Box / Large box" list. */
export const PackingMaterialsList: Story = {
  render: () => {
    const [medium, setMedium] = useState(1);
    const [large, setLarge] = useState(1);
    return (
      <Stack gap={4} style={{ maxInlineSize: "40rem" }}>
        <QuantityCard
          title="Medium Box"
          description="~0.2 CBM each · think large moving box"
          value={medium}
          onChange={setMedium}
          max={200}
        />
        <QuantityCard
          title="Large box"
          description="~0.5 CBM each · approx 80 × 80 × 80 cm"
          value={large}
          onChange={setLarge}
          max={200}
        />
      </Stack>
    );
  },
};
