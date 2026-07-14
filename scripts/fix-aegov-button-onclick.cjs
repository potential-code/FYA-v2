#!/usr/bin/env node
/**
 * @aegov/design-system-react's Button component runs incoming props through
 * `ButtonSchema.parse(props)` before spreading the leftovers onto the
 * underlying <button> element. Zod's z.object() defaults to "strip" mode,
 * so any prop not explicitly declared in the schema is silently removed —
 * including `onClick`, which the schema never lists. Every `<Button
 * onClick={...}>` in this app therefore renders a dead button: the handler
 * never reaches the DOM element and clicks do nothing.
 *
 * This is an upstream packaging bug — adding `.passthrough()` to the
 * schema lets onClick (and any other native button prop) survive the
 * parse, without needing to touch any consuming code.
 */
const fs = require("fs");
const path = require("path");

const targets = [
  {
    file: path.join(__dirname, "..", "node_modules", "@aegov", "design-system-react", "dist", "components", "Button", "Button.js"),
    find: "  disabled: _zod.z.boolean().optional()\n});",
    replace: "  disabled: _zod.z.boolean().optional()\n}).passthrough();",
  },
  {
    file: path.join(__dirname, "..", "node_modules", "@aegov", "design-system-react", "src", "components", "Button", "Button.jsx"),
    find: "  disabled: z.boolean().optional(),\n});",
    replace: "  disabled: z.boolean().optional(),\n}).passthrough();",
  },
];

for (const { file, find, replace } of targets) {
  if (!fs.existsSync(file)) {
    console.warn("[fix-aegov-button-onclick] not found, skipping:", file);
    continue;
  }
  const src = fs.readFileSync(file, "utf8");
  if (src.includes(".passthrough()")) {
    console.log("[fix-aegov-button-onclick] already patched, nothing to do:", file);
    continue;
  }
  if (!src.includes(find)) {
    console.warn("[fix-aegov-button-onclick] expected pattern not found, skipping:", file);
    continue;
  }
  fs.writeFileSync(file, src.replace(find, replace));
  console.log("[fix-aegov-button-onclick] added .passthrough() to ButtonSchema:", file);
}
