import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Listing</Card>);
    expect(screen.getByText("Listing")).toBeInTheDocument();
  });

  it("is focusable when interactive", () => {
    render(<Card interactive>Clickable</Card>);
    expect(screen.getByText("Clickable")).toHaveAttribute("tabindex", "0");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Card>Listing content</Card>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
