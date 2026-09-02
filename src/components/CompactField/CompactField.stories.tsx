import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CompactSelectField, CompactInputField } from "./CompactField";
import { FieldGroup } from "../FieldGroup";

const meta: Meta = {
  title: "Components/CompactField",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

/** "Period | Size (sqft)" — from the Cargoz warehouse-estimate summary (Figma node 2551:53278). */
export const PeriodAndSize: Story = {
  render: () => {
    const [months, setMonths] = useState("2");
    const [size, setSize] = useState(2000);
    return (
      <div style={{ maxInlineSize: "24rem" }}>
        <FieldGroup>
          <CompactSelectField
            label="Period"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          >
            <option value="1">1 month</option>
            <option value="2">2 months</option>
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="12">12 months</option>
          </CompactSelectField>
          <CompactInputField
            label="Size (sqft)"
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </FieldGroup>
      </div>
    );
  },
};

export const ThreeUp: Story = {
  render: () => {
    const [months, setMonths] = useState("2");
    const [size, setSize] = useState(2000);
    const [unit, setUnit] = useState("sqft");
    return (
      <div style={{ maxInlineSize: "36rem" }}>
        <FieldGroup>
          <CompactSelectField
            label="Period"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          >
            <option value="1">1 month</option>
            <option value="2">2 months</option>
            <option value="3">3 months</option>
          </CompactSelectField>
          <CompactInputField
            label="Size"
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
          <CompactSelectField label="Unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="sqft">sqft</option>
            <option value="cbm">cbm</option>
            <option value="pallet">pallet</option>
          </CompactSelectField>
        </FieldGroup>
      </div>
    );
  },
};
