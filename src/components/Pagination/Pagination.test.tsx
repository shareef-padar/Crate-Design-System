import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("disables Previous on the first page", () => {
    render(<Pagination page={1} pageCount={10} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
  });

  it("calls onPageChange when a page is clicked", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={1} pageCount={10} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Page 2" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("marks the current page with aria-current", () => {
    render(<Pagination page={3} pageCount={10} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
