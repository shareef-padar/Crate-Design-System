/** Tiny className joiner. Filters out falsy values. */
export function cx(
  ...args: Array<string | false | null | undefined>
): string {
  return args.filter(Boolean).join(" ");
}

/** Space scale steps — match the keys in tokens/space.json. */
export const SPACE_STEPS = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20] as const;
export type Space = (typeof SPACE_STEPS)[number];

/** Resolve a space step to its CSS variable, or undefined to omit. */
export function spaceVar(step: Space | undefined): string | undefined {
  return step == null ? undefined : `var(--crate-space-${step})`;
}
