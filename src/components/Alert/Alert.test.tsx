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

  it("renders a button action and fires onClick", async () => {
    const onClick = vi.fn();
    render(
      <Alert tone="info" action={{ label: "Verify now", onClick }}>
        Action needed
      </Alert>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Verify now" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders a link action when href is given", () => {
    render(
      <Alert tone="neutral" action={{ label: "Learn more", href: "/docs" }}>
        Info
      </Alert>,
    );
    expect(screen.getByRole("link", { name: "Learn more" })).toHaveAttribute("href", "/docs");
  });

  it("drops the title in compact mode but keeps the message", () => {
    render(
      <Alert tone="warning" title="Ignored" compact>
        Only 2 left
      </Alert>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Only 2 left");
    expect(screen.queryByText("Ignored")).not.toBeInTheDocument();
  });
});
