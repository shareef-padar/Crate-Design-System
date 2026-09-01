import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { FilterChip } from "./FilterChip";

describe("FilterChip", () => {
  it("renders its content", () => {
    render(<FilterChip>Dubai</FilterChip>);
    expect(screen.getByRole("button", { name: "Dubai" })).toBeInTheDocument();
  });

  it("reflects selected state via aria-pressed", () => {
    render(<FilterChip selected>Dubai</FilterChip>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("defaults to unselected", () => {
    render(<FilterChip>Dubai</FilterChip>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onClick when toggled", async () => {
    const onClick = vi.fn();
    render(<FilterChip onClick={onClick}>Dubai</FilterChip>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders a leading icon and hides it from assistive tech", () => {
    render(
      <FilterChip icon={<svg data-testid="icon" />} selected>
        General Cargo
      </FilterChip>,
    );
    const icon = screen.getByTestId("icon");
    expect(icon.closest("[aria-hidden]")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <FilterChip icon={<svg />} selected>
        General Cargo
      </FilterChip>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
