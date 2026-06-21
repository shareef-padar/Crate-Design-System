import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SegmentedControl } from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof SegmentedControl>;

const UNIT_OPTIONS = [
  { value: "sqft", label: "Sqft" },
  { value: "cbm", label: "CBM" },
  { value: "pallet", label: "Pallet" },
];

export const Default: Story = {
  render: () => {
    const [unit, setUnit] = useState("sqft");
    return (
      <SegmentedControl
        options={UNIT_OPTIONS}
        value={unit}
        onChange={setUnit}
        label="Storage unit"
      />
    );
  },
};

export const TwoOptions: Story = {
  render: () => {
    const [view, setView] = useState("grid");
    return (
      <SegmentedControl
        options={[
          { value: "grid", label: "Grid" },
          { value: "list", label: "List" },
        ]}
        value={view}
        onChange={setView}
        label="View mode"
      />
    );
  },
};
