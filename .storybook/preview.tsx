import type { Preview, Decorator } from "@storybook/react";
import {
  ThemeProvider,
  type Theme,
  type Direction,
  type Density,
} from "../src/theme";
import "../src/styles/global.css";

/** Wraps every story in the ThemeProvider, driven by the toolbar globals. */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as Theme;
  const dir = context.globals.direction as Direction;
  const density = context.globals.density as Density;
  return (
    // key remounts the provider so the toolbar selection re-seeds it.
    <ThemeProvider
      key={`${theme}-${dir}-${density}`}
      defaultTheme={theme}
      defaultDir={dir}
      defaultDensity={density}
    >
      <div style={{ padding: "1.5rem" }}>
        <Story />
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Color theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
    direction: {
      description: "Text direction",
      defaultValue: "ltr",
      toolbar: {
        title: "Direction",
        icon: "transfer",
        items: [
          { value: "ltr", title: "LTR (English)" },
          { value: "rtl", title: "RTL (Arabic)" },
        ],
        dynamicTitle: true,
      },
    },
    density: {
      description: "UI density",
      defaultValue: "comfortable",
      toolbar: {
        title: "Density",
        icon: "grow",
        items: [
          { value: "comfortable", title: "Comfortable (marketing/product)" },
          { value: "compact", title: "Compact (dashboards)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    options: {
      storySort: {
        order: [
          "Foundations",
          ["Introduction", "Colors", "Typography", "Spacing", "Theming", "RTL"],
          "Primitives",
          "Components",
          "Patterns",
          "Guidelines",
        ],
      },
    },
  },
};

export default preview;
