import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { IconContext } from "@phosphor-icons/react";

// Phosphor icon defaults: scale with text size, inherit color, regular weight.
const ICON_CONTEXT = {
  color: "currentColor",
  size: "1em",
  weight: "regular" as const,
};

export type Theme = "light" | "dark";
export type Direction = "ltr" | "rtl";
/** Comfortable for marketing/product; compact for data-dense dashboards. */
export type Density = "comfortable" | "compact";

export interface ThemeContextValue {
  /** The active theme. */
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  /** Text direction — drives RTL for Arabic. */
  dir: Direction;
  setDir: (dir: Direction) => void;
  /** UI density — scales component spacing/sizing across product surfaces. */
  density: Density;
  setDensity: (density: Density) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "crate-theme";

function getSystemTheme(): Theme {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialTheme(defaultTheme: Theme | "system"): Theme {
  if (typeof window === "undefined") {
    return defaultTheme === "system" ? "light" : defaultTheme;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return defaultTheme === "system" ? getSystemTheme() : defaultTheme;
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial theme, or "system" to follow the OS preference. Default: "system". */
  defaultTheme?: Theme | "system";
  /** Initial text direction. Default: "ltr". */
  defaultDir?: Direction;
  /** Initial density. Default: "comfortable". */
  defaultDensity?: Density;
  /**
   * When true, also set `data-theme`/`dir`/`data-density` on <html> so portaled UI
   * (modals, tooltips rendered to document.body) inherits them. Default: true.
   */
  applyToDocument?: boolean;
}

/**
 * Provides theme + direction to Crate components. Sets `data-theme` and `dir` on a
 * wrapper element (and optionally on <html>), which is all the token CSS needs to flip.
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultDir = "ltr",
  defaultDensity = "comfortable",
  applyToDocument = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() =>
    getInitialTheme(defaultTheme),
  );
  const [dir, setDir] = useState<Direction>(defaultDir);
  const [density, setDensity] = useState<Density>(defaultDensity);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!applyToDocument || typeof document === "undefined") return;
    const el = document.documentElement;
    el.setAttribute("data-theme", theme);
    el.setAttribute("dir", dir);
    el.setAttribute("data-density", density);
  }, [theme, dir, density, applyToDocument]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme, dir, setDir, density, setDensity }),
    [theme, setTheme, toggleTheme, dir, density],
  );

  return (
    <ThemeContext.Provider value={value}>
      <IconContext.Provider value={ICON_CONTEXT}>
        <div data-theme={theme} dir={dir} data-density={density}>
          {children}
        </div>
      </IconContext.Provider>
    </ThemeContext.Provider>
  );
}
