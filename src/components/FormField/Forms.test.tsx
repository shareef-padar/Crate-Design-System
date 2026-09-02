import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { FormField } from "./FormField";
import { Input, InputSelect } from "../Input";
import { Checkbox } from "../Checkbox";
import { Switch } from "../Switch";

describe("FormField wiring", () => {
  it("associates the label with the control", () => {
    render(
      <FormField label="Where do you need storage?">
        <Input />
      </FormField>,
    );
    expect(
      screen.getByLabelText("Where do you need storage?"),
    ).toBeInTheDocument();
  });

  it("links helper text via aria-describedby", () => {
    render(
      <FormField label="City" helper="City or area">
        <Input />
      </FormField>,
    );
    const input = screen.getByLabelText("City");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy as string)).toHaveTextContent(
      "City or area",
    );
  });

  it("marks the field invalid and shows the error when error is set", () => {
    render(
      <FormField label="Email" error="Enter a valid email">
        <Input />
      </FormField>,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <FormField label="Company name" required helper="Your business">
        <Input />
      </FormField>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Input adornments", () => {
  it("renders prefix and suffix around the input", () => {
    render(
      <FormField label="Monthly rent">
        <Input prefix="AED" suffix="/ month" />
      </FormField>,
    );
    expect(screen.getByText("AED")).toBeInTheDocument();
    expect(screen.getByText("/ month")).toBeInTheDocument();
    expect(screen.getByLabelText("Monthly rent")).toBeInTheDocument();
  });

  it("keeps the input accessible by its label when adorned", () => {
    render(
      <FormField label="Phone number">
        <Input type="tel" prefix="+971" />
      </FormField>,
    );
    expect(screen.getByLabelText("Phone number")).toHaveAttribute("type", "tel");
  });

  it("propagates invalid state to the adornment group", () => {
    const { container } = render(
      <FormField label="Amount" error="Required">
        <Input prefix="AED" />
      </FormField>,
    );
    const input = screen.getByLabelText("Amount");
    expect(input).toHaveAttribute("aria-invalid", "true");
    // the wrapping group carries the invalid styling hook
    expect(container.querySelector('[class*="invalid"]')).toBeInTheDocument();
  });

  it("has no accessibility violations with adornments", async () => {
    const { container } = render(
      <FormField label="Monthly rent" helper="Per month">
        <Input prefix="AED" suffix="/ month" />
      </FormField>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("shows a success checkmark suffix when valid", () => {
    const { container } = render(
      <FormField label="Your Name">
        <Input defaultValue="John Jacobs" valid />
      </FormField>,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(screen.getByLabelText("Your Name")).toHaveValue("John Jacobs");
  });

  it("lets an explicit suffix win over valid", () => {
    render(
      <FormField label="Your Name">
        <Input defaultValue="John Jacobs" valid suffix="custom" />
      </FormField>,
    );
    expect(screen.getByText("custom")).toBeInTheDocument();
  });
});

describe("Input dropdown adornments", () => {
  it("renders a selectable dropdown prefix alongside the input", async () => {
    const onChange = vi.fn();
    render(
      <FormField label="Phone number">
        <Input
          type="tel"
          prefix={
            <InputSelect aria-label="Country code" defaultValue="971" onChange={onChange}>
              <option value="971">+971</option>
              <option value="966">+966</option>
            </InputSelect>
          }
        />
      </FormField>,
    );
    const code = screen.getByRole("combobox", { name: "Country code" });
    expect(code).toHaveValue("971");
    expect(screen.getByLabelText("Phone number")).toHaveAttribute("type", "tel");
    await userEvent.selectOptions(code, "966");
    expect(onChange).toHaveBeenCalled();
    expect(code).toHaveValue("966");
  });

  it("has no accessibility violations with a dropdown adornment", async () => {
    const { container } = render(
      <FormField label="Price">
        <Input
          type="number"
          suffix={
            <InputSelect aria-label="Currency" defaultValue="AED">
              <option value="AED">AED</option>
              <option value="SAR">SAR</option>
            </InputSelect>
          }
        />
      </FormField>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Checkbox & Switch", () => {
  it("toggles a checkbox via its label", async () => {
    render(<Checkbox label="24/7 access" />);
    const box = screen.getByRole("checkbox", { name: "24/7 access" });
    expect(box).not.toBeChecked();
    await userEvent.click(screen.getByText("24/7 access"));
    expect(box).toBeChecked();
  });

  it("exposes the switch with role=switch", () => {
    render(<Switch label="Notify me" />);
    expect(screen.getByRole("switch", { name: "Notify me" })).toBeInTheDocument();
  });
});
