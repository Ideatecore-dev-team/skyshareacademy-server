import { defineConfig } from "vitest/config";

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["src"],
      exclude: ["src/index.ts", "src/types"],
    },
    sequence: {
      concurrent: false,
    },
  },
});
