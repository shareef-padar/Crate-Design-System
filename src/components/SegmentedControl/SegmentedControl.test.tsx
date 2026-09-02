import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SegmentedControl } from "./SegmentedControl";

const OPTIONS = [
  { value: "sqft", label: "Sqft" },
  { value: "cbm", label: "CBM" },
  { value: "pallet", label: "Pallet" },
];

describe("SegmentedControl", () => {
  it("marks the active option as checked", () => {
    render(<SegmentedControl options={OPTIONS} value="cbm" onChange={() => {}} />);
    expect(screen.getByRole("radio", { name: "CBM" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Sqft" })).toHaveAttribute("aria-checked", "false");
  });

  it("calls onChange with the selected value", async () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={OPTIONS} value="sqft" onChange={onChange} />);
    await userEvent.click(screen.getByRole("radio", { name: "Pallet" }));
    expect(onChange).toHaveBeenCalledWith("pallet");
  });

  it("renders a labeled radiogroup", () => {
    render(
      <SegmentedControl options={OPTIONS} value="sqft" onChange={() => {}} label="Storage unit" />,
    );
    expect(screen.getByRole("radiogroup", { name: "Storage unit" })).toBeInTheDocument();
  });

  it("still functions when unbordered (embedded in another container)", async () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={OPTIONS} value="sqft" onChange={onChange} bordered={false} />);
    expect(screen.getByRole("radio", { name: "Sqft" })).toHaveAttribute("aria-checked", "true");
    await userEvent.click(screen.getByRole("radio", { name: "CBM" }));
    expect(onChange).toHaveBeenCalledWith("cbm");
  });

  it("still functions with variant=card", async () => {
    const onChange = vi.fn();
    render(<SegmentedControl variant="card" options={OPTIONS} value="sqft" onChange={onChange} />);
    expect(screen.getByRole("radio", { name: "Sqft" })).toHaveAttribute("aria-checked", "true");
    await userEvent.click(screen.getByRole("radio", { name: "Pallet" }));
    expect(onChange).toHaveBeenCalledWith("pallet");
  });
});
