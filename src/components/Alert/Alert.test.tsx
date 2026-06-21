import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders title and message with an assertive role for danger", () => {
    render(
      <Alert tone="danger" title="Booking failed">
        Try again
      </Alert>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Booking failed");
  });

  it("uses a polite status role for info", () => {
    render(<Alert tone="info">Heads up</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("calls onClose from the dismiss button", async () => {
    const onClose = vi.fn();
    render(
      <Alert tone="info" onClose={onClose}>
        Dismiss me
      </Alert>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Alert tone="success" title="Done">
        All set
      </Alert>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
