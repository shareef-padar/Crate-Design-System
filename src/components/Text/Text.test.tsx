import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Text } from "./Text";
import { Heading } from "../Heading";

describe("Text & Heading", () => {
  it("renders body text", () => {
    render(<Text>Move in within 48 hours</Text>);
    expect(screen.getByText("Move in within 48 hours")).toBeInTheDocument();
  });

  it("renders the requested heading level", () => {
    render(<Heading level={1}>Find warehouse in Dubai</Heading>);
    expect(
      screen.getByRole("heading", { level: 1, name: "Find warehouse in Dubai" }),
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <main>
        <Heading level={1}>Find warehouse in Dubai</Heading>
        <Text>Flexible storage with no yearly lock-ins.</Text>
      </main>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
