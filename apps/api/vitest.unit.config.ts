import path from "path";
import { loadEnvFile } from "process";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

loadEnvFile(path.resolve(__dirname, ".env.test"));

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["./__test__/unit/**/*.test.ts"],
    setupFiles: "./__test__/unit/config/setup.ts",
  },
  plugins: [tsconfigPaths()],
});
