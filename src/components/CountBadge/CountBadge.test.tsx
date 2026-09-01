import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { CountBadge } from "./CountBadge";

describe("CountBadge", () => {
  it("renders the count", () => {
    render(<CountBadge count={3} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("caps at max with a plus suffix", () => {
    render(<CountBadge count={250} max={99} />);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("hides when count is 0 by default", () => {
    render(<CountBadge count={0} />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows 0 when showZero is set", () => {
    render(<CountBadge count={0} showZero />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("wraps a target and overlays the badge", () => {
    render(
      <CountBadge count={5}>
        <button type="button">Notifications</button>
      </CountBadge>,
    );
    expect(screen.getByRole("button", { name: "Notifications" })).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders a bare dot with an accessible label", () => {
    render(<CountBadge dot label="Unread notifications" />);
    expect(screen.getByLabelText("Unread notifications")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <CountBadge count={4} tone="accent">
        <button type="button">Cart</button>
      </CountBadge>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
