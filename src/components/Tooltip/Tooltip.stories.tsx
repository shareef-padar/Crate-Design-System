import type { Meta, StoryObj } from "@storybook/react";
import { Phone } from "@phosphor-icons/react";
import { Tooltip } from "./Tooltip";
import { IconButton } from "../IconButton";
import { Button } from "../Button";
import { Inline } from "../../primitives/Inline";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const OnIconButton: Story = {
  render: () => (
    <Inline gap={4}>
      <Tooltip content="Call the warehouse">
        <IconButton icon={<Phone />} variant="secondary" />
      </Tooltip>
      <Tooltip content="Opens WhatsApp chat" placement="bottom">
        <Button variant="ghost">WhatsApp</Button>
      </Tooltip>
    </Inline>
  ),
};
