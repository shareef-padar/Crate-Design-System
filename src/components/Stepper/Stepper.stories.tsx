import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Stepper } from "./Stepper";

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
