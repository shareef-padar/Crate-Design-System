import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { NestedSelect, type NestedSelectOption } from "./NestedSelect";
import { FormField } from "../FormField";

const meta: Meta<typeof NestedSelect> = {
  title: "Components/NestedSelect",
  component: NestedSelect,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof NestedSelect>;

const LOCATIONS: NestedSelectOption[] = [
  { value: "dubai", label: "Dubai" },
  { value: "abu-dhabi", label: "Abu Dhabi" },
  {
    value: "sharjah",
    label: "Sharjah",
    children: [
      { value: "al-sajja", label: "Al Sajja" },
      { value: "emirates-industrial-city", label: "Emirates Industrial City" },
      { value: "sharjah-city", label: "Sharjah" },
      { value: "sharjah-industrial-area", label: "Sharjah Industrial Area" },
    ],
  },
  { value: "ajman", label: "Ajman" },
];

/** From the Cargoz warehouse-estimate location filter (Figma node 6771:21350). */
export const Locations: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div style={{ maxInlineSize: "22rem" }}>
        <FormField label="Location">
          <NestedSelect
            options={LOCATIONS}
            value={value}
            onChange={setValue}
            allLabel="Any Location"
            label="Location"
          />
        </FormField>
      </div>
    );
  },
};

/** Starting with one emirate's areas partially selected — shows the indeterminate parent. */
export const PartiallySelected: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["al-sajja", "emirates-industrial-city"]);
    return (
      <div style={{ maxInlineSize: "22rem" }}>
        <FormField label="Location" helper="Open it — Sharjah shows a dash, not a checkmark">
          <NestedSelect
            options={LOCATIONS}
            value={value}
            onChange={setValue}
            allLabel="Any Location"
            label="Location"
          />
        </FormField>
      </div>
    );
  },
};

/** A whole emirate selected as one unit — no need to drill in. */
export const WholeGroupSelected: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([
      "al-sajja",
      "emirates-industrial-city",
      "sharjah-city",
      "sharjah-industrial-area",
    ]);
    return (
      <div style={{ maxInlineSize: "22rem" }}>
        <FormField label="Location">
          <NestedSelect
            options={LOCATIONS}
            value={value}
            onChange={setValue}
            allLabel="Any Location"
            label="Location"
          />
        </FormField>
      </div>
    );
  },
};
