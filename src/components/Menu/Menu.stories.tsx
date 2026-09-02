import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ShareNetwork, WhatsappLogo, CheckCircle, EnvelopeSimple, ChatText } from "@phosphor-icons/react";
import { Menu, MenuItem, MenuDivider } from "./Menu";
import { IconButton } from "../IconButton";

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Menu>;

/** The "Share this listing" menu (Figma node 1645:15649). */
export const ShareListing: Story = {
  render: () => {
    const [copied, setCopied] = useState(false);
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", paddingBlockEnd: "16rem" }}>
        <Menu trigger={<IconButton icon={<ShareNetwork />} label="Share" />} align="end">
          <MenuItem
            icon={<WhatsappLogo weight="fill" />}
            iconTone="success"
            title="WhatsApp"
            description="Send to your team"
          />
          <MenuItem
            icon={<CheckCircle weight="fill" />}
            iconTone="success"
            title={copied ? "Link copied" : "Copy link"}
            description="cargoz.com/w/al-quoz-chiller"
            onClick={() => setCopied(true)}
          />
          <MenuItem
            icon={<EnvelopeSimple weight="fill" />}
            iconTone="info"
            title="Email"
            description="Forward with subject and note"
          />
          <MenuDivider />
          <MenuItem
            icon={<ChatText weight="fill" />}
            iconTone="accent"
            title="Ask Cargoz about this"
            description="Chat to the team on WhatsApp"
          />
        </Menu>
      </div>
    );
  },
};
