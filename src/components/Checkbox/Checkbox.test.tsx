import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders a label and toggles on click", async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Dubai" onChange={onChange} />);
    await userEvent.click(screen.getByRole("checkbox", { name: "Dubai" }));
    expect(onChange).toHaveBeenCalledOnce();
  });

  it("sets the DOM indeterminate property when indeterminate is true", () => {
    render(<Checkbox label="Sharjah" indeterminate onChange={() => {}} />);
    const input = screen.getByRole("checkbox", { name: "Sharjah" }) as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });

  it("clears indeterminate when the prop goes false", () => {
    const { rerender } = render(<Checkbox label="Sharjah" indeterminate onChange={() => {}} />);
    const input = screen.getByRole("checkbox", { name: "Sharjah" }) as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
    rerender(<Checkbox label="Sharjah" indeterminate={false} onChange={() => {}} />);
    expect(input.indeterminate).toBe(false);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Checkbox label="Dubai" description="Emirate" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
