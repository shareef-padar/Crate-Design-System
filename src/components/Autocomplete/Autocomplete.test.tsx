import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Autocomplete } from "./Autocomplete";

const OPTIONS = [
  { value: "dxb", label: "Dubai" },
  { value: "shj", label: "Sharjah" },
];

describe("Autocomplete", () => {
  it("filters options as you type", async () => {
    render(<Autocomplete options={OPTIONS} onChange={() => {}} />);
    await userEvent.type(screen.getByRole("combobox"), "shar");
    expect(screen.getByRole("option", { name: "Sharjah" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Dubai" })).not.toBeInTheDocument();
  });

  it("selects an option with the keyboard", async () => {
    const onChange = vi.fn();
    render(<Autocomplete options={OPTIONS} onChange={onChange} />);
    const input = screen.getByRole("combobox");
    await userEvent.type(input, "shar");
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledWith("shj");
  });

  it("shows the empty message when nothing matches", async () => {
    render(<Autocomplete options={OPTIONS} onChange={() => {}} emptyText="No matches" />);
    await userEvent.type(screen.getByRole("combobox"), "xyz");
    expect(screen.getByText("No matches")).toBeInTheDocument();
  });
});
