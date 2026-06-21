import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Link } from "./Link";

describe("Link", () => {
  it("renders an anchor with its href", () => {
    render(<Link href="/warehouses">View all</Link>);
    const link = screen.getByRole("link", { name: "View all" });
    expect(link).toHaveAttribute("href", "/warehouses");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <p>
        Read our <Link href="/pricing">pricing guide</Link>.
      </p>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
