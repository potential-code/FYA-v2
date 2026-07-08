import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Idempotently registers the GSAP plugins this app relies on (currently just
 * ScrollTrigger). Call this at the top of every GSAP-using component's
 * effect instead of repeating `gsap.registerPlugin(...)` boilerplate.
 *
 * Safe to call on the server — it's a no-op until `window` exists, matching
 * the guard the original JourneySection registration used.
 */
export function ensureGsapRegistered() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}
