import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { StatusIcon } from "./StatusIcon";

describe("StatusIcon", () => {
  it("renders the given icon", () => {
    const { container } = render(<StatusIcon icon={<svg data-testid="icon" />} />);
    expect(container.querySelector('[data-testid="icon"]')).toBeInTheDocument();
  });

  it("is decorative (hidden from assistive tech)", () => {
    const { container } = render(<StatusIcon icon={<svg />} tone="danger" />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<StatusIcon icon={<svg />} tone="success" size="lg" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
