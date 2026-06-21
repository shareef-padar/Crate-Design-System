import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Autocomplete } from "./Autocomplete";
import { FormField } from "../FormField";

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Autocomplete>;

const CITIES = [
  { value: "dxb", label: "Dubai" },
  { value: "shj", label: "Sharjah" },
  { value: "auh", label: "Abu Dhabi" },
  { value: "ajm", label: "Ajman" },
  { value: "uaq", label: "Umm Al Quwain" },
  { value: "ruh", label: "Riyadh" },
];

export const Default: Story = {
  render: () => {
    const [city, setCity] = useState("");
    return (
      <div style={{ maxInlineSize: "22rem" }}>
        <FormField label="Where do you need storage?">
          <Autocomplete options={CITIES} value={city} onChange={setCity} placeholder="Type a city" />
        </FormField>
      </div>
    );
  },
};
