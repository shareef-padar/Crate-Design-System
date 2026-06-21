import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchFilterBar } from "./SearchFilterBar";
import { FilterChip } from "../FilterChip";
import { StatusPill } from "../StatusPill";
import { EmptyState } from "../EmptyState";
import { ListingCard } from "../ListingCard";
import { Button } from "../../components/Button";
import { Grid } from "../../primitives/Grid";
import { Stack } from "../../primitives/Stack";
import { Inline } from "../../primitives/Inline";
import { Heading } from "../../components/Heading";

const meta: Meta = {
  title: "Patterns/Search Screen",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

const FILTERS = ["Verified", "Insured", "AC / dry", "Cold storage", "Open yard"];

export const FullScreen: Story = {
  render: () => {
    const [active, setActive] = useState<string[]>(["Verified"]);
    const toggle = (f: string) =>
      setActive((a) => (a.includes(f) ? a.filter((x) => x !== f) : [...a, f]));
    return (
      <Stack gap={5}>
        <SearchFilterBar onSearch={() => {}} />
        <Inline gap={2}>
          {FILTERS.map((f) => (
            <FilterChip key={f} selected={active.includes(f)} onClick={() => toggle(f)}>
              {f}
            </FilterChip>
          ))}
        </Inline>
        <Grid min="18rem" gap={5}>
          <ListingCard
            title="Al Quoz Warehouse"
            location="Dubai"
            details="Dry storage · 2,500 sqft"
            price={{ amount: 18, currency: "AED", unit: "sqft", period: "month" }}
            status={{ label: "Available", tone: "success" }}
            rating={{ value: 4.9, countLabel: "120+" }}
            trust={["verified", "insured"]}
            onView={() => {}}
            phone="+971 50 123 4567"
            whatsapp="971501234567"
          />
          <ListingCard
            title="Industrial City Unit 4"
            location="Sharjah"
            details="Cold storage · 5,000 sqft"
            price={{ amount: 14, currency: "AED", unit: "sqft", period: "month" }}
            status={{ label: "Limited", tone: "warning" }}
            rating={{ value: 4.6, countLabel: "80+" }}
            trust={["verified"]}
            onView={() => {}}
            phone="+971 50 123 4567"
            whatsapp="971501234567"
          />
        </Grid>
      </Stack>
    );
  },
};

export const NoResults: Story = {
  render: () => (
    <Stack gap={5}>
      <SearchFilterBar onSearch={() => {}} />
      <EmptyState
        title="No warehouses match your search"
        description="Try widening your area or storage type — or talk to our team and we'll find one for you."
        action={<Button>Talk to our team</Button>}
      />
    </Stack>
  ),
};

export const BookingStatuses: Story = {
  render: () => (
    <Stack gap={3}>
      <Heading level={3} size="h5">
        StatusPill
      </Heading>
      <Inline gap={2}>
        <StatusPill status="pending" />
        <StatusPill status="confirmed" />
        <StatusPill status="active" />
        <StatusPill status="completed" />
        <StatusPill status="cancelled" />
      </Inline>
    </Stack>
  ),
};
