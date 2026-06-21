import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Timeline, TimelineItem } from "./Timeline";

describe("Timeline", () => {
  it("renders items with title and time", () => {
    render(
      <Timeline>
        <TimelineItem title="Enquiry received" time="10:02" />
      </Timeline>,
    );
    expect(screen.getByText("Enquiry received")).toBeInTheDocument();
    expect(screen.getByText("10:02")).toBeInTheDocument();
  });

  it("renders as an ordered list", () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="A" />
      </Timeline>,
    );
    expect(container.querySelector("ol")).toBeInTheDocument();
  });
});
