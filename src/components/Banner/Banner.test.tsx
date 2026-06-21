import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Banner } from "./Banner";

describe("Banner", () => {
  it("renders its message with a status role", () => {
    render(<Banner tone="info">Riyadh is live</Banner>);
    expect(screen.getByRole("status")).toHaveTextContent("Riyadh is live");
  });

  it("uses an assertive role for danger", () => {
    render(<Banner tone="danger">Maintenance tonight</Banner>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("dismisses via the close button", async () => {
    const onClose = vi.fn();
    render(
      <Banner tone="info" onClose={onClose}>
        Notice
      </Banner>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
