import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { PriceDisplay } from "./PriceDisplay";
import { RatingStars } from "../RatingStars";
import { ContactCTA } from "../ContactCTA";
import { ListingCard } from "../ListingCard";

describe("PriceDisplay", () => {
  it("formats the currency and shows unit + period", () => {
    render(<PriceDisplay amount={18} currency="AED" unit="sqft" period="month" />);
    expect(screen.getByText(/AED\s?18/)).toBeInTheDocument();
    expect(screen.getByText("/ sqft")).toBeInTheDocument();
    expect(screen.getByText("per month")).toBeInTheDocument();
  });
});

describe("RatingStars", () => {
  it("exposes an accessible label with value and reviews", () => {
    render(<RatingStars value={4.9} countLabel="2,000+" />);
    expect(
      screen.getByRole("img", { name: "Rated 4.9 out of 5, 2,000+ reviews" }),
    ).toBeInTheDocument();
  });

  it("becomes an interactive radiogroup when onChange is given", async () => {
    const onChange = vi.fn();
    render(<RatingStars value={0} onChange={onChange} />);
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("radio", { name: "4 stars" }));
    expect(onChange).toHaveBeenCalledWith(4);
  });
});

describe("ContactCTA", () => {
  it("renders tel: and wa.me links with labels", () => {
    render(<ContactCTA phone="+971 50 123 4567" whatsapp="971501234567" />);
    expect(screen.getByRole("link", { name: /Call now/ })).toHaveAttribute(
      "href",
      "tel:+971501234567",
    );
    expect(screen.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute(
      "href",
      "https://wa.me/971501234567",
    );
  });
});

describe("ListingCard", () => {
  it("renders the listing with title, price, and view action", () => {
    render(
      <ListingCard
        title="Al Quoz Warehouse"
        location="Dubai"
        details="Dry storage · 2,500 sqft"
        price={{ amount: 18, currency: "AED", unit: "sqft", period: "month" }}
        status={{ label: "Available", tone: "success" }}
        trust={["verified"]}
        onView={() => {}}
        phone="+971 50 123 4567"
      />,
    );
    expect(
      screen.getByRole("heading", { name: "Al Quoz Warehouse" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "View" })).toBeInTheDocument();
    expect(screen.getByText(/AED\s?18/)).toBeInTheDocument();
  });

  it("renders the row layout with move-in, features, favorite and compare", async () => {
    const onFav = vi.fn();
    const onCompare = vi.fn();
    render(
      <ListingCard
        layout="row"
        title="WH-9304"
        image="/wh.jpg"
        imageAlt="Warehouse"
        moveIn={{ label: "24hr move-in", speed: "fast" }}
        rating={{ value: 5.0, countLabel: "231" }}
        features={["AC", "Pallet Storage", "1,200 sqft"]}
        price={{ amount: 9.6, currency: "AED", unit: "sqft", period: "month" }}
        total="AED 357 for 1 month"
        favorite={false}
        onFavoriteToggle={onFav}
        onCompare={onCompare}
        onView={() => {}}
      />,
    );
    expect(screen.getByText("24hr move-in")).toBeInTheDocument();
    expect(screen.getByText("Pallet Storage")).toBeInTheDocument();
    expect(screen.getByText(/AED\s?9\.60/)).toBeInTheDocument();
    expect(screen.getByText("AED 357 for 1 month")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Save listing" }));
    expect(onFav).toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: "Compare" }));
    expect(onCompare).toHaveBeenCalled();
  });

  it("shows carousel arrows only when multiple images are given", () => {
    const { rerender } = render(
      <ListingCard
        layout="row"
        title="WH-9304"
        image="/a.jpg"
        price={{ amount: 10, currency: "AED" }}
      />,
    );
    expect(screen.queryByRole("button", { name: "Next image" })).not.toBeInTheDocument();

    rerender(
      <ListingCard
        layout="row"
        title="WH-9304"
        images={["/a.jpg", "/b.jpg"]}
        price={{ amount: 10, currency: "AED" }}
      />,
    );
    expect(screen.getByRole("button", { name: "Next image" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous image" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ListingCard
        title="Al Quoz Warehouse"
        location="Dubai"
        price={{ amount: 18, currency: "AED", unit: "sqft", period: "month" }}
        status={{ label: "Available", tone: "success" }}
        rating={{ value: 4.9, countLabel: "120+" }}
        trust={["verified", "insured"]}
        onView={() => {}}
        phone="+971 50 123 4567"
        whatsapp="971501234567"
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
