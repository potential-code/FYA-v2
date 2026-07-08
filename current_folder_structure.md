# Current Folder Structure

This document reflects the current project layout and key conventions. Adapted from the same template used in Maliyat and potential-smeep.

## Repository Structure

```
youth-leaders-path/
├── bunfig.toml          # Bun workspace config (hoisted linker)
├── client/              # Next.js 15 (App Router) frontend
│   ├── app/             # Route groups, pages, components, i18n, lib
│   ├── public/          # fonts/, images/ — static assets served as-is
│   ├── Dockerfile       # Multi-stage build, standalone output
│   ├── next.config.ts
│   ├── package.json
│   ├── tailwind.config.ts   # Tailwind v3.4 — required by @aegov/design-system-react
│   └── tsconfig.json    # Extends ../tsconfig.json
├── server/              # Express + Bun backend — MINIMAL STUB (phase 2 fills this in)
│   ├── controllers/     # (empty) Request handlers (routes → controllers → services)
│   ├── db/              # (empty) Drizzle ORM, migrations — reserved
│   ├── middleware/       # (empty) Auth, security, upload — reserved
│   ├── routes/           # (empty) Express route registration — reserved
│   ├── services/          # (empty) Domain business logic — reserved
│   └── index.ts           # Bare Express bootstrap: helmet, cors, /health
├── shared/               # Cross-workspace shared code
│   └── content/          # Typed program data (pillars, phases, tracks, mock dashboard data)
├── scripts/
│   └── fix-phosphor-icons.cjs  # postinstall fix for an upstream @phosphor-icons/react packaging bug (see below)
├── assets/ brand/ fonts/ uploads/  # Original design source material — left in place, not migrated
├── tsconfig.json         # Root TypeScript config (base options)
├── docker-compose.yml    # (to be added when server phase starts)
└── package.json          # Workspace root (workspaces: client, server; runs the postinstall fix script)
```

## Repository structure & boundaries
- Keep `client/`, `server/`, and `shared/` responsibilities separate.
- `server/` is intentionally a minimal stub in this phase — no real endpoints, no DB. Frontend is fully static/mock-data-driven.
- `shared/content/` is the single source of truth for program data (pillars, phases, tracks, mock dashboard figures) — the client imports it now; the server can reuse it as seed data once the backend phase starts.
- Avoid placing runtime-generated assets under version control.

## Frontend (Next.js + App Router)
- Route groups organize pages by concern: `(auth)/login`, `(auth)/sign-up`, `(admin)/admin`, `(parent)/parent`, `(participant)/participant`.
- Feature-based component folders: `layout/`, `landing/`, `auth/`, `dashboard/` (shared widgets), `admin/`, `parent/`, `participant/`.
- Single responsive layout per page (Tailwind breakpoints) — no separate desktop/mobile render trees.
- Path alias `@/*` → `client/` root (Next.js convention).
- UI components come from `@aegov/design-system-react` (UAE Design System) — Tailwind CSS **v3.4** is a hard peer dependency of this package; do not upgrade to v4.
- Brand identity (Milligram font, blue/navy palette) is layered on top of AEGov components via Tailwind theme tokens / CSS variables — not replaced by AEGov's defaults.
- i18n via `react-i18next`. Base copy lives in `app/i18n/locales/{ar,en}.json` (currently the `common` + `landing` namespaces); each of the other 5 pages registers its own namespace file pair (e.g. `login.ar.json`/`login.en.json`) via `i18n.addResourceBundle(...)` called once in that page's `page.tsx`, instead of editing the shared locale files — keeps page-owned copy isolated. Arabic is the default (RTL); language toggle flips `document.documentElement.dir` and persists the choice to `localStorage`. i18n is initialized with a hardcoded `lng: "ar"` (no `i18next-browser-languagedetector`) so SSR and first client render always match — `LanguageContext` upgrades to a saved preference in a post-mount effect. Do not add `i18next-browser-languagedetector` back without accounting for this SSR/hydration mismatch.
- Animation via `framer-motion` and `gsap`/`ScrollTrigger`.
- Icons via `@phosphor-icons/react` (AEGov's documented pairing) — no emoji-as-icon.
- **Known upstream bug, patched automatically**: `@phosphor-icons/react@2.1.10`'s `package.json` declares `"type": "module"` but its `main` field points to a CommonJS-syntax file, so plain `require()` (used internally by AEGov's precompiled components, e.g. the password-visibility icon in `Input`) resolves every icon to `undefined` and crashes React. `scripts/fix-phosphor-icons.cjs` runs as the root `postinstall` script and strips the bad `"type"` field from the installed copy — this re-applies automatically after every `bun install`. If a future version of the package fixes this upstream, the script and postinstall hook can be deleted.

## Backend (Express) — reserved for phase 2
- Architecture will follow routes → controllers → services (strictly layered), matching Maliyat's convention.
- No real logic exists yet; only a health-check bootstrap.

## Build & deployment
- Client builds via `next build` with `output: "standalone"` (matches potential-smeep's Docker pattern) — copy `.next/standalone`, `.next/static`, and `public/` into the runtime image.
- Run `bun run typecheck` before any deployment.
