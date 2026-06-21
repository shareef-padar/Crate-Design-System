import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { FormField } from "../FormField";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ maxInlineSize: "20rem" }}>
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

export const InFormField: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ maxInlineSize: "20rem" }}>
        <FormField label="Preferred move-in date" required helper="Move in within 48 hours">
          <DatePicker value={date} onChange={setDate} />
        </FormField>
      </div>
    );
  },
};

export const WithMinMax: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    const max = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    return (
      <div style={{ maxInlineSize: "20rem" }}>
        <FormField label="Booking date" helper="Within the next 2 months">
          <DatePicker value={date} onChange={setDate} min={today} max={max} />
        </FormField>
      </div>
    );
  },
};
