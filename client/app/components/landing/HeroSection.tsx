"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@aegov/design-system-react";
import { useLanguage } from "../../context/LanguageContext";
import { useCountUp } from "../../hooks/useCountUp";
import { fmtNum } from "../../lib/utils";
import { LandingNav } from "./LandingNav";

const STAT_TARGETS = [1000, 6, 8, 40];
const STAT_LABEL_KEYS = ["stat1l", "stat2l", "stat3l", "stat4l"];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.6, ease: "easeOut" as const },
  }),
};

export function HeroSection() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const { lang } = useLanguage();

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-brand-navy text-white">
      <LandingNav />
      <Image
        src="/images/hero-group.png"
        alt={t("aboutImgAlt")}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/20" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-40 md:px-12">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur"
        >
          {t("heroBadge")}
        </motion.span>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl"
        >
          {t("heroTitle1")} {t("heroTitle2")}{" "}
          <span className="bg-gradient-to-r from-brand-light to-white bg-clip-text text-transparent">
            {t("heroTitleAccent")}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-5 max-w-2xl text-base text-white/80 md:text-lg"
        >
          {t("heroSub")}
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-8 flex flex-wrap gap-4">
          <Link href="/sign-up">
            <Button variant="solid" style="primary" size="lg">
              {t("heroCta")}
            </Button>
          </Link>
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

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/15 pt-8"
        >
          {STAT_TARGETS.map((target, i) => (
            <StatBlock key={i} target={target} labelKey={STAT_LABEL_KEYS[i]} lang={lang} t={t} />
          ))}
        </motion.div>
      </div>
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
