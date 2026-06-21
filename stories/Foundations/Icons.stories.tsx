import type { Meta, StoryObj } from "@storybook/react";
import {
  MagnifyingGlass,
  CaretDown,
  CaretLeft,
  CaretRight,
  X,
  Check,
  Info,
  CheckCircle,
  Warning,
  XCircle,
  SealCheck,
  ShieldCheck,
  Star,
  Phone,
  WhatsappLogo,
  MapPin,
  Package,
  CalendarBlank,
  Truck,
  Buildings,
  type Icon,
} from "@phosphor-icons/react";
import { Heading } from "../../src/components/Heading";
import { Text } from "../../src/components/Text";

const meta: Meta = {
  title: "Foundations/Icons",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

const SET: [string, Icon][] = [
  ["MagnifyingGlass", MagnifyingGlass],
  ["CaretDown", CaretDown],
  ["CaretLeft", CaretLeft],
  ["CaretRight", CaretRight],
  ["X", X],
  ["Check", Check],
  ["Info", Info],
  ["CheckCircle", CheckCircle],
  ["Warning", Warning],
  ["XCircle", XCircle],
  ["SealCheck", SealCheck],
  ["ShieldCheck", ShieldCheck],
  ["Star", Star],
  ["Phone", Phone],
  ["WhatsappLogo", WhatsappLogo],
  ["MapPin", MapPin],
  ["Package", Package],
  ["CalendarBlank", CalendarBlank],
  ["Truck", Truck],
  ["Buildings", Buildings],
];

export const Library: Story = {
  render: () => (
    <div style={{ maxInlineSize: "52rem" }}>
      <Heading level={2} size="h3" style={{ marginBlockEnd: "0.5rem" }}>
        Icons — Phosphor
      </Heading>
      <Text color="secondary" style={{ marginBlockEnd: "1.5rem", display: "block" }}>
        Crate uses{" "}
        <a href="https://phosphoricons.com" target="_blank" rel="noreferrer">
          Phosphor Icons
        </a>
        . Import any icon from <code>@phosphor-icons/react</code> (or the common ones from{" "}
        <code>@cargoz/crate</code>). They inherit text size and color automatically and
        accept a <code>weight</code> (regular / bold / fill / duotone) and a{" "}
        <code>mirrored</code> prop for RTL.
      </Text>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))",
          gap: "0.5rem",
          fontSize: "1.5rem",
        }}
      >
        {SET.map(([name, Glyph]) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              padding: "0.75rem",
              border: "1px solid var(--crate-color-border)",
              borderRadius: "var(--crate-radius-md)",
            }}
          >
            <Glyph />
            <span style={{ fontSize: "0.8125rem", color: "var(--crate-color-text-secondary)" }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};
