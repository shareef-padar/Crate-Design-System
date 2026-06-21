/// <reference types="vitest/config" />
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// Crate is published as a library: ESM + CJS, with bundled type declarations.
// React is externalized so consuming apps share a single React instance.
export default defineConfig({
  plugins: [
    react(),
    dts({ include: ["src"], exclude: ["**/*.stories.tsx", "**/*.test.tsx"] }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Crate",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "crate.js" : "crate.cjs"),
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@phosphor-icons/react",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (info) =>
          info.name === "style.css" ? "styles.css" : (info.name ?? "asset"),
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
  },
});
