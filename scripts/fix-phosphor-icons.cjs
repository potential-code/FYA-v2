#!/usr/bin/env node
/**
 * @phosphor-icons/react@2.1.10 ships package.json `"type": "module"`, but its
 * `main` field points to `dist/index.cjs.js` — a file written in CommonJS
 * syntax (`exports.Eye = ...`). Because the package declares `type: module`,
 * Node parses that file as an ES module. Since it has no actual `export`
 * statements (only CJS `exports.X = ...` assignments), Node's static ESM
 * export scanner finds nothing, so `require("@phosphor-icons/react")`
 * silently resolves to an empty module — every icon becomes `undefined`, and
 * React throws "Element type is invalid" wherever an icon is rendered via a
 * plain `require()` (as AEGov's precompiled components do internally, e.g.
 * for the Eye/EyeSlash password-visibility toggle in AEGov's Input).
 *
 * This is a genuine upstream packaging bug — removing `"type": "module"`
 * (the package's own JS content is really CommonJS, not the isolated ESM
 * build at dist/index.es.js, which is unaffected) fixes require() resolution
 * without needing to patch any consuming code.
 */
const fs = require("fs");
const path = require("path");

const pkgPath = path.join(__dirname, "..", "node_modules", "@phosphor-icons", "react", "package.json");

if (!fs.existsSync(pkgPath)) {
  console.warn("[fix-phosphor-icons] package.json not found, skipping:", pkgPath);
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

if (pkg.type === "module") {
  delete pkg.type;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  console.log("[fix-phosphor-icons] Removed invalid \"type\": \"module\" from @phosphor-icons/react/package.json");
} else {
  console.log("[fix-phosphor-icons] Already fixed, nothing to do.");
}
