import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("shows initials when no image is given", () => {
    render(<Avatar name="Sharif Padar" />);
    expect(screen.getByText("SP")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Sharif Padar" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Avatar name="Noon" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
