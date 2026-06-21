// Generates src/styles/tokens.css from the JSON token sources in /tokens.
//
// Output structure:
//   :root                  -> primitives + typography + spacing + LIGHT semantic
//   [data-theme="dark"]    -> DARK semantic overrides only (references resolve to
//                             the same primitives via var(), so no hex is duplicated)
//
// We deliberately use a minimal transform set (NOT the default "css" group) so that
// our already-formatted values ("1rem", "1.6", "-0.02em") pass through untouched —
// the "size/rem" transform in the default group would corrupt them.

import StyleDictionary from "style-dictionary";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tokensDir = path.join(root, "tokens");
const stylesDir = path.join(root, "src", "styles");

const TRANSFORMS = ["attribute/cti", "name/kebab", "color/css"];

/** Build one CSS file containing the given sources, scoped to `selector`. */
async function buildCss({ name, sources, selector, filter }) {
  const sd = new StyleDictionary({
    source: sources,
    platforms: {
      css: {
        transforms: TRANSFORMS,
        prefix: "crate",
        buildPath: stylesDir + path.sep,
        files: [
          {
            destination: name,
            format: "css/variables",
            filter,
            options: { outputReferences: true, selector },
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
}

async function main() {
  await fs.mkdir(stylesDir, { recursive: true });

  const primitives = path.join(tokensDir, "primitives.json");
  const typography = path.join(tokensDir, "typography.json");
  const space = path.join(tokensDir, "space.json");
  const component = path.join(tokensDir, "component.json");
  const semanticLight = path.join(tokensDir, "semantic.light.json");
  const semanticDark = path.join(tokensDir, "semantic.dark.json");
  const densityCompact = path.join(tokensDir, "density.compact.json");

  // 1. :root — primitives, type, spacing, comfortable component sizing, light semantic.
  await buildCss({
    name: "__root.css",
    sources: [primitives, typography, space, component, semanticLight],
    selector: ":root",
  });

  // 3. [data-density="compact"] — denser component sizing for dashboards.
  await buildCss({
    name: "__compact.css",
    sources: [densityCompact],
    selector: '[data-density="compact"]',
  });

  // 2. [data-theme="dark"] — only the dark semantic tokens. Primitives are loaded so
  //    references resolve, but we filter the OUTPUT to the dark file's tokens only.
  await buildCss({
    name: "__dark.css",
    sources: [primitives, semanticDark],
    selector: '[data-theme="dark"]',
    filter: (token) => token.filePath === semanticDark,
  });

  const rootCss = await fs.readFile(path.join(stylesDir, "__root.css"), "utf8");
  const darkCss = await fs.readFile(path.join(stylesDir, "__dark.css"), "utf8");
  const compactCss = await fs.readFile(path.join(stylesDir, "__compact.css"), "utf8");

  const header = `/**
 * Crate Design System — design tokens
 *
 * GENERATED FILE — DO NOT EDIT BY HAND.
 * Edit the source JSON in /tokens, then run \`npm run tokens\`.
 */\n\n`;

  await fs.writeFile(
    path.join(stylesDir, "tokens.css"),
    header +
      rootCss.trim() +
      "\n\n" +
      darkCss.trim() +
      "\n\n" +
      compactCss.trim() +
      "\n",
    "utf8",
  );

  await fs.rm(path.join(stylesDir, "__root.css"));
  await fs.rm(path.join(stylesDir, "__dark.css"));
  await fs.rm(path.join(stylesDir, "__compact.css"));

  console.log("✓ tokens.css generated → src/styles/tokens.css");
}

main().catch((err) => {
  console.error("✗ Token build failed:\n", err);
  process.exit(1);
});
