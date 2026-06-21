import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("links the trigger to the tooltip via aria-describedby", () => {
    render(
      <Tooltip content="Call the warehouse">
        <button type="button">Call</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "Call" });
    const tip = screen.getByRole("tooltip");
    expect(trigger.getAttribute("aria-describedby")).toBe(tip.id);
    expect(tip).toHaveTextContent("Call the warehouse");
  });
});
