import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("exposes its value via role=progressbar", () => {
    render(<ProgressBar value={40} label="Loading" />);
    expect(screen.getByRole("progressbar", { name: "Loading" })).toHaveAttribute(
      "aria-valuenow",
      "40",
    );
  });

  it("omits aria-valuenow when indeterminate", () => {
    render(<ProgressBar label="Loading" />);
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow");
  });
});
