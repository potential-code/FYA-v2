"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Lightning, Pencil, Target, House, type Icon } from "@phosphor-icons/react";
import { Button } from "@aegov/design-system-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { ensureGsapRegistered } from "@/app/lib/gsapConfig";
import { useGsapMatchMedia } from "@/app/hooks/useGsapMatchMedia";
import { useSplitReveal } from "@/app/hooks/useSplitReveal";

const POINT_ICONS: Record<string, Icon> = { lightning: Lightning, pencil: Pencil, target: Target, house: House };

interface AboutPoint {
  icon: string;
  title: string;
  desc: string;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const lineWrap: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } };
const line: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Mission — "The Call". A scroll-driven story on a light canvas: the headline
 * rises in, a large pull-quote reveals word-by-word (split-type), the platform
 * photo and brand petals drift at different parallax depths (GSAP), and the four
 * value points cascade in. Reuses `landing.about*` copy.
 */
export function MissionV2() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();

  const pills = t("aboutPills", { returnObjects: true }) as unknown as string[];
  const points = t("aboutPoints", { returnObjects: true }) as unknown as AboutPoint[];
  const imgRadius = lang === "ar" ? "1.5rem 6rem 1.5rem 1.5rem" : "6rem 1.5rem 1.5rem 1.5rem";

  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const petalARef = useRef<HTMLImageElement>(null);
  const petalBRef = useRef<HTMLImageElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  // Word-by-word reveal on the story pull-quote (RTL-safe).
  useSplitReveal(quoteRef, { lang, scrollTrigger: true, duration: 0.7, start: "top 80%" });

  // Layered parallax (desktop only, reduced-motion safe).
  useEffect(() => {
    ensureGsapRegistered();
    const { mm, breakpoints } = useGsapMatchMedia();
    mm.add({ isDesktop: breakpoints.isDesktop, reduce: breakpoints.reduce }, (ctx: gsap.Context) => {
      const { isDesktop, reduce } = ctx.conditions as { isDesktop: boolean; reduce: boolean };
      if (reduce || !isDesktop) return;
      const st = { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 };
      if (imageRef.current) gsap.fromTo(imageRef.current, { yPercent: 8 }, { yPercent: -8, ease: "none", scrollTrigger: st });
      if (petalARef.current) gsap.fromTo(petalARef.current, { yPercent: 24 }, { yPercent: -24, ease: "none", scrollTrigger: st });
      if (petalBRef.current) gsap.fromTo(petalBRef.current, { yPercent: -18 }, { yPercent: 18, ease: "none", scrollTrigger: st });
    });
    return () => mm.revert();
  }, [lang]);

  return (
    <section
      id="about"
      ref={sectionRef}
      data-nav-theme="light"
      className="landing-v2-light relative overflow-hidden bg-surface-soft py-24 text-ink md:py-32"
    >
      <Image
        ref={petalARef}
        src="/images/brand-arch-peach.png"
        alt=""
        aria-hidden
        width={420}
        height={420}
        className="pointer-events-none absolute -start-24 top-10 w-72 opacity-40 will-change-transform"
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Story intro */}
        <div className="max-w-3xl">
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.22em] text-brand"
          >
            {t("aboutKicker")}
          </motion.span>
          <motion.h2
            variants={reduceMotion ? undefined : lineWrap}
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-3 text-3xl font-bold leading-tight text-brand-navy md:text-5xl"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span variants={reduceMotion ? undefined : line} className="block">
                {t("aboutTitle1")}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span variants={reduceMotion ? undefined : line} className="block text-brand">
                {t("aboutTitleAccent")}
              </motion.span>
            </span>
          </motion.h2>
        </div>

        {/* Pull-quote — the story beat */}
        <p
          ref={quoteRef}
          className="mt-10 max-w-4xl text-2xl font-semibold leading-snug text-brand-navy opacity-0 md:text-4xl"
        >
          {t("aboutStory")}
        </p>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* text */}
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-ink-soft md:text-lg">
              {t("aboutLead")}
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              {t("aboutBody")}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full bg-surface-accent px-3.5 py-1.5 text-xs font-medium text-brand-darker ring-1 ring-stroke"
                >
                  {pill}
                </span>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8">
              <Link href="/sign-up">
                <motion.span
                  className="inline-block"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button variant="solid" style="primary" size="lg">
                    {t("aboutCta")}
                  </Button>
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* arch-framed image */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-md"
          >
            <Image
              ref={petalBRef}
              src="/images/brand-arch-blue.png"
              alt=""
              aria-hidden
              width={320}
              height={320}
              className="pointer-events-none absolute -bottom-10 -end-10 -z-10 w-52 opacity-80 will-change-transform"
            />
            <div
              ref={imageRef}
              className="relative aspect-[4/5] overflow-hidden shadow-[0_30px_60px_rgba(7,14,67,0.18)] will-change-transform"
              style={{ borderRadius: imgRadius }}
            >
              <Image
                src="/images/about-platform.png"
                alt={t("aboutImgAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 28rem"
                className="object-cover"
              />
            </div>
            <Image
              src="/images/youth-leaders-motif-blue.png"
              alt=""
              aria-hidden
              width={180}
              height={121}
              className="pointer-events-none absolute -start-8 -top-8 w-32 opacity-90"
            />
          </motion.div>
        </div>

        {/* four value points cascade */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point, i) => {
            const PIcon = POINT_ICONS[point.icon] ?? Lightning;
            return (
              <motion.div
                key={point.title}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                className="rounded-2xl border border-stroke bg-white p-6 shadow-[0_12px_30px_rgba(99,128,211,0.08)] transition-shadow hover:shadow-[0_18px_44px_rgba(99,128,211,0.16)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-accent text-brand">
                  <PIcon size={26} weight="light" />
                </div>
                <h3 className="mt-4 text-base font-bold text-brand-navy">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{point.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
