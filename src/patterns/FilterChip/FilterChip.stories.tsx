import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FilterChip } from "./FilterChip";

const meta: Meta<typeof FilterChip> = {
  title: "Patterns/FilterChip",
  component: FilterChip,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof FilterChip>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>("sqft");
    const options = ["Sqft", "CBM", "Pallet"];
    return (
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        {options.map((opt) => (
          <FilterChip
            key={opt}
            selected={selected === opt.toLowerCase()}
            onClick={() => setSelected(opt.toLowerCase())}
          >
            {opt}
          </FilterChip>
        ))}
      </div>
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string>>(new Set(["dubai"]));
    const options = ["Dubai", "Sharjah", "Abu Dhabi", "Ajman"];
    const toggle = (val: string) =>
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(val) ? next.delete(val) : next.add(val);
        return next;
      });
    return (
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        {options.map((opt) => (
          <FilterChip
            key={opt}
            selected={selected.has(opt.toLowerCase())}
            onClick={() => toggle(opt.toLowerCase())}
          >
            {opt}
          </FilterChip>
        ))}
      </div>
    );
  },
};
