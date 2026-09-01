import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionItem } from "./Accordion";

describe("Accordion", () => {
  it("toggles a panel open and closed", async () => {
    render(
      <Accordion>
        <AccordionItem value="a" title="Question">
          Answer text
        </AccordionItem>
      </Accordion>,
    );
    const trigger = screen.getByRole("button", { name: "Question" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Answer text")).toBeInTheDocument();
  });

  it("in single mode, opening one closes the other", async () => {
    render(
      <Accordion defaultValue="a">
        <AccordionItem value="a" title="First">
          A
        </AccordionItem>
        <AccordionItem value="b" title="Second">
          B
        </AccordionItem>
      </Accordion>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Second" }));
    expect(screen.getByRole("button", { name: "First" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("supports the plus-minus indicator and still toggles correctly", async () => {
    render(
      <Accordion icon="plus-minus">
        <AccordionItem value="a" title="Question">
          Answer text
        </AccordionItem>
      </Accordion>,
    );
    const trigger = screen.getByRole("button", { name: "Question" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Answer text")).toBeInTheDocument();
  });
});
