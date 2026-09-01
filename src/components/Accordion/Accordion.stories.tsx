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

/**
 * The other indicator style from the Cargoz FAQ section (Figma node
 * 1041:16753) — a +/− glyph swap instead of a rotating chevron. Same
 * Accordion/AccordionItem, just `icon="plus-minus"`.
 */
export const PlusMinus: Story = {
  render: () => (
    <div style={{ maxInlineSize: "36rem" }}>
      <Accordion icon="plus-minus" defaultValue="a">
        <AccordionItem value="a" title="What's the minimum booking size?">
          For Fixed Area, from 50 sqft. For Lockable Units, from 100 sqft. For
          Customised Storage with handling, minimums vary by warehouse,
          typically 500 to 2,000 sqft.
        </AccordionItem>
        <AccordionItem value="b" title="How does pricing work?">
          Transparent per-sqft pricing, no hidden fees.
        </AccordionItem>
        <AccordionItem value="c" title="How quickly can I move in?">
          Move in within 48 hours of confirming.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
