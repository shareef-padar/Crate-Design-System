// Pulls exact color values from the Cargoz Figma palette into tokens/primitives.json.
//
// STATUS: scaffold. Two supported workflows — pick one once the Figma file is shared:
//
//   A) Via Claude / Figma MCP (recommended right now)
//      Share the Figma file link in the chat. The assistant pulls variable definitions
//      with the Figma MCP (`get_variable_defs`) and rewrites tokens/primitives.json
//      directly, applying the teal→primary / purple→secondary swap. No token/plan needed.
//
//   B) Via the Figma REST API (for unattended/CI use — requires an Enterprise plan for
//      the Variables endpoint). Set env vars then run `npm run figma:pull`:
//        FIGMA_TOKEN=<personal access token>
//        FIGMA_FILE_KEY=<the key in figma.com/file/<KEY>/...>
//
// The B path is sketched below and intentionally fails loud until configured, so nobody
// mistakes a stub for a working sync.

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;

// Maps Figma ramp names → our role names. NOTE the swap: Figma "Secondary" (teal/green)
// becomes our `primary`; Figma "Primary" (purple) becomes our `secondary`.
const NAME_MAP = {
  secondary: "primary",
  primary: "secondary",
  red: "red",
  orange: "orange",
  green: "green",
  blue: "blue",
  text: "text",
  "soft violet": "soft-violet",
  yellow: "yellow",
  mint: "mint",
  "sky blue": "sky-blue",
  coral: "coral",
};

async function main() {
  if (!TOKEN || !FILE_KEY) {
    console.error(
      [
        "figma-pull is not configured.",
        "",
        "Recommended: share the Figma file link in chat and let the assistant pull",
        "values via the Figma MCP (workflow A — see the comment at the top of this file).",
        "",
        "For API use (workflow B), set FIGMA_TOKEN and FIGMA_FILE_KEY and re-run.",
      ].join("\n"),
    );
    process.exit(1);
  }

  // --- Workflow B sketch (Variables REST endpoint, Enterprise) -------------------
  const res = await fetch(
    `https://api.figma.com/v1/files/${FILE_KEY}/variables/local`,
    { headers: { "X-Figma-Token": TOKEN } },
  );
  if (!res.ok) {
    console.error(`Figma API error ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  // TODO: transform `await res.json()` (variables + variableCollections) into the
  // DTCG ramp shape used by tokens/primitives.json, applying NAME_MAP and keeping the
  // 50→900 (+25 for text) steps. Left unimplemented until the real file structure is
  // known — implementing it blind would bake in wrong assumptions.
  console.error(
    "Fetched Figma variables, but the transform step is not implemented yet.\n" +
      "Share the file so the ramp/collection naming can be mapped correctly.\n" +
      `Known ramp name map: ${JSON.stringify(NAME_MAP)}`,
  );
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
