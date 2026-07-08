import path from "path";
import type { Config } from "tailwindcss";

// This monorepo hoists all dependencies to a single root `node_modules`
// (see root `bunfig.toml`, `linker = "hoisted"`) — there is no
// `client/node_modules`. A relative glob of `./node_modules/@aegov/...`
// therefore resolves to a directory that doesn't exist and silently
// matches zero files, which means Tailwind never sees AEGov's component
// source (so it never generates `primary-*`/`secondary-*`/etc. utility
// classes at all — the only such rules that exist come verbatim from
// AEGov's imported pre-compiled CSS in `app/globals.css`, gold defaults
// included). Resolve the package's real on-disk location instead of
// guessing a relative path, so this keeps working regardless of hoisting
// depth.
const aegovContentGlob = path.join(
  path.dirname(require.resolve("@aegov/design-system-react/package.json")),
  "**/*.{js,jsx,ts,tsx}"
);

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    // AEGov Design System components — required so Tailwind generates the
    // classes they use (per designsystem.gov.ae/docs/installation).
    aegovContentGlob,
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        // Youth Leaders Path brand palette — kept in its own `brand-*` namespace
        // (not `primary`/`secondary`) so it never collides with AEGov's own
        // component color tokens.
        brand: {
          light: "#8FA6E5",
          DEFAULT: "#6380D3",
          dark: "#4E6BC4",
          darker: "#3D56A6",
          navy: "#1B2237",
        },
        ink: {
          DEFAULT: "#2A3040",
          soft: "#4A5165",
        },
        muted: {
          DEFAULT: "#7A8199",
          soft: "#9AA1B5",
        },
        surface: {
          DEFAULT: "#ffffff",
          soft: "#F7F9FE",
          softer: "#F4F6FC",
          accent: "#EFF3FD",
        },
        stroke: {
          DEFAULT: "#E3E8F5",
          soft: "#E4E9F5",
          strong: "#D5DCEE",
        },
        success: { DEFAULT: "#3E9B6E", dark: "#1F7A3D" },
        warning: { DEFAULT: "#D9A45B", dark: "#B07A2A" },
        danger: { DEFAULT: "#D66A6E", dark: "#B4383D" },

        // AEGov Design System token overrides — these keys match AEGov's own
        // component color tokens exactly (primary, secondary, aered, aegreen,
        // camel, techblue, aegold, aeblack, whitely). AEGov ships a fully
        // pre-compiled CSS bundle with its own default gold/near-black values
        // baked in as literal hex; because `client/app/globals.css` imports
        // that pre-compiled CSS *before* `@tailwind base/components/utilities`,
        // these locally-generated brand-colored classes win the cascade and
        // every AEGov component (buttons, focus rings, checkboxes, steppers,
        // alerts) renders in the Youth Leaders Path palette instead of AEGov's
        // defaults. Same override mechanism already used for the Milligram
        // font override in this file.
        primary: {
          50: "#F2F5FD",
          100: "#E3E9FA",
          200: "#C7D3F4",
          300: "#ABBBED",
          400: "#8FA6E5",
          500: "#768FDA",
          550: "#6D88D7",
          600: "#6380D3",
          700: "#4E6BC4",
          800: "#3D56A6",
          900: "#32447B",
        },
        secondary: {
          50: "#F4F6FD",
          100: "#E0E7FA",
          200: "#BFCCF2",
          300: "#98ABE7",
          400: "#6F89D7",
          500: "#4A68C5",
          600: "#3A529C",
          700: "#2B3963",
          800: "#1B2237",
          900: "#131825",
          950: "#0C0E15",
        },
        "primary-support": { 300: "#ECD2AC", 400: "#E5C08B" },
        "secondary-support": { 300: "#ABBBED" },
        aered: { 50: "#FCF2F3", 400: "#E6999C", 500: "#DE8285", 600: "#D66A6E", 700: "#B4383D" },
        aegreen: { 50: "#F1F9F4", 300: "#AEE0C3", 600: "#3E9B6E", 700: "#1F7A3D" },
        camel: {
          50: "#FCF8F2",
          100: "#F8EDDE",
          300: "#ECD2AC",
          400: "#E5C08B",
          500: "#DFB272",
          600: "#D9A45B",
          700: "#B07A2A",
        },
        techblue: { 50: "#F2F5FD", 600: "#6380D3", 700: "#4E6BC4" },
        aegold: { 450: "#839AE0", 600: "#6380D3", 700: "#4E6BC4" },
        aeblack: {
          50: "#F7F9FE",
          100: "#EFF3FD",
          200: "#E3E8F5",
          300: "#D5DCEE",
          400: "#9AA1B5",
          500: "#7A8199",
          600: "#4A5165",
          700: "#2A3040",
          800: "#1F2530",
          900: "#171B24",
          950: "#10131A",
        },
        whitely: { 50: "#FFFFFF", 100: "#F7F9FE" },
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
      },
      animation: {
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
