import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "./Toast";
import { Button } from "../Button";
import { Inline } from "../../primitives/Inline";

const meta: Meta = {
  title: "Components/Toast",
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

function Demo() {
  const { toast } = useToast();
  return (
    <Inline gap={3}>
      <Button
        onClick={() =>
          toast({ tone: "success", title: "Enquiry sent", message: "We'll call you within 3 hours." })
        }
      >
        Success toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({ tone: "danger", title: "Something went wrong", message: "Please try again." })
        }
      >
        Error toast
      </Button>
    </Inline>
  );
}

export const Triggers: Story = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};
