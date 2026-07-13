"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Button } from "@aegov/design-system-react";
import { CaretDown } from "@phosphor-icons/react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useCountUp } from "@/app/hooks/useCountUp";
import { fmtNum } from "@/app/lib/utils";
import { ensureGsapRegistered } from "@/app/lib/gsapConfig";
import { useGsapMatchMedia } from "@/app/hooks/useGsapMatchMedia";
import { useSplitReveal } from "@/app/hooks/useSplitReveal";
import { useLenisScroll } from "./LenisProvider";
import { SoftBlob, CurvedRibbon } from "./BrandShapes";

const STATS = [
  { target: 1000, key: "stat1l" },
  { target: 6, key: "stat2l" },
  { target: 8, key: "stat3l" },
  { target: 40, key: "stat4l" },
];

// Line-mask reveal: each headline line rises from beneath a clipped container.
const lineWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};
const line: Variants = {
  hidden: { y: "120%" },
  show: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function HeroV2() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const { scrollTo } = useLenisScroll();

  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  // split-type kinetic reveal on the subheading (word-level → RTL-safe).
  useSplitReveal(subRef, { lang, delay: 1.1, duration: 0.8, stagger: lang === "ar" ? 0.05 : 0.012 });

  // GSAP: background parallax + content lift/dissolve hand-off into the next
  // section (desktop only; reduced-motion leaves everything static).
  useEffect(() => {
    ensureGsapRegistered();
    const { mm, breakpoints } = useGsapMatchMedia();
    mm.add({ isDesktop: breakpoints.isDesktop, reduce: breakpoints.reduce }, (ctx: gsap.Context) => {
      const { isDesktop, reduce } = ctx.conditions as { isDesktop: boolean; reduce: boolean };
      if (reduce || !isDesktop) return;
      const section = contentRef.current?.closest("section");
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { yPercent: 0 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.8 },
          },
        );
      }
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -70,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.6 },
        });
      }
    });
    return () => mm.revert();
  }, [lang]);

  return (
    <section
      data-nav-theme="dark"
      className="landing-v2 relative flex min-h-screen items-end overflow-hidden bg-brand-darker text-white"
    >
      {/* Full-bleed cinematic photo */}
      <div ref={bgRef} className="absolute -inset-y-[8%] inset-x-0">
        <Image
          src="/images/hero-group.png"
          alt={t("aboutImgAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* Periwinkle (light-blue) brand wash — kept light so the photo reads;
          a soft readability gradient sits only behind the text/stat column. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-darker/45 via-brand-dark/12 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-darker/55 via-brand-darker/10 to-transparent rtl:bg-gradient-to-l" />

      {/* Signature brand motif — soft curved peach/white shapes as glow accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <SoftBlob fill="#F4D7B9" className="absolute -right-24 -top-16 h-96 w-96 opacity-25 blur-3xl" />
        <SoftBlob fill="#FFFFFF" className="absolute -left-20 bottom-4 h-[26rem] w-[26rem] opacity-[0.12] blur-3xl" />
        <CurvedRibbon
          fill="#F8E6D2"
          className="absolute end-8 top-1/4 hidden h-72 w-28 opacity-[0.22] blur-[2px] md:block"
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-40 md:px-10"
      >
        {/* Badge */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-light opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-light" />
          </span>
          {t("heroBadge")}
        </motion.div>

        {/* Kinetic headline */}
        <motion.h1
          variants={reduceMotion ? undefined : lineWrap}
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          className="mt-7 max-w-4xl text-[2.75rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          <span className="block overflow-hidden pb-1">
            <motion.span variants={reduceMotion ? undefined : line} className="block">
              {t("heroTitle1")}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span variants={reduceMotion ? undefined : line} className="block text-white/90">
              {t("heroTitle2")}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span
              variants={reduceMotion ? undefined : line}
              className="animate-sheen block w-fit bg-clip-text text-transparent"
              style={{
                // Smooth periwinkle→peach→white shimmer (symmetric so it sweeps
                // gently with no hard split), readable on the periwinkle wash.
                backgroundImage:
                  "linear-gradient(90deg,#9AA8E2,#F4D7B9,#FFFFFF,#F4D7B9,#9AA8E2)",
                backgroundSize: "200% 100%",
              }}
            >
              {t("heroTitleAccent")}
            </motion.span>
          </span>
        </motion.h1>

        {/* Subheading (split-type) */}
        <p
          ref={subRef}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 opacity-0 md:text-lg"
        >
          {t("heroSub")}
        </p>

        {/* CTAs */}
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          transition={{ delay: 1.2 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link href="/sign-up">
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button variant="solid" style="primary" size="lg">
                {t("heroCta")}
              </Button>
            </motion.div>
          </Link>
          <motion.button
            type="button"
            onClick={() => scrollTo("#pillars", { offset: -60 })}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 25 }}
            className="glass-dark rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            {t("heroCta2")}
          </motion.button>
        </motion.div>

        {/* Stat row */}
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          transition={{ delay: 1.45 }}
          className="mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <StatBlock key={s.key} target={s.target} labelKey={s.key} lang={lang} t={t} />
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        aria-label={t("heroCta2")}
        onClick={() => scrollTo("#pillars", { offset: -60 })}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute inset-x-0 bottom-7 z-10 mx-auto flex w-fit flex-col items-center gap-1 text-white/50 transition hover:text-white/80"
      >
        <CaretDown size={20} weight="bold" className="animate-scroll-hint" />
      </motion.button>
    </section>
  );
}

function StatBlock({
  target,
  labelKey,
  lang,
  t,
}: {
  target: number;
  labelKey: string;
  lang: "ar" | "en";
  t: (key: string) => string;
}) {
  const value = useCountUp(target);
  const prefixPlus = target >= 1000;
  const display = fmtNum(value, lang);
  const label = prefixPlus ? (lang === "ar" ? `+${display}` : `${display}+`) : display;

  return (
    <div>
      <div className="font-nums text-3xl font-bold md:text-4xl">{label}</div>
      <div className="mt-1 text-xs leading-snug text-white/60 md:text-sm">{t(labelKey)}</div>
    </div>
  );
}
