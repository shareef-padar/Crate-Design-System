# Tokens — the source of truth

These JSON files are **hand-edited** and define every design decision in Crate. Running
`npm run tokens` generates `src/styles/tokens.css` from them. **Never edit `tokens.css`
directly** — your change would be overwritten on the next build.

Format: [W3C Design Tokens (DTCG)](https://tr.designtokens.org/format/) — `$value` / `$type`.

## Files

| File | Tier | Contents |
| --- | --- | --- |
| `primitives.json` | 1 — Primitives | The 12 raw color ramps (50→900). The only place a hex value lives. |
| `semantic.light.json` | 2 — Semantic | Role-based colors for light theme (`color.action`, `color.text-primary`, …). |
| `semantic.dark.json` | 2 — Semantic | The same roles, remapped for dark theme. |
| `typography.json` | — | Font families, weights, the type scale (size + line-height), letter-spacing. |
| `space.json` | — | Spacing scale (4px base), corner radii, control/touch sizes. |

## Conventions

- **Primary = the teal/green ramp. Secondary = the purple ramp.** (Authored that way here.)
- **Base step = `600`** — the default a component reaches for. Lighter steps for
  backgrounds/hovers, darker for text/active states.
- The neutral **`text`** ramp also has a `25` step (lightest).
- Output CSS variables are prefixed **`--crate-`** to avoid colliding with a consuming
  app's variables (e.g. Tailwind 4's own `--color-*`).

## ⚠️ Color values are PLACEHOLDERS

The hex values in `primitives.json` are **brand-accurate placeholders**, not the final
palette. The brand teal (`#40BCAA`) and purple (`#7957FF`) are pinned at the `500` step
and the ramps were built around them so the system looks right today — but the exact
values must come from the Cargoz Figma palette.

### Replacing them with exact Figma values

1. In Figma, keep the 12 ramps as **Variables** (not just color styles — Variables
   export cleanly with names + values).
2. Pull them: `npm run figma:pull` (uses `scripts/figma-pull.mjs`). This reads the Figma
   palette and rewrites `primitives.json` — mapping teal→`primary`, purple→`secondary`.
3. Review the diff, then `npm run tokens` to regenerate the CSS.

This is a manual, review-the-diff step on purpose — no live webhook while the palette is
still moving.
