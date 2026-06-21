import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { List, ListItem } from "./List";

describe("List", () => {
  it("renders list items", () => {
    render(
      <List>
        <ListItem>Cold storage</ListItem>
      </List>,
    );
    expect(screen.getByRole("listitem")).toHaveTextContent("Cold storage");
  });

  it("renders an ordered list when variant is ordered", () => {
    const { container } = render(
      <List variant="ordered">
        <ListItem>First</ListItem>
      </List>,
    );
    expect(container.querySelector("ol")).toBeInTheDocument();
  });
});
