import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Banner } from "./Banner";
import { Button } from "../Button";
import { Stack } from "../../primitives/Stack";

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof Banner>;

export const Tones: Story = {
  render: () => (
    <Stack gap={0}>
      <Banner tone="info">Cargoz now operates in Riyadh — 25+ warehouses available.</Banner>
      <Banner tone="success">Your enquiry was sent. We&rsquo;ll call you within 3 hours.</Banner>
      <Banner tone="warning">Prices update at the end of the month.</Banner>
      <Banner tone="danger">Scheduled maintenance tonight, 1–2 AM GST.</Banner>
    </Stack>
  ),
};

export const WithActionAndDismiss: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    if (!open) return <div style={{ padding: "1rem" }}>Dismissed.</div>;
    return (
      <Banner
        tone="info"
        action={
          <Button size="sm" variant="secondary">
            Learn more
          </Button>
        }
        onClose={() => setOpen(false)}
      >
        Cargoz now operates in Riyadh — 25+ warehouses available.
      </Banner>
    );
  },
};
