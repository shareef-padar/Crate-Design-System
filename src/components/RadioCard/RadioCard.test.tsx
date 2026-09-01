import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { RadioCard } from "./RadioCard";

describe("RadioCard", () => {
  it("renders title, meta, and description", () => {
    render(
      <RadioCard
        name="unit"
        value="100"
        title="100 sqft"
        meta="AED 8/unit/month"
        description="Non-AC"
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("100 sqft")).toBeInTheDocument();
    expect(screen.getByText("AED 8/unit/month")).toBeInTheDocument();
    expect(screen.getByText("Non-AC")).toBeInTheDocument();
  });

  it("is a native radio, checkable via its accessible name", async () => {
    const onChange = vi.fn();
    render(
      <>
        <RadioCard name="unit" value="100" title="100 sqft" onChange={onChange} />
        <RadioCard name="unit" value="200" title="200 sqft" onChange={onChange} />
      </>,
    );
    const first = screen.getByRole("radio", { name: "100 sqft" });
    const second = screen.getByRole("radio", { name: "200 sqft" });
    expect(first).not.toBeChecked();
    await userEvent.click(second);
    expect(onChange).toHaveBeenCalled();
  });

  it("respects the checked prop", () => {
    render(
      <RadioCard
        name="unit"
        value="100"
        title="100 sqft"
        checked
        onChange={() => {}}
      />,
    );
    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("disables the input when disabled", () => {
    render(<RadioCard name="unit" value="100" title="100 sqft" disabled onChange={() => {}} />);
    expect(screen.getByRole("radio")).toBeDisabled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <RadioCard
        name="unit"
        value="100"
        title="100 sqft"
        meta="AED 8/unit/month"
        description="Non-AC"
        checked
        onChange={() => {}}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
