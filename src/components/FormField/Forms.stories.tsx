import type { Meta, StoryObj } from "@storybook/react";
import { type CSSProperties } from "react";
import { FormField } from "./FormField";
import { Input, InputSelect } from "../Input";
import { Textarea } from "../Textarea";
import { Select } from "../Select";
import { Checkbox } from "../Checkbox";
import { Radio } from "../Radio";
import { Switch } from "../Switch";
import { Button } from "../Button";
import { Card } from "../Card";
import { Heading } from "../Heading";
import { Stack } from "../../primitives/Stack";
import { Inline } from "../../primitives/Inline";
import { MagnifyingGlass } from "@phosphor-icons/react";

const meta: Meta = {
  title: "Components/Form Controls",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

export const TextInputs: Story = {
  render: () => (
    <Stack gap={5} style={{ maxInlineSize: "26rem" }}>
      <FormField label="Where do you need storage?" helper="City or area in the UAE">
        <Input placeholder="e.g. Dubai, Al Quoz" />
      </FormField>
      <FormField label="Company name" required>
        <Input placeholder="Your business" />
      </FormField>
      <FormField label="Work email" error="Enter a valid email address">
        <Input type="email" defaultValue="not-an-email" />
      </FormField>
      <FormField label="Reference code" disabled>
        <Input placeholder="Optional" />
      </FormField>
    </Stack>
  ),
};

const stateCaptionStyle: CSSProperties = {
  fontFamily: "var(--crate-font-family-body)",
  fontSize: "var(--crate-font-size-caption)",
  color: "var(--crate-color-text-muted)",
  margin: 0,
};

/**
 * The six field states from the Cargoz validation-state reference (Figma
 * node 6705:64593): initial, hover, focus, verified, disabled, error.
 * Initial/hover/focus/disabled/error were already covered by
 * field.module.css — the checkmark state was the one real gap, now Input's
 * `verified` prop.
 *
 * `verified` is narrower than the reference's generic "valid" label: it's
 * for a value the BACKEND has confirmed (OTP-verified phone, an email
 * already on file) — not client-side format checking ("looks like an
 * email"), which belongs on FormField's `error` instead.
 */
export const FieldStates: Story = {
  render: () => (
    <Stack gap={5} style={{ maxInlineSize: "20rem" }}>
      <Stack gap={1}>
        <p style={stateCaptionStyle}>Initial</p>
        <FormField label="Your Name" required>
          <Input placeholder="Your name" />
        </FormField>
      </Stack>
      <Stack gap={1}>
        <p style={stateCaptionStyle}>Hover (try it — border darkens)</p>
        <FormField label="Your Name" required>
          <Input placeholder="Your name" />
        </FormField>
      </Stack>
      <Stack gap={1}>
        <p style={stateCaptionStyle}>Focus / active typing</p>
        <FormField label="Your Name" required>
          <Input placeholder="Your name" autoFocus />
        </FormField>
      </Stack>
      <Stack gap={1}>
        <p style={stateCaptionStyle}>Verified — confirmed by the backend, e.g. after OTP</p>
        <FormField label="Phone number" required>
          <Input type="tel" defaultValue="+971 50 123 4567" verified />
        </FormField>
      </Stack>
      <Stack gap={1}>
        <p style={stateCaptionStyle}>Disabled</p>
        <FormField label="Your Name" required disabled>
          <Input defaultValue="John Jacobs" />
        </FormField>
      </Stack>
      <Stack gap={1}>
        <p style={stateCaptionStyle}>Error</p>
        <FormField label="Your Name" required error="Enter your full name to continue">
          <Input placeholder="Your name" />
        </FormField>
      </Stack>
    </Stack>
  ),
};

export const InputAdornments: Story = {
  name: "Input prefix / suffix",
  render: () => (
    <Stack gap={5} style={{ maxInlineSize: "26rem" }}>
      <FormField label="Monthly rent" helper="Per month, in dirhams">
        <Input type="number" prefix="AED" suffix="/ month" placeholder="0" />
      </FormField>
      <FormField label="Phone number">
        <Input type="tel" prefix="+971" placeholder="50 123 4567" inputMode="tel" />
      </FormField>
      <FormField label="Search listings">
        <Input prefix={<MagnifyingGlass size={18} />} placeholder="Al Quoz, Dubai" />
      </FormField>
      <FormField label="Space needed">
        <Input type="number" suffix="sqft" placeholder="2500" />
      </FormField>
      <FormField label="Website" helper="Addon style — filled segment">
        <Input prefix="https://" adornment="addon" placeholder="yourcompany.com" />
      </FormField>
      <FormField label="Currency amount">
        <Input prefix="SAR" adornment="addon" type="number" placeholder="0.00" />
      </FormField>
    </Stack>
  ),
};

export const InputDropdownAdornments: Story = {
  name: "Input dropdown prefix / suffix",
  render: () => (
    <Stack gap={5} style={{ maxInlineSize: "26rem" }}>
      <FormField label="Phone number" helper="Country code is selectable">
        <Input
          type="tel"
          inputMode="tel"
          placeholder="50 123 4567"
          prefix={
            <InputSelect aria-label="Country code" defaultValue="971">
              <option value="971">🇦🇪 +971</option>
              <option value="966">🇸🇦 +966</option>
              <option value="965">🇰🇼 +965</option>
              <option value="974">🇶🇦 +974</option>
            </InputSelect>
          }
        />
      </FormField>

      <FormField label="Price" helper="Currency is selectable">
        <Input
          type="number"
          placeholder="0.00"
          suffix={
            <InputSelect aria-label="Currency" defaultValue="AED">
              <option value="AED">AED</option>
              <option value="SAR">SAR</option>
              <option value="USD">USD</option>
            </InputSelect>
          }
        />
      </FormField>

      <FormField label="Space needed" helper="Unit is selectable">
        <Input
          type="number"
          placeholder="2500"
          suffix={
            <InputSelect aria-label="Unit" defaultValue="sqft">
              <option value="sqft">sqft</option>
              <option value="sqm">sqm</option>
              <option value="cbm">cbm</option>
            </InputSelect>
          }
        />
      </FormField>
    </Stack>
  ),
};

export const SelectAndTextarea: Story = {
  render: () => (
    <Stack gap={5} style={{ maxInlineSize: "26rem" }}>
      <FormField label="What are you storing?" helper="Pick the closest match">
        <Select defaultValue="">
          <option value="" disabled>
            Select cargo type
          </option>
          <option>General / dry goods</option>
          <option>Food-grade</option>
          <option>Cold storage</option>
          <option>Chemical / pharmaceutical</option>
        </Select>
      </FormField>
      <FormField label="Anything else we should know?">
        <Textarea placeholder="Tell us about your storage needs" />
      </FormField>
    </Stack>
  ),
};

export const Choices: Story = {
  render: () => (
    <Inline gap={8} align="start" wrap>
      <Stack gap={3}>
        <Heading level={3} size="h5">
          Facilities
        </Heading>
        <Checkbox label="Temperature controlled" defaultChecked />
        <Checkbox label="24/7 access" description="Round-the-clock entry" />
        <Checkbox label="Loading dock" />
        <Checkbox label="Unavailable option" disabled />
        <Checkbox
          label="Sharjah"
          description="Some but not all sub-areas selected"
          indeterminate
        />
      </Stack>
      <Stack gap={3}>
        <Heading level={3} size="h5">
          Rental term
        </Heading>
        <Radio name="term" label="Weekly" />
        <Radio name="term" label="Monthly" defaultChecked />
        <Radio name="term" label="Yearly" description="Best rate" />
      </Stack>
      <Stack gap={3}>
        <Heading level={3} size="h5">
          Preferences
        </Heading>
        <Switch label="Notify me about new listings" defaultChecked />
        <Switch label="Share my number on WhatsApp" />
      </Stack>
    </Inline>
  ),
};

export const BookingForm: Story = {
  name: "Cargoz enquiry form",
  render: () => (
    <Card style={{ maxInlineSize: "30rem" }}>
      <Stack gap={5}>
        <Heading level={2} size="h3">
          Find your warehouse
        </Heading>
        <FormField label="Where do you need storage?" required>
          <Input placeholder="e.g. Dubai, Al Quoz" />
        </FormField>
        <Inline gap={4} align="start" wrap={false}>
          <FormField label="What are you storing?" required>
            <Select defaultValue="">
              <option value="" disabled>
                Select type
              </option>
              <option>General / dry goods</option>
              <option>Food-grade</option>
              <option>Cold storage</option>
            </Select>
          </FormField>
          <FormField label="Space needed" helper="In sqft">
            <Input type="number" placeholder="2500" />
          </FormField>
        </Inline>
        <Checkbox label="I agree to be contacted on WhatsApp" defaultChecked />
        <Button fullWidth>Request quote</Button>
      </Stack>
    </Card>
  ),
};
