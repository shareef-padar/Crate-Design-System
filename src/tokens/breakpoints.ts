/**
 * Breakpoints. These are NOT CSS variables — media-query conditions can't read custom
 * properties — so the scale lives here as the single source of truth for both component
 * CSS (via the `media` helpers) and JS (via `useBreakpoint`).
 *
 * Targets the Cargoz device spread: phones → warehouse tablets → office desktops.
 */
export const breakpoints = {
  sm: 480, // large phone
  md: 768, // tablet
  lg: 1024, // small laptop
  xl: 1280, // desktop
  "2xl": 1536, // wide desktop
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Media-query string helpers for use in CSS-in-JS or `window.matchMedia`. */
export const media = {
  /** Screens at least as wide as `bp`. */
  up: (bp: Breakpoint) => `(min-width: ${breakpoints[bp]}px)`,
  /** Screens narrower than `bp`. */
  down: (bp: Breakpoint) => `(max-width: ${breakpoints[bp] - 0.02}px)`,
  /** Screens between `min` (inclusive) and `max` (exclusive). */
  between: (min: Breakpoint, max: Breakpoint) =>
    `(min-width: ${breakpoints[min]}px) and (max-width: ${breakpoints[max] - 0.02}px)`,
} as const;
