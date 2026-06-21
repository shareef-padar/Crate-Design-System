import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Alert } from "./Alert";
import { Skeleton } from "../Skeleton";
import { Card } from "../Card";
import { Stack } from "../../primitives/Stack";
import { Inline } from "../../primitives/Inline";

const meta: Meta = {
  title: "Components/Alert & Skeleton",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

export const AlertTones: Story = {
  render: () => (
    <Stack gap={3} style={{ maxInlineSize: "32rem" }}>
      <Alert tone="info" title="Move-in within 48 hours">
        Most listings are ready for immediate occupancy across the UAE.
      </Alert>
      <Alert tone="success" title="Enquiry sent">
        Our team will contact you within 3 hours.
      </Alert>
      <Alert tone="warning" title="Limited availability">
        Only 2 units left at this rate.
      </Alert>
      <Alert tone="danger" title="Booking failed">
        We couldn&rsquo;t process your request. Please try again.
      </Alert>
    </Stack>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return open ? (
      <Alert tone="info" title="Heads up" onClose={() => setOpen(false)}>
        You can dismiss this message.
      </Alert>
    ) : (
      <Alert tone="success">Dismissed — re-run the story to reset.</Alert>
    );
  },
};

export const SkeletonLoading: Story = {
  render: () => (
    <Card style={{ maxInlineSize: "22rem" }}>
      <Stack gap={3}>
        <Skeleton variant="rect" height="9rem" />
        <Inline gap={3} align="center" wrap={false}>
          <Skeleton variant="circle" />
          <Stack gap={1} style={{ flex: 1 }}>
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="40%" />
          </Stack>
        </Inline>
      </Stack>
    </Card>
  ),
};
