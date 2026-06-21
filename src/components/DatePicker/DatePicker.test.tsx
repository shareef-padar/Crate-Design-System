import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./DatePicker";
import { FormField } from "../FormField";

describe("DatePicker", () => {
  it("shows the placeholder until a date is chosen", () => {
    render(<DatePicker placeholder="Select a date" />);
    expect(screen.getByRole("button", { name: "Select a date" })).toBeInTheDocument();
  });

  it("opens the calendar and selects a day", async () => {
    const onChange = vi.fn();
    render(<DatePicker defaultValue={new Date(2026, 5, 15)} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: /Jun/ }));
    expect(screen.getByRole("dialog", { name: "Choose date" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "20" }));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange.mock.calls[0][0].getDate()).toBe(20);
  });

  it("associates with a FormField label", () => {
    render(
      <FormField label="Move-in date">
        <DatePicker />
      </FormField>,
    );
    expect(screen.getByLabelText("Move-in date")).toBeInTheDocument();
  });
});
