import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { SearchFilterBar } from "./SearchFilterBar";
import { FilterChip } from "../FilterChip";
import { StatusPill } from "../StatusPill";
import { EmptyState } from "../EmptyState";

describe("SearchFilterBar", () => {
  it("submits the entered values via onSearch", async () => {
    const onSearch = vi.fn();
    render(<SearchFilterBar onSearch={onSearch} />);
    await userEvent.type(
      screen.getByLabelText("Where do you need storage?"),
      "Dubai",
    );
    await userEvent.click(screen.getByRole("button", { name: /Search/ }));
    expect(onSearch).toHaveBeenCalledWith(
      expect.objectContaining({ location: "Dubai" }),
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SearchFilterBar onSearch={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("FilterChip", () => {
  it("reflects selected state via aria-pressed", () => {
    render(<FilterChip selected>Verified</FilterChip>);
    expect(screen.getByRole("button", { name: "Verified" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});

describe("StatusPill", () => {
  it("renders the default label for a status", () => {
    render(<StatusPill status="active" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });
});

describe("EmptyState", () => {
  it("renders a heading, description, and action", () => {
    render(
      <EmptyState title="No results" description="Try again" action={<button>Reset</button>} />,
    );
    expect(screen.getByRole("heading", { name: "No results" })).toBeInTheDocument();
    expect(screen.getByText("Try again")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });
});
