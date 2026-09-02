import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Menu, MenuItem, MenuDivider } from "./Menu";

function Example({ onPick }: { onPick?: () => void } = {}) {
  return (
    <Menu trigger={<button type="button">Share</button>}>
      <MenuItem icon={<svg />} title="WhatsApp" description="Send to your team" onClick={onPick} />
      <MenuItem icon={<svg />} title="Email" description="Forward with subject and note" />
      <MenuDivider />
      <MenuItem icon={<svg />} title="Ask Cargoz about this" />
    </Menu>
  );
}

describe("Menu", () => {
  it("is closed by default", () => {
    render(<Example />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens on trigger click and shows items", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Share" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /WhatsApp/ })).toBeInTheDocument();
  });

  it("closes when an item is picked, and calls its onClick", async () => {
    const onPick = vi.fn();
    render(<Example onPick={onPick} />);
    await userEvent.click(screen.getByRole("button", { name: "Share" }));
    await userEvent.click(screen.getByRole("menuitem", { name: /WhatsApp/ }));
    expect(onPick).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on outside click", async () => {
    render(
      <div>
        <Example />
        <button type="button">Elsewhere</button>
      </div>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Share" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Elsewhere" }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Share" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("sets aria-expanded on the trigger", async () => {
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Share" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("has no accessibility violations when open", async () => {
    const { container } = render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Share" }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
