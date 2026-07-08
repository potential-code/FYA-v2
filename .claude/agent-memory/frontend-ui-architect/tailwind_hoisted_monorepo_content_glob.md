---
name: tailwind-hoisted-monorepo-content-glob
description: Relative node_modules globs in client/tailwind.config.ts silently match zero files in this hoisted monorepo — use require.resolve instead.
type: project
---

This repo uses a hoisted monorepo layout (`bunfig.toml`, `linker = "hoisted"`) — there is
**no** `client/node_modules`; everything lives in the single root `node_modules/`.

`client/tailwind.config.ts`'s `content` array used to include a *relative* glob:
`"./node_modules/@aegov/design-system-react/**/*.{js,jsx,ts,tsx}"`. Since Next.js runs
with cwd = `client/`, that path resolved to a directory that doesn't exist, so the glob
silently matched **zero files**. Tailwind's JIT therefore never generated any
`primary-*`/`secondary-*`/`aegreen-*`/etc. utility classes from the local config at all —
the only rules for those class names that ever reached the browser were the ones baked
verbatim into `@aegov/design-system-react`'s pre-compiled `dist/styles/tailwind.css`
(imported via `@import` in `client/app/globals.css`), i.e. AEGov's own default gold/black
theme. This is why a color-override-via-`theme.extend.colors` fix (Phase A brand
theming plan, 2026-07-08) had *zero visible effect* until the glob was fixed.

**Why:** Any future `content` glob pointing into `node_modules` for a package (not just
`@aegov/design-system-react`) will hit the exact same silent-zero-match failure if
written as a relative path, because this monorepo never has package-local
`node_modules` — only the hoisted root one.

**How to apply:** Never add a relative `./node_modules/<pkg>/**` glob to
`client/tailwind.config.ts`. Resolve the package's real on-disk path instead:
```ts
import path from "path";
const pkgGlob = path.join(
  path.dirname(require.resolve("<pkg>/package.json")),
  "**/*.{js,jsx,ts,tsx}"
);
```
This is what `aegovContentGlob` in `client/tailwind.config.ts` now does. If you ever see
an AEGov (or any other externally-styled) component rendering in an unexpected/default
color despite a seemingly-correct `theme.extend.colors` entry, check this first — verify
by curling a dev-server page's CSS and grep/regex-searching for the class in question:
if there's only **one** rule (matching the package's own precompiled defaults) instead of
two (defaults + your override, in that order), the content glob isn't matching anything.
