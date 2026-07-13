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
        // Official Youth Leaders Path brand palette (sampled from the brand
        // deck): primary periwinkle #6E82CD + deep navy #070E43.
        brand: {
          light: "#9AA8E2",
          DEFAULT: "#6E82CD",
          dark: "#566BC0",
          darker: "#3B4A8F",
          navy: "#070E43",
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

        // Official brand SECONDARY colors (from the brand deck).
        sage: { light: "#CFCDA6", DEFAULT: "#B8B684", dark: "#9A9868" },
        peach: { light: "#F8E6D2", DEFAULT: "#F4D7B9", dark: "#E9C29A" },

        // Per-pillar accent system — BRAND-ONLY. Every value is a color already
        // defined elsewhere in this palette (brand blue family + the defined
        // success/warning/danger accents); nothing outside the approved brand
        // colors is introduced. Keyed to `pillar.id` in `app/lib/pillarAccents.ts`
        // (the single source of truth for WebGL / glow / CSS).
        // Cycles the official brand colors (readable on the dark navy pillars
        // chapter). Navy is the section canvas, so accents cycle periwinkle /
        // peach / sage / gray + two periwinkle-family tints. See pillarAccents.ts.
        pillar: {
          identity: "#6E82CD", // 1 · periwinkle
          discipline: "#F4D7B9", // 2 · peach
          communication: "#B8B684", // 3 · sage
          leadership: "#E2E2E2", // 4 · light gray
          initiative: "#9AA8E2", // 5 · periwinkle-light
          future: "#566BC0", // 6 · periwinkle-deep
        },

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
          50: "#F2F4FD",
          100: "#E4E8FA",
          200: "#CBD3F3",
          300: "#B2BDEC",
          400: "#9AA8E2",
          500: "#8092DA",
          550: "#7787D4",
          600: "#6E82CD",
          700: "#566BC0",
          800: "#3B4A8F",
          900: "#2A3670",
        },
        secondary: {
          50: "#F4F6FD",
          100: "#E0E7FA",
          200: "#BFCCF2",
          300: "#98ABE7",
          400: "#6F89D7",
          500: "#4A68C5",
          600: "#33449A",
          700: "#1B2A6B",
          800: "#070E43",
          900: "#050A2E",
          950: "#03061F",
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
        techblue: { 50: "#F2F4FD", 600: "#6E82CD", 700: "#566BC0" },
        aegold: { 450: "#9AA8E2", 600: "#6E82CD", 700: "#566BC0" },
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
        // Cinematic landing motifs — a slow luminous breathing used on the
        // accent glows/orbs behind the dark sections, plus a gentle float and
        // a shimmering conic sweep for the pillar constellation.
        glowBreathe: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        sheen: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
        scrollHint: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "30%": { opacity: "1" },
          "60%": { transform: "translateY(9px)", opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" },
        },
      },
      animation: {
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "glow-breathe": "glowBreathe 7s ease-in-out infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        sheen: "sheen 6s linear infinite",
        "spin-slow": "spinSlow 32s linear infinite",
        "scroll-hint": "scrollHint 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
