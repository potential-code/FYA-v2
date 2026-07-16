#!/usr/bin/env node
/**
 * @aegov/design-system-react's Hyperlink component always wraps its rendered
 * content in a `<>{children}...</>` React.Fragment before handing it to
 * Radix's `Slot` (when `asChild` is true). Radix `Slot` clones its single
 * child and merges the incoming props (`href`, `ref`, `className`, ...) onto
 * it — but here that "single child" is the Fragment itself, and
 * React.Fragment only accepts `key`/`children`. Every `<Hyperlink asChild>`
 * therefore logs "Invalid prop `href` supplied to `React.Fragment`" (and
 * would silently drop `ref`/`className` too) whenever `icon` and `external`
 * are both left at their defaults, since in that case the Fragment has no
 * real reason to exist — it's just wrapping `children` alone.
 *
 * This is an upstream packaging bug — only building the Fragment when `icon`
 * or `external` actually add extra nodes (and passing `children` straight
 * through otherwise) lets Slot merge onto the real element again, without
 * needing to touch any consuming code.
 */
const fs = require("fs");
const path = require("path");

const targets = [
  {
    file: path.join(
      __dirname, "..", "node_modules", "@aegov", "design-system-react",
      "dist", "components", "Hyperlink", "Hyperlink.js"
    ),
    find: "const content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children, icon && /*#__PURE__*/_react.default.createElement(_react2.CaretRight, {\n    className: \"h-5 w-5 rtl:-scale-x-100\",\n    \"aria-hidden\": \"true\"\n  }), external && /*#__PURE__*/_react.default.createElement(\"span\", {\n    className: \"sr-only\"\n  }, \" (opens in new tab)\"));",
    replace: "const content = !icon && !external ? children : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children, icon && /*#__PURE__*/_react.default.createElement(_react2.CaretRight, {\n    className: \"h-5 w-5 rtl:-scale-x-100\",\n    \"aria-hidden\": \"true\"\n  }), external && /*#__PURE__*/_react.default.createElement(\"span\", {\n    className: \"sr-only\"\n  }, \" (opens in new tab)\"));",
  },
  {
    file: path.join(
      __dirname, "..", "node_modules", "@aegov", "design-system-react",
      "src", "components", "Hyperlink", "Hyperlink.jsx"
    ),
    find: `  const content = (
    <>
      {children}
      {icon && (
        <CaretRight
          className="h-5 w-5 rtl:-scale-x-100"
          aria-hidden="true"
        />
      )}
      {external && (
        <span className="sr-only"> (opens in new tab)</span>
      )}
    </>
  )`,
    replace: `  const content = !icon && !external ? children : (
    <>
      {children}
      {icon && (
        <CaretRight
          className="h-5 w-5 rtl:-scale-x-100"
          aria-hidden="true"
        />
      )}
      {external && (
        <span className="sr-only"> (opens in new tab)</span>
      )}
    </>
  )`,
  },
];

for (const { file, find, replace } of targets) {
  if (!fs.existsSync(file)) {
    console.warn("[fix-aegov-hyperlink-fragment] not found, skipping:", file);
    continue;
  }
  const src = fs.readFileSync(file, "utf8");
  if (src.includes("!icon && !external ? children :")) {
    console.log("[fix-aegov-hyperlink-fragment] already patched, nothing to do:", file);
    continue;
  }
  if (!src.includes(find)) {
    console.warn("[fix-aegov-hyperlink-fragment] expected pattern not found, skipping:", file);
    continue;
  }
  fs.writeFileSync(file, src.replace(find, replace));
  console.log("[fix-aegov-hyperlink-fragment] avoided unnecessary Fragment wrap in Hyperlink content:", file);
}
