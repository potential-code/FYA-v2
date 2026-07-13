/**
 * Youth Leaders Path signature motif — the organic curved "path" shapes and the
 * blue→peach gradient from the brand deck. Reused across the landing (hero,
 * dividers, pillar frames) as the recurring brand visual language.
 *
 * Brand colors only: periwinkle #6E82CD, peach #F4D7B9, deep navy #070E43,
 * sage #B8B684.
 */

import type { CSSProperties } from "react";

interface ShapeProps {
  className?: string;
  fill?: string;
  style?: CSSProperties;
  flip?: boolean;
}

/** The bowed "parenthesis" ribbon from the palette artwork. */
export function CurvedRibbon({ className, fill = "#6E82CD", style, flip = false }: ShapeProps) {
  return (
    <svg
      viewBox="0 0 160 500"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ ...style, transform: `${flip ? "scaleX(-1)" : ""} ${style?.transform ?? ""}`.trim() || undefined }}
    >
      <path d="M70,0 C25,150 25,350 92,500 L150,500 C90,350 90,150 128,0 Z" fill={fill} />
    </svg>
  );
}

/** Rounded quarter blob (one big radius) — the slide-corner shape. */
export function QuarterBlob({ className, fill = "#6E82CD", style, flip = false }: ShapeProps) {
  return (
    <svg
      viewBox="0 0 300 300"
      className={className}
      aria-hidden="true"
      style={{ ...style, transform: `${flip ? "scaleX(-1)" : ""} ${style?.transform ?? ""}`.trim() || undefined }}
    >
      <path d="M0,0 L300,0 L300,150 C300,233 233,300 150,300 L0,300 Z" fill={fill} />
    </svg>
  );
}

/** Soft organic blob (for blurred ambient accents). */
export function SoftBlob({ className, fill = "#6E82CD", style }: ShapeProps) {
  return (
    <svg viewBox="0 0 320 320" className={className} aria-hidden="true" style={style}>
      <path
        d="M160,20 C230,20 300,70 300,160 C300,240 250,300 160,300 C90,300 20,250 20,160 C20,80 90,20 160,20 Z"
        fill={fill}
      />
    </svg>
  );
}

/** SVG <defs> holding the signature blue→peach gradient. Drop inside an <svg>. */
export function BrandGradientDefs({ id = "brandBluePeach" }: { id?: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6E82CD" />
        <stop offset="55%" stopColor="#9AA8E2" />
        <stop offset="100%" stopColor="#F4D7B9" />
      </linearGradient>
    </defs>
  );
}

/** CSS blue→peach gradient string for backgrounds / text clips. */
export const bluePeachGradient = "linear-gradient(100deg, #6E82CD 0%, #9AA8E2 45%, #F4D7B9 100%)";
