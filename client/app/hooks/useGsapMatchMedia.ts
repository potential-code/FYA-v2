import gsap from "gsap";

/**
 * Standardized `gsap.matchMedia()` breakpoint strings shared by every
 * scroll-choreographed landing section (Journey, Pillars, FinalCta, Hero),
 * so `isDesktop` / `isMobile` / `reduce` conditions stay identical
 * everywhere instead of drifting between files.
 */
export const GSAP_BREAKPOINTS = {
  isDesktop: "(min-width: 1024px)",
  isMobile: "(max-width: 1023px)",
  reduce: "(prefers-reduced-motion: reduce)",
} as const;

/**
 * Thin wrapper around `gsap.matchMedia()` that pairs a fresh matchMedia
 * instance with the shared breakpoint strings above.
 *
 * This is NOT a stateful React hook — despite the `use` prefix (kept for
 * discoverability alongside the other hooks in this directory) it holds no
 * React state and calls no other hooks internally, so it's safe to call
 * from inside a `useEffect` the same place you'd otherwise call
 * `gsap.matchMedia()` directly. This is a shared constants/setup helper,
 * not a global animation provider — each section still owns its own
 * `gsap.context()`/`mm.revert()` cleanup.
 */
export function useGsapMatchMedia() {
  const mm = gsap.matchMedia();
  return { mm, breakpoints: GSAP_BREAKPOINTS };
}
