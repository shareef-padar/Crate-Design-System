import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Stepper } from "./Stepper";

describe("Stepper", () => {
  it("renders the value and unit", () => {
    render(<Stepper value={5} onChange={() => {}} unit="Months" label="Duration" />);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Months")).toBeInTheDocument();
  });

  it("calls onChange with incremented value", async () => {
    const onChange = vi.fn();
    render(<Stepper value={5} onChange={onChange} label="Duration" />);
    await userEvent.click(screen.getByRole("button", { name: "Increase" }));
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it("calls onChange with decremented value", async () => {
    const onChange = vi.fn();
    render(<Stepper value={5} onChange={onChange} label="Duration" />);
    await userEvent.click(screen.getByRole("button", { name: "Decrease" }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("disables decrease at min", () => {
    render(<Stepper value={1} onChange={() => {}} min={1} label="Duration" />);
    expect(screen.getByRole("button", { name: "Decrease" })).toBeDisabled();
  });

  it("disables increase at max", () => {
    render(<Stepper value={10} onChange={() => {}} max={10} label="Duration" />);
    expect(screen.getByRole("button", { name: "Increase" })).toBeDisabled();
  });

  it("still renders buttons and value when unbordered", () => {
    render(<Stepper value={5} onChange={() => {}} label="Duration" bordered={false} />);
    expect(screen.getByRole("button", { name: "Increase" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Decrease" })).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
