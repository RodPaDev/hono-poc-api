import { build } from "esbuild";
import pkg from "./package.json" with { type: "json" };

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
  external: [
    ...Object.entries(pkg.dependencies || {})
      .filter(([, value]) => !value.includes("workspace:"))
      .map(([key]) => key),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
});
