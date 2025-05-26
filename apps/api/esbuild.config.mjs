import { build } from "esbuild";

build({
  entryPoints: ["./src/**/*.ts"],
  bundle: true,
  outdir: "dist",
  format: "esm",
  platform: "node",
  target: ["node22"],
  sourcemap: true,
  outExtension: { ".js": ".js" },
  logLevel: "info",
  external: ["pg", "dotenv"],
});
