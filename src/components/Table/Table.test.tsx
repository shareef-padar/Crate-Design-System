import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Table, Thead, Tbody, Tr, Th, Td } from "./Table";

function Example() {
  return (
    <Table caption="Listings">
      <Thead>
        <Tr>
          <Th>Warehouse</Th>
          <Th align="end">Price</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Al Quoz</Td>
          <Td align="end">AED 18</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

describe("Table", () => {
  it("renders a table with column headers and cells", () => {
    render(<Example />);
    expect(screen.getByRole("table", { name: "Listings" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Warehouse" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Al Quoz" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Example />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
