"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ensureGsapRegistered } from "../lib/gsapConfig";

interface SplitRevealOptions {
  /** Active language — decides split granularity (see RTL note below). */
  lang: "ar" | "en";
  /** Extra effect deps beyond `lang` (e.g. a "ready" flag). */
  deps?: unknown[];
  /** Per-token stagger (seconds). */
  stagger?: number;
  /** Tween duration (seconds). */
  duration?: number;
  /** Start delay (seconds) — for mount reveals not tied to scroll. */
  delay?: number;
  /**
   * When set, the reveal is driven by a ScrollTrigger anchored on this element
   * (defaults to the target itself). Omit for an immediate on-mount reveal.
   */
  scrollTrigger?: boolean;
  /** ScrollTrigger start (default "top 85%"). */
  start?: string;
}

/**
 * Kinetic text reveal built on split-type + GSAP.
 *
 * RTL-critical: Arabic is a connected script — splitting it per-character breaks
 * contextual letter joining and renders gibberish. So we split **words** for
 * Arabic and **characters** for English. Lines are clipped (`overflow:hidden`)
 * so tokens rise cleanly from below like a mask reveal.
 *
 * Fully reduced-motion aware: when the user prefers reduced motion the text is
 * left untouched (no split, no tween) and simply shown.
 */
export function useSplitReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  {
    lang,
    deps = [],
    stagger,
    duration = 0.9,
    delay = 0,
    scrollTrigger = false,
    start = "top 85%",
  }: SplitRevealOptions,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    ensureGsapRegistered();

    const isArabic = lang === "ar";
    const split = new SplitType(el, {
      types: isArabic ? "lines,words" : "lines,words,chars",
      tagName: "span",
    });

    const targets = (isArabic ? split.words : split.chars) ?? split.words ?? [];
    if (split.lines) gsap.set(split.lines, { overflow: "hidden" });
    gsap.set(el, { opacity: 1 });

    const tween = gsap.from(targets, {
      yPercent: 115,
      opacity: 0,
      duration,
      delay: scrollTrigger ? 0 : delay,
      ease: "power4.out",
      stagger: stagger ?? (isArabic ? 0.06 : 0.02),
      scrollTrigger: scrollTrigger
        ? { trigger: el, start, once: true }
        : undefined,
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, ...deps]);
}
