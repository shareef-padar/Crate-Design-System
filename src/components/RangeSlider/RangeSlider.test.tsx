import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RangeSlider } from "./RangeSlider";

describe("RangeSlider", () => {
  it("renders a slider with the current value", () => {
    render(<RangeSlider value={30} min={0} max={100} onChange={() => {}} />);
    expect(screen.getByRole("slider")).toHaveValue("30");
  });

  it("calls onChange with the new numeric value", () => {
    const onChange = vi.fn();
    render(<RangeSlider value={30} min={0} max={100} onChange={onChange} />);
    fireEvent.change(screen.getByRole("slider"), { target: { value: "55" } });
    expect(onChange).toHaveBeenCalledWith(55);
  });

  it("shows formatted min/max captions when showRange is set", () => {
    render(
      <RangeSlider
        value={2500}
        min={500}
        max={25000}
        onChange={() => {}}
        showRange
        formatValue={(n) => `${n.toLocaleString()} sqft`}
      />,
    );
    expect(screen.getByText("500 sqft")).toBeInTheDocument();
    expect(screen.getByText("25,000 sqft")).toBeInTheDocument();
  });

  it("omits range captions by default", () => {
    render(<RangeSlider value={30} min={0} max={100} onChange={() => {}} />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });
});
