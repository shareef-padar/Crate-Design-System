import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { NestedSelect, type NestedSelectOption } from "./NestedSelect";

const OPTIONS: NestedSelectOption[] = [
  { value: "dubai", label: "Dubai" },
  {
    value: "sharjah",
    label: "Sharjah",
    children: [
      { value: "al-sajja", label: "Al Sajja" },
      { value: "sharjah-industrial-area", label: "Sharjah Industrial Area" },
    ],
  },
];

describe("NestedSelect", () => {
  it("shows the allLabel on the trigger when nothing is selected", () => {
    render(
      <NestedSelect options={OPTIONS} value={[]} onChange={() => {}} allLabel="Any Location" />,
    );
    expect(screen.getByRole("button", { name: "Any Location" })).toBeInTheDocument();
  });

  it("opens the panel and lists root options", async () => {
    render(
      <NestedSelect options={OPTIONS} value={[]} onChange={() => {}} allLabel="Any Location" />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Any Location" }));
    expect(screen.getByRole("checkbox", { name: "Dubai" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Sharjah" })).toBeInTheDocument();
  });

  it("toggles a leaf value directly", async () => {
    const onChange = vi.fn();
    render(
      <NestedSelect options={OPTIONS} value={[]} onChange={onChange} allLabel="Any Location" />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Any Location" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "Dubai" }));
    expect(onChange).toHaveBeenCalledWith(["dubai"]);
  });

  it("toggling a group's checkbox selects all of its leaves", async () => {
    const onChange = vi.fn();
    render(
      <NestedSelect options={OPTIONS} value={[]} onChange={onChange} allLabel="Any Location" />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Any Location" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "Sharjah" }));
    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining(["al-sajja", "sharjah-industrial-area"]),
    );
  });

  it("shows an indeterminate group checkbox when only some children are selected", async () => {
    render(
      <NestedSelect
        options={OPTIONS}
        value={["al-sajja"]}
        onChange={() => {}}
        allLabel="Any Location"
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /selected/ }));
    const groupCheckbox = screen.getByRole("checkbox", { name: "Sharjah" }) as HTMLInputElement;
    expect(groupCheckbox.indeterminate).toBe(true);
    expect(groupCheckbox.checked).toBe(false);
  });

  it("drills into a group and shows a back button with its children", async () => {
    render(
      <NestedSelect options={OPTIONS} value={[]} onChange={() => {}} allLabel="Any Location" />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Any Location" }));
    await userEvent.click(screen.getByRole("button", { name: /Sharjah/ }));
    expect(screen.getByRole("button", { name: /Sharjah/ })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Al Sajja" })).toBeInTheDocument();
  });

  it("selects all leaves in the current level via the header action", async () => {
    const onChange = vi.fn();
    render(
      <NestedSelect options={OPTIONS} value={[]} onChange={onChange} allLabel="Any Location" />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Any Location" }));
    await userEvent.click(screen.getByRole("button", { name: /^Sharjah$/ }));
    await userEvent.click(screen.getByRole("button", { name: "Select all" }));
    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining(["al-sajja", "sharjah-industrial-area"]),
    );
  });

  it("resetting via the allLabel row clears the selection", async () => {
    const onChange = vi.fn();
    render(
      <NestedSelect
        options={OPTIONS}
        value={["dubai"]}
        onChange={onChange}
        allLabel="Any Location"
      />,
    );
    // A single leaf exactly matching one option shows that option's own label.
    await userEvent.click(screen.getByRole("button", { name: "Dubai" }));
    await userEvent.click(screen.getByRole("button", { name: "Any Location" }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <NestedSelect
        options={OPTIONS}
        value={[]}
        onChange={() => {}}
        allLabel="Any Location"
        label="Location"
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
