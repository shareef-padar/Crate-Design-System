import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { FormField } from "../FormField";
import { Input } from "../Input";
import { Stack } from "../../primitives/Stack";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const EnquiryDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Request a callback</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Request a callback"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Send request</Button>
            </>
          }
        >
          <Stack gap={4}>
            <p style={{ margin: 0 }}>
              Leave your number and our team will call you within 3 hours.
            </p>
            <FormField label="Phone number" required>
              <Input type="tel" placeholder="+971 5X XXX XXXX" />
            </FormField>
          </Stack>
        </Modal>
      </>
    );
  },
};
