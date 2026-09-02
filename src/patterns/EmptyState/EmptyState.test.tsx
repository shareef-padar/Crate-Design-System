import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(<EmptyState title="No results" description="Try a different search" />);
    expect(screen.getByText("No results")).toBeInTheDocument();
    expect(screen.getByText("Try a different search")).toBeInTheDocument();
  });

  it("renders an action when given", () => {
    render(<EmptyState title="No results" action={<button type="button">Retry</button>} />);
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("accepts a tone for the icon circle", () => {
    const { container } = render(<EmptyState title="Failed" tone="danger" />);
    expect(container.querySelector('[class*="danger"]')).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <EmptyState title="No results" description="Try a different search" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
