/**
 * Single source of truth for the per-pillar accent system used across the
 * cinematic landing redesign. Keyed by `pillar.id` (see
 * `@shared/content/pillars.ts`).
 *
 * IMPORTANT — brand-only constraint: every value here is a color that already
 * exists in `client/tailwind.config.ts` (the brand blue family + the palette's
 * defined success/warning/danger accents). No hues outside the approved palette
 * are introduced. The `glow` tints are lighter stops from the same palette
 * scales (camel / primary / aegreen / aered).
 *
 * Each entry carries:
 *   - `hex`     : the core accent hue (a defined palette color)
 *   - `glow`    : a lighter palette tint for luminous glows / halos
 *   - `rgb`     : "r, g, b" string for `rgba(var)`-style alpha compositing
 *   - `gradient`: accent → brand periwinkle (both palette colors)
 */
export interface PillarAccent {
  hex: string;
  glow: string;
  rgb: string;
  gradient: string;
}

const BRAND = "#6E82CD"; // brand.DEFAULT (official periwinkle)
const PEACH = "#F4D7B9";

// Cycles the official brand palette across the six pillars. The pillars section
// background IS the deep navy #070E43, so navy can't also be an accent there
// (it'd vanish) — instead accents cycle periwinkle · peach · sage · gray + two
// periwinkle-family tints, every one readable on the dark canvas and drawn from
// the brand palette. `hex` is the on-brand color; `glow` is a lighter tint for
// luminous icons/text; gradients pair the accent with periwinkle or peach.
export const pillarAccents: Record<string, PillarAccent> = {
  // 1 · Identity & Values → periwinkle
  "identity-values": {
    hex: "#6E82CD",
    glow: "#9AA8E2",
    rgb: "110, 130, 205",
    gradient: `linear-gradient(135deg, #6E82CD, ${PEACH})`,
  },
  // 2 · Self-Management & Discipline → peach
  "self-management": {
    hex: "#F4D7B9",
    glow: "#F8E6D2",
    rgb: "244, 215, 185",
    gradient: `linear-gradient(135deg, #F4D7B9, ${BRAND})`,
  },
  // 3 · Communication → sage
  communication: {
    hex: "#B8B684",
    glow: "#CFCDA6",
    rgb: "184, 182, 132",
    gradient: `linear-gradient(135deg, #B8B684, ${BRAND})`,
  },
  // 4 · Leadership & Teamwork → light gray
  "leadership-teamwork": {
    hex: "#E2E2E2",
    glow: "#F0F0F0",
    rgb: "226, 226, 226",
    gradient: `linear-gradient(135deg, #E2E2E2, ${BRAND})`,
  },
  // 5 · Initiative & Community → periwinkle-light
  "initiative-community": {
    hex: "#9AA8E2",
    glow: "#BAC5EC",
    rgb: "154, 168, 226",
    gradient: `linear-gradient(135deg, #9AA8E2, ${PEACH})`,
  },
  // 6 · Future & Digital → periwinkle-deep
  "future-digital": {
    hex: "#566BC0",
    glow: "#8496DA",
    rgb: "86, 107, 192",
    gradient: `linear-gradient(135deg, #566BC0, ${PEACH})`,
  },
};

/** Ordered hue list (pillar 1 → 6) for spectrum sweeps. All brand colors. */
export const pillarHueOrder = ["#6E82CD", "#F4D7B9", "#B8B684", "#E2E2E2", "#9AA8E2", "#566BC0"];

/** Safe lookup with a brand-periwinkle fallback for unknown ids. */
export function accentFor(id: string): PillarAccent {
  return (
    pillarAccents[id] ?? {
      hex: BRAND,
      glow: "#9AA8E2",
      rgb: "110, 130, 205",
      gradient: `linear-gradient(135deg, #6E82CD, ${PEACH})`,
    }
  );
}

/** Parse "#RRGGBB" → [r,g,b] 0–255. Used to interpolate the ambient glow. */
export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

/** Linear-interpolate two hex colors → "r, g, b" string (for glow morphing). */
export function mixHex(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `${r}, ${g}, ${bl}`;
}
