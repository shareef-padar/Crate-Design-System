import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { IconButton } from "./IconButton";

const Icon = (
  <svg viewBox="0 0 20 20" aria-hidden>
    <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" />
  </svg>
);

describe("IconButton", () => {
  it("renders a button", () => {
    render(<IconButton icon={Icon} label="Search" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows the label as a tooltip (title)", () => {
    render(<IconButton icon={Icon} label="Search warehouses" />);
    expect(screen.getByRole("button")).toHaveAttribute("title", "Search warehouses");
  });

  it("calls onClick when activated", async () => {
    const onClick = vi.fn();
    render(<IconButton icon={Icon} label="Search" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
