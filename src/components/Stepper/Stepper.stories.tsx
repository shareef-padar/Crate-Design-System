import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Stepper } from "./Stepper";
import { SegmentedControl } from "../SegmentedControl";
import { FormField } from "../FormField";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

export const Duration: Story = {
  render: () => {
    const [months, setMonths] = useState(5);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <span style={{ fontFamily: "var(--crate-font-family-heading)", fontWeight: 700, fontSize: "var(--crate-font-size-body-lg)", color: "var(--crate-color-text-primary)" }}>
          Duration
        </span>
        <Stepper
          value={months}
          onChange={setMonths}
          min={1}
          max={36}
          unit="Months"
          label="Duration"
        />
      </div>
    );
  },
};

export const Quantity: Story = {
  render: () => {
    const [qty, setQty] = useState(1);
    return (
      <Stepper
        value={qty}
        onChange={setQty}
        min={1}
        max={100}
        unit="Pallets"
        label="Quantity"
      />
    );
  },
};

export const NoUnit: Story = {
  render: () => {
    const [n, setN] = useState(3);
    return <Stepper value={n} onChange={setN} min={0} label="Count" />;
  },
};

/**
 * Warehouse-estimate "Size" control — unit toggle (Sqft/CBM/Pallet) composed
 * above a Stepper, matching the real Cargoz estimate page. Built from two
 * existing components rather than a new bespoke one.
 */
export const WithUnitToggle: Story = {
  render: () => {
    const UNITS = [
      { value: "sqft", label: "Sqft", step: 100, max: 25000, default: 3000 },
      { value: "cbm", label: "CBM", step: 5, max: 2000, default: 100 },
      { value: "pallet", label: "Pallet", step: 1, max: 500, default: 24 },
    ];
    const [unit, setUnit] = useState("sqft");
    const [size, setSize] = useState(3000);
    const current = UNITS.find((u) => u.value === unit)!;

    const handleUnitChange = (next: string) => {
      setUnit(next);
      // Real unit conversion is out of scope for this demo — reset to a
      // sensible default per unit instead of carrying over a mismatched value.
      setSize(UNITS.find((u) => u.value === next)!.default);
    };

    return (
      <div style={{ maxInlineSize: "26rem" }}>
        <FormField label="Size">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <SegmentedControl
              options={UNITS.map(({ value, label }) => ({ value, label }))}
              value={unit}
              onChange={handleUnitChange}
              label="Unit"
            />
            <Stepper
              value={size}
              onChange={setSize}
              min={0}
              max={current.max}
              step={current.step}
              unit={current.label.toLowerCase()}
              label="Size"
            />
          </div>
        </FormField>
      </div>
    );
  },
};

/**
 * The other Cargoz layout for the same "Size" control: stepper and unit
 * toggle share ONE row and ONE border, split by a hairline divider, instead
 * of stacking. Both `Stepper` and `SegmentedControl` support `bordered={false}`
 * for exactly this — dropping their own outer chrome so a shared wrapper can
 * own the single border. Prefer the stacked `WithUnitToggle` layout by default
 * (more robust at narrow widths and with longer unit labels); reach for this
 * one when the design specifically calls for the tighter, single-row look.
 */
export const WithInlineUnitToggle: Story = {
  render: () => {
    const UNITS = [
      { value: "sqft", label: "Sqft", step: 100, max: 25000, default: 3000 },
      { value: "cbm", label: "CBM", step: 5, max: 2000, default: 100 },
      { value: "pallet", label: "Pallet", step: 1, max: 500, default: 24 },
    ];
    const [unit, setUnit] = useState("sqft");
    const [size, setSize] = useState(3000);
    const current = UNITS.find((u) => u.value === unit)!;

    const handleUnitChange = (next: string) => {
      setUnit(next);
      setSize(UNITS.find((u) => u.value === next)!.default);
    };

    return (
      <div style={{ maxInlineSize: "36rem" }}>
        <FormField label="Size">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              minBlockSize: "3rem",
              border: "1.5px solid var(--crate-color-border)",
              borderRadius: "var(--crate-radius-md)",
              backgroundColor: "var(--crate-color-surface)",
              paddingInlineEnd: "0.5rem",
            }}
          >
            <Stepper
              value={size}
              onChange={setSize}
              min={0}
              max={current.max}
              step={current.step}
              unit={current.label.toLowerCase()}
              label="Size"
              bordered={false}
              style={{ flex: 1 }}
            />
            <span
              aria-hidden
              style={{
                inlineSize: "1px",
                blockSize: "1.5rem",
                backgroundColor: "var(--crate-color-border)",
                flexShrink: 0,
              }}
            />
            <SegmentedControl
              options={UNITS.map(({ value, label }) => ({ value, label }))}
              value={unit}
              onChange={handleUnitChange}
              label="Unit"
              bordered={false}
            />
          </div>
        </FormField>
      </div>
    );
  },
};
