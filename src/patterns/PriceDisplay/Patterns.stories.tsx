import type { Meta, StoryObj } from "@storybook/react";
import { PriceDisplay } from "./PriceDisplay";
import { RatingStars } from "../RatingStars";
import { TrustBadge } from "../TrustBadge";
import { ContactCTA } from "../ContactCTA";
import { Stack } from "../../primitives/Stack";
import { Inline } from "../../primitives/Inline";
import { Heading } from "../../components/Heading";

const meta: Meta = {
  title: "Patterns/Building Blocks",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Stack gap={3} style={{ marginBlockEnd: "2rem" }}>
    <Heading level={3} size="h5">
      {title}
    </Heading>
    {children}
  </Stack>
);

export const All: Story = {
  render: () => (
    <Stack gap={2} style={{ maxInlineSize: "28rem" }}>
      <Section title="PriceDisplay">
        <Inline gap={6}>
          <PriceDisplay amount={18} currency="AED" unit="sqft" period="month" />
          <PriceDisplay amount={22} currency="SAR" unit="sqft" period="month" size="lg" />
        </Inline>
      </Section>
      <Section title="RatingStars">
        <Stack gap={2}>
          <RatingStars value={4.9} countLabel="2,000+" />
          <RatingStars value={3.5} count={42} />
          <RatingStars value={5} showValue={false} />
        </Stack>
      </Section>
      <Section title="TrustBadge">
        <Inline gap={2}>
          <TrustBadge type="verified" />
          <TrustBadge type="insured" />
          <TrustBadge type="topRated" />
        </Inline>
      </Section>
      <Section title="ContactCTA">
        <ContactCTA phone="+971 50 123 4567" whatsapp="971501234567" />
      </Section>
    </Stack>
  ),
};
