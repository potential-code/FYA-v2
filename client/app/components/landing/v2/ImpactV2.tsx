"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { CaretDown, MapPin } from "@phosphor-icons/react";
import { useCountUp } from "@/app/hooks/useCountUp";
import { fmtNum } from "@/app/lib/utils";
import { useLanguage } from "@/app/context/LanguageContext";

/**
 * Impact — "From 1000 to the top 40". Light section with an animated selection
 * funnel (count-ups start when scrolled into view). Reuses `useCountUp`/`fmtNum`
 * and the `landing.impact*` copy.
 */
export function ImpactV2() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [started, setStarted] = useState(false);

  const steps: { width: string; bg: string; num: number | null; plus?: boolean; label: string }[] = [
    { width: "100%", bg: "#6E82CD", num: 1000, plus: true, label: t("impactStep1Label") },
    { width: "64%", bg: "#3B4A8F", num: null, label: t("impactStep2Label") },
    { width: "38%", bg: "#070E43", num: 40, plus: false, label: t("impactStep3Label") },
  ];

  return (
    <section
      data-nav-theme="light"
      className="landing-v2-light relative overflow-hidden bg-surface-soft py-24 text-ink md:py-32"
    >
      <Image
        src="/images/brand-arch-peach.png"
        alt=""
        aria-hidden
        width={420}
        height={420}
        className="pointer-events-none absolute -end-24 bottom-0 w-72 opacity-40"
      />

      <div className="relative mx-auto max-w-4xl px-6 md:px-10">
        <div className="text-center">
          <span className="text-xs font-semibold tracking-[0.22em] text-brand">{t("impactKicker")}</span>
          <h2 className="mx-auto mt-3 max-w-xl text-3xl font-bold leading-tight text-brand-navy md:text-5xl">
            {t("impactTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">{t("impactSub")}</p>
        </div>

        <motion.div
          onViewportEnter={() => setStarted(true)}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-14 flex max-w-2xl flex-col items-center"
        >
          {steps.map((step, i) => (
            <div key={i} className="flex w-full flex-col items-center">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scaleX: 0.6 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="flex items-center justify-between rounded-2xl px-6 py-5 text-white shadow-[0_16px_40px_rgba(7,14,67,0.18)]"
                style={{ width: step.width, background: step.bg, minWidth: "13rem" }}
              >
                <span className="font-nums text-2xl font-bold md:text-3xl">
                  {step.num === null ? "…" : <FunnelNum target={step.num} plus={!!step.plus} started={started} lang={lang} />}
                </span>
                <span className="ms-4 text-xs font-medium text-white/85 md:text-sm">{step.label}</span>
              </motion.div>
              {i < steps.length - 1 && (
                <CaretDown size={22} weight="bold" className="my-2 text-brand/40" />
              )}
            </div>
          ))}
        </motion.div>

        <div className="mt-12 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-darker ring-1 ring-stroke">
            <MapPin size={18} weight="fill" className="text-brand" />
            {t("impactEmirates")}
          </span>
        </div>
      </div>
    </section>
  );
}

function FunnelNum({
  target,
  plus,
  started,
  lang,
}: {
  target: number;
  plus: boolean;
  started: boolean;
  lang: "ar" | "en";
}) {
  const value = useCountUp(started ? target : 0, { delay: 200 });
  const display = fmtNum(value, lang);
  if (!plus) return <>{display}</>;
  return <>{lang === "ar" ? `+${display}` : `${display}+`}</>;
}
