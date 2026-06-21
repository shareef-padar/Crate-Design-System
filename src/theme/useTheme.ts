import { useContext } from "react";
import { ThemeContext, type ThemeContextValue } from "./ThemeProvider";

/** Read and control the current theme + direction. Must be used inside <ThemeProvider>. */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return ctx;
}
