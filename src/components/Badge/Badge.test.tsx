import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its content", () => {
    render(<Badge tone="success">Available</Badge>);
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Badge tone="warning" dot>
        Limited
      </Badge>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders a leading icon and hides it from assistive tech", () => {
    render(
      <Badge tone="info" icon={<svg data-testid="icon" />}>
        Pending
      </Badge>,
    );
    const icon = screen.getByTestId("icon");
    expect(icon.closest("[aria-hidden]")).toBeInTheDocument();
  });
});
