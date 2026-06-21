import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RangeSlider } from "./RangeSlider";
import { FormField } from "../FormField";

const meta: Meta<typeof RangeSlider> = {
  title: "Components/RangeSlider",
  component: RangeSlider,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {
  render: () => {
    const [v, setV] = useState(40);
    return (
      <div style={{ maxInlineSize: "26rem" }}>
        <RangeSlider value={v} onChange={setV} showValue />
      </div>
    );
  },
};

export const SpaceNeeded: Story = {
  render: () => {
    const [v, setV] = useState(2500);
    return (
      <div style={{ maxInlineSize: "26rem" }}>
        <FormField label="Maximum space" helper="Filter listings by size">
          <RangeSlider
            value={v}
            min={0}
            max={10000}
            step={100}
            onChange={setV}
            showValue
            formatValue={(n) => `${n.toLocaleString()} sqft`}
          />
        </FormField>
      </div>
    );
  },
};
