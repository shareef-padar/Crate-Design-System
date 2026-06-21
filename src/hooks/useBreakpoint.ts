import { useEffect, useState } from "react";
import { breakpoints, media, type Breakpoint } from "../tokens/breakpoints";

const ORDER: Breakpoint[] = ["sm", "md", "lg", "xl", "2xl"];

function compute(): Breakpoint | "base" {
  if (typeof window === "undefined") return "base";
  let current: Breakpoint | "base" = "base";
  for (const bp of ORDER) {
    if (window.matchMedia(media.up(bp)).matches) current = bp;
  }
  return current;
}

/**
 * The largest active breakpoint, or "base" below `sm`. Updates on resize.
 * Use for behavior that genuinely needs JS (e.g. swapping a menu for a drawer);
 * prefer CSS `media` helpers for styling.
 */
export function useBreakpoint(): Breakpoint | "base" {
  const [bp, setBp] = useState<Breakpoint | "base">(compute);

  useEffect(() => {
    const queries = ORDER.map((b) => window.matchMedia(media.up(b)));
    const onChange = () => setBp(compute());
    queries.forEach((q) => q.addEventListener("change", onChange));
    onChange();
    return () => queries.forEach((q) => q.removeEventListener("change", onChange));
  }, []);

  return bp;
}

/** True when the viewport is at least `bp` wide. */
export function useMinWidth(bp: Breakpoint): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(media.up(bp)).matches,
  );
  useEffect(() => {
    const q = window.matchMedia(media.up(bp));
    const onChange = () => setMatches(q.matches);
    q.addEventListener("change", onChange);
    onChange();
    return () => q.removeEventListener("change", onChange);
  }, [bp]);
  return matches;
}

export { breakpoints };
