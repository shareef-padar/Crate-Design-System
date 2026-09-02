import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { ComparisonCard, type ComparisonSection } from "./ComparisonCard";

const SECTIONS: ComparisonSection[] = [
  {
    label: "Handling Services",
    badge: { label: "Optional" },
    rows: [
      { label: "Palletized In and Out", value: "AED 10/CBM" },
      { label: "Loose In & Out", value: "N/A", muted: true },
    ],
  },
  {
    label: "Trust & Compliance",
    rows: [
      { label: "Water Sprinkler", state: "yes" },
      { label: "Fire Alarm", state: "partial" },
    ],
  },
];

describe("ComparisonCard", () => {
  it("renders the title and every section label", () => {
    render(<ComparisonCard title="WH-01" sections={SECTIONS} />);
    expect(screen.getByText("WH-01")).toBeInTheDocument();
    expect(screen.getByText("Handling Services")).toBeInTheDocument();
    expect(screen.getByText("Trust & Compliance")).toBeInTheDocument();
  });

  it("renders text-value rows", () => {
    render(<ComparisonCard title="WH-01" sections={SECTIONS} />);
    expect(screen.getByText("Palletized In and Out")).toBeInTheDocument();
    expect(screen.getByText("AED 10/CBM")).toBeInTheDocument();
  });

  it("renders a badge on a section", () => {
    render(<ComparisonCard title="WH-01" sections={SECTIONS} />);
    expect(screen.getByText("Optional")).toBeInTheDocument();
  });

  it("renders a state icon for boolean rows with a descriptive label", () => {
    render(<ComparisonCard title="WH-01" sections={SECTIONS} />);
    expect(screen.getByRole("img", { name: "Included" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Partially included" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ComparisonCard title="WH-01" sections={SECTIONS} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
