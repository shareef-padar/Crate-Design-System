import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Package, BowlFood, Pill, WarningCircle } from "@phosphor-icons/react";
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

/**
 * "What are you storing?" — multi-select cargo category, from the Cargoz
 * warehouse-estimate flow (Figma node 1221:24260). Icons are Phosphor
 * (Package / BowlFood / Pill / WarningCircle), not the reference's custom
 * SVGs — keeps the glyph language consistent with every other icon in Crate.
 */
export const WithIcons: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string>>(new Set(["general"]));
    const options = [
      { value: "general", label: "General Cargo", icon: <Package weight="duotone" /> },
      { value: "food", label: "Food & Beverages", icon: <BowlFood weight="duotone" /> },
      { value: "medical", label: "Medical", icon: <Pill weight="duotone" /> },
      { value: "dangerous", label: "Dangerous Goods", icon: <WarningCircle weight="duotone" /> },
    ];
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
            key={opt.value}
            icon={opt.icon}
            selected={selected.has(opt.value)}
            onClick={() => toggle(opt.value)}
          >
            {opt.label}
          </FilterChip>
        ))}
      </div>
    );
  },
};
