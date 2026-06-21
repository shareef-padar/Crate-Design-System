import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Find warehouse</Button>);
    expect(screen.getByRole("button", { name: "Find warehouse" })).toBeInTheDocument();
  });

  it("defaults to type=button (won't submit forms unexpectedly)", () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("calls onClick when activated", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled and busy while loading", () => {
    render(<Button loading>Saving</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Find warehouse</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
