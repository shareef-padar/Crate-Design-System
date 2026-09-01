import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RadioCard } from "./RadioCard";
import { Stack } from "../../primitives/Stack";
import { Inline } from "../../primitives/Inline";

const meta: Meta<typeof RadioCard> = {
  title: "Components/RadioCard",
  component: RadioCard,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof RadioCard>;

/** "Do you need full service?" — from the Cargoz warehouse-estimate flow. */
export const ServiceLevel: Story = {
  render: () => {
    const [value, setValue] = useState("full-service");
    return (
      <Inline gap={4} wrap>
        <div style={{ flex: 1, minInlineSize: "18rem" }}>
          <RadioCard
            name="service-level"
            value="full-service"
            checked={value === "full-service"}
            onChange={() => setValue("full-service")}
            title="Yes, full service"
            description="Warehouse manages receiving, storage & dispatch"
          />
        </div>
        <div style={{ flex: 1, minInlineSize: "18rem" }}>
          <RadioCard
            name="service-level"
            value="self-managed"
            checked={value === "self-managed"}
            onChange={() => setValue("self-managed")}
            title="No, self-managed"
            description="You manage your own inventory on-site"
          />
        </div>
      </Inline>
    );
  },
};

/** "Pick a unit" — cards with a right-aligned price via the `meta` prop. */
export const PickAUnit: Story = {
  render: () => {
    const [value, setValue] = useState("100");
    const units = [
      { sqft: "100", price: "8/unit/month" },
      { sqft: "200", price: "14/unit/month" },
      { sqft: "500", price: "32/unit/month" },
    ];
    return (
      <Stack gap={3} style={{ maxInlineSize: "26rem" }}>
        {units.map((u) => (
          <RadioCard
            key={u.sqft}
            name="unit"
            value={u.sqft}
            checked={value === u.sqft}
            onChange={() => setValue(u.sqft)}
            title={`${u.sqft} sqft`}
            meta={`AED ${u.price}`}
            description="Non-AC"
          />
        ))}
      </Stack>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Stack gap={3} style={{ maxInlineSize: "20rem" }}>
      <RadioCard
        name="disabled-example"
        value="available"
        title="200 sqft"
        meta="AED 14/unit/month"
        description="Non-AC"
      />
      <RadioCard
        name="disabled-example"
        value="unavailable"
        title="500 sqft"
        meta="AED 32/unit/month"
        description="Currently fully booked"
        disabled
      />
    </Stack>
  ),
};
