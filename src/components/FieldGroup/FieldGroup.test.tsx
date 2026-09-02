import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FieldGroup } from "./FieldGroup";

describe("FieldGroup", () => {
  it("renders its children", () => {
    render(
      <FieldGroup>
        <div>First</div>
        <div>Second</div>
      </FieldGroup>,
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });
});
