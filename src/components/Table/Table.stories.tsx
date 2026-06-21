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
