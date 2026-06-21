import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem } from "./Accordion";

const meta: Meta = {
  title: "Components/Accordion",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

export const Single: Story = {
  render: () => (
    <div style={{ maxInlineSize: "36rem" }}>
      <Accordion defaultValue="a">
        <AccordionItem value="a" title="What storage types are available?">
          AC/dry, food-grade, cold storage, chemical/pharma, and open yard.
        </AccordionItem>
        <AccordionItem value="b" title="Can I rent short-term?">
          Yes — weekly, monthly, or yearly, with no lock-in.
        </AccordionItem>
        <AccordionItem value="c" title="How fast can I move in?">
          Move in within 48 hours of confirming.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div style={{ maxInlineSize: "36rem" }}>
      <Accordion type="multiple" defaultValue={["a", "b"]}>
        <AccordionItem value="a" title="Pricing">
          Transparent per-sqft pricing, no hidden fees.
        </AccordionItem>
        <AccordionItem value="b" title="Locations">
          Dubai, Sharjah, Abu Dhabi, Ajman, UAQ, and Riyadh.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
