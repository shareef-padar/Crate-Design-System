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

  it("marks highlighted cells with a distinct class", () => {
    const { container } = render(
      <Table>
        <Thead>
          <Tr>
            <Th>Plan</Th>
            <Th highlighted>Cargoz</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Fees</Td>
            <Td highlighted>None</Td>
          </Tr>
        </Tbody>
      </Table>,
    );
    const highlighted = container.querySelectorAll('[class*="highlighted"]');
    expect(highlighted).toHaveLength(2);
  });

  it("applies a zebra class when zebra is set", () => {
    const { container } = render(
      <Table zebra>
        <Tbody>
          <Tr>
            <Td>Water Sprinkler</Td>
            <Td>Included</Td>
          </Tr>
        </Tbody>
      </Table>,
    );
    expect(container.querySelector('table[class*="zebra"]')).toBeInTheDocument();
  });
});
