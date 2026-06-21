import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";

// jsdom doesn't implement the native dialog methods — stub them so the effect runs.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
    this.dispatchEvent(new Event("close"));
  };
});

describe("Modal", () => {
  it("renders the title via aria-labelledby when open", () => {
    render(
      <Modal open onClose={() => {}} title="Request a callback">
        Body
      </Modal>,
    );
    expect(screen.getByRole("dialog", { name: "Request a callback" })).toBeInTheDocument();
  });

  it("calls onClose from the close button", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Dialog">
        Body
      </Modal>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalled();
  });
});
