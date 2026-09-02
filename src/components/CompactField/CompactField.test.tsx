import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { CompactSelectField, CompactInputField } from "./CompactField";
import { FieldGroup } from "../FieldGroup";

describe("CompactSelectField", () => {
  it("is a labeled, selectable dropdown", async () => {
    const onChange = vi.fn();
    render(
      <CompactSelectField label="Period" defaultValue="2" onChange={onChange}>
        <option value="1">1 month</option>
        <option value="2">2 months</option>
      </CompactSelectField>,
    );
    const select = screen.getByLabelText("Period");
    expect(select).toHaveValue("2");
    await userEvent.selectOptions(select, "1");
    expect(onChange).toHaveBeenCalled();
  });
});

describe("CompactInputField", () => {
  it("is a labeled, editable input", async () => {
    const onChange = vi.fn();
    render(
      <CompactInputField label="Size (sqft)" type="number" defaultValue={2000} onChange={onChange} />,
    );
    const input = screen.getByLabelText("Size (sqft)");
    expect(input).toHaveValue(2000);
    await userEvent.type(input, "5");
    expect(onChange).toHaveBeenCalled();
  });
});

describe("CompactField in a FieldGroup", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <FieldGroup>
        <CompactSelectField label="Period" defaultValue="2">
          <option value="1">1 month</option>
          <option value="2">2 months</option>
        </CompactSelectField>
        <CompactInputField label="Size (sqft)" type="number" defaultValue={2000} />
      </FieldGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
