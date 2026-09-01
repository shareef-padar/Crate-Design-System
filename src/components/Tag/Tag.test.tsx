import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Tag } from "./Tag";

describe("Tag", () => {
  it("renders its content", () => {
    render(<Tag tone="neutral">Dubai</Tag>);
    expect(screen.getByText("Dubai")).toBeInTheDocument();
  });

  it("has no remove button when onRemove is omitted", () => {
    render(<Tag tone="neutral">Dubai</Tag>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls onRemove with an accessible label", async () => {
    const onRemove = vi.fn();
    render(
      <Tag tone="neutral" onRemove={onRemove} removeLabel="Remove Dubai filter">
        Dubai
      </Tag>,
    );
    const button = screen.getByRole("button", { name: "Remove Dubai filter" });
    await userEvent.click(button);
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Tag tone="accent" onRemove={() => {}} removeLabel="Remove Al Quoz filter">
        Al Quoz
      </Tag>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
