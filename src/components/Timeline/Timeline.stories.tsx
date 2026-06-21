import type { Meta, StoryObj } from "@storybook/react";
import { Timeline, TimelineItem } from "./Timeline";

const meta: Meta = {
  title: "Components/Timeline",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

export const BookingHistory: Story = {
  render: () => (
    <div style={{ maxInlineSize: "28rem" }}>
      <Timeline>
        <TimelineItem title="Enquiry received" time="10:02" tone="success" description="We got your request." />
        <TimelineItem title="Team contacted you" time="12:30" tone="info" description="Called on WhatsApp." />
        <TimelineItem title="Site visit scheduled" time="Tomorrow" tone="warning" />
        <TimelineItem title="Booking confirmed" time="Pending" />
      </Timeline>
    </div>
  ),
};
