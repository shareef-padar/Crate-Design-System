import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Breadcrumbs } from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  it("marks the last item as the current page", () => {
    render(
      <Breadcrumbs items={[{ label: "Home", href: "#" }, { label: "Listing" }]} />,
    );
    expect(screen.getByText("Listing")).toHaveAttribute("aria-current", "page");
  });

  it("renders earlier items as links", () => {
    render(
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Listing" }]} />,
    );
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Breadcrumbs items={[{ label: "Home", href: "#" }, { label: "Listing" }]} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
