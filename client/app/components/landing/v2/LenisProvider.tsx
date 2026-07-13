"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsapRegistered } from "../../../lib/gsapConfig";

interface LenisContextValue {
  /** Smooth-scroll to a target (selector, element, or offset). No-op if Lenis is disabled. */
  scrollTo: (target: string | HTMLElement | number, opts?: { offset?: number }) => void;
}

const LenisContext = createContext<LenisContextValue>({
  // Fallback: native anchor scroll when Lenis is unavailable / reduced-motion.
  scrollTo: (target) => {
    if (typeof window === "undefined") return;
    const el =
      typeof target === "string" ? document.querySelector(target) : target instanceof HTMLElement ? target : null;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  },
});

/**
 * Page-level buttery smooth scroll for the cinematic landing.
 *
 * - Bridges Lenis → GSAP ScrollTrigger (`lenis.on("scroll", ScrollTrigger.update)`
 *   + driving `lenis.raf` from the GSAP ticker) so every scroll-scrubbed section
 *   stays perfectly in sync with the smoothed scroll position.
 * - Fully disabled under `prefers-reduced-motion` (or when Lenis fails to init):
 *   the app falls back to native scroll and the context's `scrollTo` uses
 *   `scrollIntoView`, so nothing breaks.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [ctx, setCtx] = useState<LenisContextValue | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // keep native scroll + fallback scrollTo

    ensureGsapRegistered();

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    setCtx({
      scrollTo: (target, opts) =>
        lenis.scrollTo(target as string | HTMLElement | number, {
          offset: opts?.offset ?? 0,
          duration: 1.2,
        }),
    });

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={ctx ?? undefinedFallback}>{children}</LenisContext.Provider>;
}

// Stable fallback identity so consumers can call scrollTo before Lenis mounts.
const undefinedFallback: LenisContextValue = {
  scrollTo: (target) => {
    if (typeof window === "undefined") return;
    const el =
      typeof target === "string" ? document.querySelector(target) : target instanceof HTMLElement ? target : null;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  },
};

export function useLenisScroll() {
  return useContext(LenisContext);
}
