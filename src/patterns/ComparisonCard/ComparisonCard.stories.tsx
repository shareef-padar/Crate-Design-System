import type { Meta, StoryObj } from "@storybook/react";
import { ComparisonCard, type ComparisonSection } from "./ComparisonCard";
import { Inline } from "../../primitives/Inline";

const meta: Meta<typeof ComparisonCard> = {
  title: "Patterns/ComparisonCard",
  component: ComparisonCard,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof ComparisonCard>;

const trustSection = (waterSprinkler: "yes" | "partial", fireAlarm: "yes" | "partial", cctv: "yes" | "partial") =>
  ({
    label: "Trust & Compliance",
    rows: [
      { label: "Water Sprinkler", state: waterSprinkler },
      { label: "Fire Alarm", state: fireAlarm },
      { label: "CCTV", state: cctv },
    ],
  }) satisfies ComparisonSection;

const wh01: ComparisonSection[] = [
  {
    label: "Handling Services",
    badge: { label: "Optional" },
    rows: [
      { label: "Palletized In and Out", value: "AED 10/CBM" },
      { label: "Loose In & Out", value: "N/A", muted: true },
      { label: "Offloading and Loading (20FT)", value: "N/A", muted: true },
      { label: "Offloading and Loading (40FT)", value: "N/A", muted: true },
    ],
  },
  {
    label: "Value Added Service",
    rows: [
      { label: "Forklift", value: "AED 10/hr" },
      { label: "Labour", value: "AED 100/day" },
      { label: "Palletization", value: "AED 100/CBM" },
      { label: "Shrink Wrapping", value: "AED 10/pallet" },
      { label: "Labelling", value: "AED 0.5/unit" },
    ],
  },
  trustSection("yes", "partial", "yes"),
];

const wh02: ComparisonSection[] = [
  {
    label: "Handling Services",
    badge: { label: "Mandatory", tone: "warning" },
    rows: [
      { label: "Palletized In and Out", value: "AED 30/CBM" },
      { label: "Loose In & Out", value: "AED 30/CBM" },
      { label: "Offloading and Loading (20FT)", value: "AED 30/CBM" },
      { label: "Offloading and Loading (40FT)", value: "AED 30/CBM" },
    ],
  },
  {
    label: "Value Added Service",
    rows: [
      { label: "Forklift", value: "N/A", muted: true },
      { label: "Labour", value: "N/A", muted: true },
      { label: "Palletization", value: "N/A", muted: true },
      { label: "Shrink Wrapping", value: "N/A", muted: true },
      { label: "Labelling", value: "N/A", muted: true },
    ],
  },
  trustSection("yes", "yes", "yes"),
];

const wh03: ComparisonSection[] = [
  {
    label: "Handling Services",
    badge: { label: "Optional" },
    rows: [
      { label: "Palletized In and Out", value: "N/A", muted: true },
      { label: "Loose In & Out", value: "N/A", muted: true },
      { label: "Offloading and Loading (20FT)", value: "N/A", muted: true },
      { label: "Offloading and Loading (40FT)", value: "N/A", muted: true },
    ],
  },
  {
    label: "Value Added Service",
    rows: [
      { label: "Forklift", value: "AED 10/hr" },
      { label: "Labour", value: "AED 100/day" },
      { label: "Palletization", value: "AED 100/CBM" },
      { label: "Shrink Wrapping", value: "AED 10/pallet" },
      { label: "Labelling", value: "AED 0.5/unit" },
    ],
  },
  trustSection("yes", "yes", "yes"),
];

/** From the Cargoz warehouse-estimate comparison view (Figma node 5180:27685). */
export const WarehouseComparison: Story = {
  render: () => (
    <Inline gap={3} align="start" wrap={false}>
      <ComparisonCard title="WH-01" sections={wh01} />
      <ComparisonCard title="WH-02" sections={wh02} />
      <ComparisonCard title="WH-03" sections={wh03} />
    </Inline>
  ),
};

export const SingleCard: Story = {
  render: () => (
    <div style={{ maxInlineSize: "18rem" }}>
      <ComparisonCard title="WH-01" sections={wh01} />
    </div>
  ),
};
