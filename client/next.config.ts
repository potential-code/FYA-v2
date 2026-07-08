import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  // Monorepo: `next` is hoisted to the workspace root node_modules. Trace from
  // the repo root so the standalone bundle includes it (matches potential-smeep's
  // pattern — otherwise the runtime crashes with "Cannot find module 'next'").
  outputFileTracingRoot: path.join(__dirname, ".."),
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  // @aegov/design-system-react ships plain-CJS precompiled components — bundle
  // it through webpack rather than leaving it a raw Node require.
  transpilePackages: ["@aegov/design-system-react"],
};

export default nextConfig;
