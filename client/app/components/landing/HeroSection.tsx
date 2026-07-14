"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Button } from "@aegov/design-system-react";
import { useLanguage } from "../../context/LanguageContext";
import { useCountUp } from "../../hooks/useCountUp";
import { fmtNum } from "../../lib/utils";
import { ensureGsapRegistered } from "../../lib/gsapConfig";
import { useGsapMatchMedia } from "../../hooks/useGsapMatchMedia";
import { LandingNav } from "./LandingNav";

const STAT_TARGETS = [6, 8, 40];
const STAT_LABEL_KEYS = ["stat2l", "stat3l", "stat4l"];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function HeroSection() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    const { mm, breakpoints } = useGsapMatchMedia();

    mm.add(
      {
        isDesktop: breakpoints.isDesktop,
        reduce: breakpoints.reduce,
      },
      (context) => {
        const { isDesktop, reduce } = context.conditions as { isDesktop: boolean; reduce: boolean };

        if (reduce) {
          if (bgRef.current) gsap.set(bgRef.current, { yPercent: 0 });
          if (contentRef.current) gsap.set(contentRef.current, { opacity: 1, y: 0, scale: 1 });
          return;
        }

        // Both the background parallax and the scroll-out exit are desktop-only
        // cinematic payoffs — mobile keeps only the FM mount-stagger.
        if (!isDesktop) return;

        if (bgRef.current) {
          gsap.fromTo(
            bgRef.current,
            { yPercent: 0 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: bgRef.current.parentElement,
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        }

        if (contentRef.current) {
          gsap.to(contentRef.current, {
            opacity: 0,
            y: -60,
            scale: 0.97,
            ease: "none",
            scrollTrigger: {
              trigger: contentRef.current.closest("section"),
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }
      },
    );

    return () => mm.revert();
    // AR/EN text-length differences shift content height and therefore
    // ScrollTrigger start/end positions — re-run on language toggle.
  }, [lang]);

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-[#1B2237] text-white">
      <LandingNav />
      <div ref={bgRef} className="absolute -inset-y-[10%] inset-x-0">
        <Image
          src="/images/hero-group.png"
          alt={t("aboutImgAlt")}
          fill
          priority
          className="object-cover"
        />
      </div>
      {/* Youth Leaders Path hero overlay: desaturated near-black navy (#1B2237)
          instead of the saturated brand-navy (#070E43) so the bottom fade reads
          as a neutral dark gradient rather than a blue glow. */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B2237] via-[#1B2237]/70 to-[#1B2237]/20" />

      {/* Faint oversized brand motif anchored to the bottom-left of the hero */}
      <Image
        src="/images/branding-motifs/cutout-logo-blue.png"
        alt=""
        aria-hidden
        width={1600}
        height={768}
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-auto w-[68%] max-w-[760px] select-none opacity-[0.09]"
      />

      <motion.div
        ref={contentRef}
        variants={container}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-40 md:px-12"
      >
        <motion.h1 variants={item} className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          {t("heroTitle1")} {t("heroTitle2")}{" "}
          <span className="bg-gradient-to-r from-brand-light to-white bg-clip-text text-transparent">
            {t("heroTitleAccent")}
          </span>
        </motion.h1>

        <motion.p variants={item} className="mt-5 max-w-2xl text-base text-white/80 md:text-lg">
          {t("heroSub")}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
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
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button
              asChild
              variant="outline"
              style="secondary"
              size="lg"
              className="border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
            >
              <a href="#journey">{t("heroCta2")}</a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/15 pt-8"
        >
          {STAT_TARGETS.map((target, i) => (
            <StatBlock key={i} target={target} labelKey={STAT_LABEL_KEYS[i]} lang={lang} t={t} />
          ))}
        </motion.div>
      </motion.div>
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
  const display = lang === "ar" ? `+${fmtNum(value, lang)}` : `${fmtNum(value, lang)}+`;
  const displayExact = target < 1000 ? fmtNum(value, lang) : display;

  return (
    <div>
      <div className="text-3xl font-bold md:text-4xl">{displayExact}</div>
      <div className="mt-1 text-sm text-white/70">{t(labelKey)}</div>
    </div>
  );
}
