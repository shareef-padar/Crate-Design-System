import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs, TabList, Tab, TabPanel } from "./Tabs";

function Example() {
  return (
    <Tabs defaultValue="a">
      <TabList label="Sections">
        <Tab value="a">One</Tab>
        <Tab value="b">Two</Tab>
      </TabList>
      <TabPanel value="a">Panel A</TabPanel>
      <TabPanel value="b">Panel B</TabPanel>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("shows the default panel and marks its tab selected", () => {
    render(<Example />);
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("Panel A")).toBeInTheDocument();
    expect(screen.queryByText("Panel B")).not.toBeInTheDocument();
  });

  it("switches panels on click", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("tab", { name: "Two" }));
    expect(screen.getByText("Panel B")).toBeInTheDocument();
    expect(screen.queryByText("Panel A")).not.toBeInTheDocument();
  });

  it("moves selection with the arrow keys", async () => {
    render(<Example />);
    const first = screen.getByRole("tab", { name: "One" });
    first.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});
