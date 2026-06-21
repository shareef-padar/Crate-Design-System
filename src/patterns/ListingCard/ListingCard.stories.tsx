import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ListingCard } from "./ListingCard";
import { Stack } from "../../primitives/Stack";
import { Grid } from "../../primitives/Grid";

const meta: Meta<typeof ListingCard> = {
  title: "Patterns/ListingCard",
  component: ListingCard,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof ListingCard>;

const WAREHOUSE_IMG =
  "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=640&q=70";
const WAREHOUSE_IMG_2 =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=640&q=70";

const rows = [
  {
    moveIn: { label: "24hr move-in", speed: "fast" as const },
    images: [WAREHOUSE_IMG, WAREHOUSE_IMG_2],
  },
  {
    moveIn: { label: "3-5 day move-in", speed: "standard" as const },
    images: [WAREHOUSE_IMG_2],
  },
  {
    moveIn: { label: "24hr move-in", speed: "fast" as const },
    images: [WAREHOUSE_IMG],
  },
];

export const ResultsList: Story = {
  name: "Search results (row)",
  render: () => {
    const [saved, setSaved] = useState<Set<number>>(new Set([0]));
    const toggle = (i: number) =>
      setSaved((prev) => {
        const next = new Set(prev);
        next.has(i) ? next.delete(i) : next.add(i);
        return next;
      });
    return (
      <Stack gap={4} style={{ maxInlineSize: "60rem", containerType: "inline-size" }}>
        {rows.map((r, i) => (
          <ListingCard
            key={i}
            layout="row"
            title="WH-9304"
            imageAlt="Warehouse interior"
            images={r.images}
            moveIn={r.moveIn}
            rating={{ value: 5.0, countLabel: "231" }}
            features={["AC", "Pallet Storage", "1,200 sqft"]}
            price={{ amount: 9.6, currency: "AED", unit: "sqft", period: "month" }}
            total="AED 357 for 1 month"
            favorite={saved.has(i)}
            onFavoriteToggle={() => toggle(i)}
            onCompare={() => {}}
            onView={() => {}}
          />
        ))}
      </Stack>
    );
  },
};

export const Single: Story = {
  name: "Grid card (stack)",
  render: () => (
    <div style={{ maxInlineSize: "22rem" }}>
      <ListingCard
        title="Al Quoz Warehouse"
        location="Dubai"
        details="Dry storage · 2,500 sqft"
        image={WAREHOUSE_IMG}
        imageAlt="Warehouse"
        moveIn={{ label: "24hr move-in", speed: "fast" }}
        price={{ amount: 18, currency: "AED", unit: "sqft", period: "month" }}
        status={{ label: "Available", tone: "success" }}
        rating={{ value: 4.9, countLabel: "120+" }}
        trust={["verified", "insured"]}
        onView={() => {}}
        phone="+971 50 123 4567"
        whatsapp="971501234567"
      />
    </div>
  ),
};

const listings = [
  {
    title: "Al Quoz Warehouse",
    location: "Dubai",
    details: "Dry storage · 2,500 sqft",
    price: { amount: 18, currency: "AED" as const, unit: "sqft", period: "month" },
    status: { label: "Available", tone: "success" as const },
    rating: { value: 4.9, countLabel: "120+" },
    trust: ["verified", "insured"] as const,
  },
  {
    title: "Industrial City Unit 4",
    location: "Sharjah",
    details: "Cold storage · 5,000 sqft",
    price: { amount: 14, currency: "AED" as const, unit: "sqft", period: "month" },
    status: { label: "Limited", tone: "warning" as const },
    rating: { value: 4.6, countLabel: "80+" },
    trust: ["verified"] as const,
  },
  {
    title: "Riyadh Logistics Hub",
    location: "Riyadh",
    details: "Food-grade · 8,000 sqft",
    price: { amount: 22, currency: "SAR" as const, unit: "sqft", period: "month" },
    status: { label: "Full", tone: "danger" as const },
    rating: { value: 5.0, countLabel: "40+" },
    trust: ["verified", "insured"] as const,
  },
];

export const ResultsGrid: Story = {
  render: () => (
    <Grid min="18rem" gap={5}>
      {listings.map((l) => (
        <ListingCard
          key={l.title}
          {...l}
          trust={[...l.trust]}
          onView={() => {}}
          phone="+971 50 123 4567"
          whatsapp="971501234567"
        />
      ))}
    </Grid>
  ),
};
