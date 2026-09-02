import type { Meta, StoryObj } from "@storybook/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "./Table";
import { Badge } from "../Badge";

const meta: Meta = {
  title: "Components/Table",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

const rows = [
  { name: "Al Quoz Warehouse", city: "Dubai", size: "2,500", price: "AED 18", status: "Available" },
  { name: "Industrial City Unit 4", city: "Sharjah", size: "5,000", price: "AED 14", status: "Limited" },
  { name: "Riyadh Logistics Hub", city: "Riyadh", size: "8,000", price: "SAR 22", status: "Full" },
];

const tone = (s: string) =>
  s === "Available" ? "success" : s === "Limited" ? "warning" : "danger";

export const Listings: Story = {
  render: () => (
    <Table caption="Warehouse listings, updated daily">
      <Thead>
        <Tr>
          <Th>Warehouse</Th>
          <Th>City</Th>
          <Th align="end">Size (sqft)</Th>
          <Th align="end">Price / sqft</Th>
          <Th align="center">Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((r) => (
          <Tr key={r.name}>
            <Td>{r.name}</Td>
            <Td>{r.city}</Td>
            <Td align="end">{r.size}</Td>
            <Td align="end">{r.price}</Td>
            <Td align="center">
              <Badge tone={tone(r.status)} dot>
                {r.status}
              </Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  ),
};

/**
 * Marketing comparison table (Figma node 8291:36702) — mark every cell in
 * the "recommended" column with `highlighted`. A `<col>` can't carry text
 * color, so there's no single column-level switch; each Th/Td in that
 * column opts in individually.
 */
export const ComparisonHighlightedColumn: Story = {
  render: () => (
    <Table caption="Traditional broker vs. direct vs. Cargoz">
      <Thead>
        <Tr>
          <Th>The shape of it</Th>
          <Th>
            <div>Traditional broker</div>
            <div style={{ fontWeight: 400, color: "var(--crate-color-text-muted)" }}>
              Disappears after the deal closes
            </div>
          </Th>
          <Th>
            <div>Direct with warehouse</div>
            <div style={{ fontWeight: 400, color: "var(--crate-color-text-muted)" }}>
              You manage everything yourself
            </div>
          </Th>
          <Th highlighted>
            <div>Cargoz</div>
            <div style={{ fontWeight: 400 }}>Cargoz handles billing and disputes for the full term</div>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Move-in time</Td>
          <Td>4 to 8 weeks</Td>
          <Td>4 to 8 weeks</Td>
          <Td highlighted>24 hours for Fixed Area and Lockable Units. 3–5 working days for customized storage.</Td>
        </Tr>
        <Tr>
          <Td>Minimum term</Td>
          <Td>12 months</Td>
          <Td>12 months</Td>
          <Td highlighted>1 month, scale up or down anytime</Td>
        </Tr>
        <Tr>
          <Td>Fees on top of rent</Td>
          <Td>5 to 10% brokerage at signing</Td>
          <Td>None</Td>
          <Td highlighted>None. Our commission comes from the warehouse, not from you.</Td>
        </Tr>
      </Tbody>
    </Table>
  ),
};

/**
 * Facility/amenities list (Figma node 2962:17567) — no header row, `zebra`
 * alternates row background instead of border-separated rows.
 */
export const ZebraFeatureList: Story = {
  render: () => {
    const features = [
      { label: "Water Sprinkler", included: true },
      { label: "Fire Alarm", included: true },
      { label: "CCTV", included: false },
      { label: "Electricity", included: false },
      { label: "Toilet", included: false },
      { label: "Smoke Detector", included: false },
      { label: "24/7 Access", included: false },
    ];
    return (
      <Table caption="Facilities" zebra>
        <Tbody>
          {features.map((f) => (
            <Tr key={f.label}>
              <Td style={{ color: f.included ? undefined : "var(--crate-color-text-disabled)" }}>
                {f.label}
              </Td>
              <Td
                align="end"
                style={{ color: f.included ? undefined : "var(--crate-color-text-disabled)" }}
              >
                {f.included ? "Included" : "N/A"}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  },
};
