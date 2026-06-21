import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ToastProvider, useToast } from "./Toast";
import { Button } from "../Button";

function Harness() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() => toast({ title: "Saved", message: "All good", duration: 0 })}
    >
      Notify
    </Button>
  );
}

describe("Toast", () => {
  it("shows a toast when triggered and dismisses it", async () => {
    render(
      <ToastProvider>
        <Harness />
      </ToastProvider>,
    );
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Notify" }));
    expect(screen.getByText("Saved")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
  });
});
