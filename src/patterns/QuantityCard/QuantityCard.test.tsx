import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { QuantityCard } from "./QuantityCard";

describe("QuantityCard", () => {
  it("renders the title and description", () => {
    render(
      <QuantityCard
        title="Medium Box"
        description="~0.2 CBM each"
        value={1}
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("Medium Box")).toBeInTheDocument();
    expect(screen.getByText("~0.2 CBM each")).toBeInTheDocument();
  });

  it("shows the current value and steps it via the stepper", async () => {
    const onChange = vi.fn();
    render(<QuantityCard title="Medium Box" value={2} onChange={onChange} />);
    expect(screen.getByText("2")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Increase" }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <QuantityCard title="Medium Box" description="~0.2 CBM each" value={1} onChange={() => {}} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
