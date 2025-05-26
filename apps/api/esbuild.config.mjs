import { build } from "esbuild";
import eslint from "esbuild-plugin-eslint";

build({
  entryPoints: ["./src/**/*.ts"],
  outdir: "dist",
  bundle: false,
  format: "esm",
  platform: "node",
  target: ["node22"],
  sourcemap: true,
  outExtension: { ".js": ".js" },
  plugins: [eslint()],
  logLevel: "info",
});
