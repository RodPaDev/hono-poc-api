import { build } from "esbuild";

build({
  entryPoints: ["./src/**/*.ts"],
  outdir: "dist",
  bundle: false,
  format: "esm",
  platform: "node",
  target: ["node22"],
  sourcemap: true,
  outExtension: { ".js": ".js" },
  plugins: [],
  logLevel: "info",
});
