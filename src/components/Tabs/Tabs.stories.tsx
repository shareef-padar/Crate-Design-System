import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabList, Tab, TabPanel } from "./Tabs";
import { Text } from "../Text";

const meta: Meta = {
  title: "Components/Tabs",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={{ maxInlineSize: "34rem" }}>
      <Tabs defaultValue="overview">
        <TabList label="Warehouse details">
          <Tab value="overview">Overview</Tab>
          <Tab value="specs">Specifications</Tab>
          <Tab value="location">Location</Tab>
          <Tab value="archived" disabled>
            Archived
          </Tab>
        </TabList>
        <TabPanel value="overview">
          <Text color="secondary">
            Flexible dry storage in Al Quoz, Dubai. Move in within 48 hours, no yearly
            lock-in.
          </Text>
        </TabPanel>
        <TabPanel value="specs">
          <Text color="secondary">2,500 sqft · 6m clear height · 2 loading docks.</Text>
        </TabPanel>
        <TabPanel value="location">
          <Text color="secondary">Al Quoz Industrial Area 3, 10 min from Sheikh Zayed Road.</Text>
        </TabPanel>
      </Tabs>
    </div>
  ),
};
