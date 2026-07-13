"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "@phosphor-icons/react";
import { Button, Card } from "@aegov/design-system-react";

interface AboutCard {
  tag: string;
  title: string;
  points: string[];
}

interface AboutStat {
  value: string;
  label: string;
}

// Two brand-palette tints (peach + periwinkle) laid out as a checkerboard across
// the 2×2 grid — index order [peach, periwinkle, periwinkle, peach].
const TINTS = [
  {
    card: "border-[#EDE0CB] bg-[#FBF4EA]",
    tag: "bg-[#F1E3CB] text-[#8A6A2E]",
    check: "bg-[#F1E3CB] text-[#B07A2A]",
  },
  {
    card: "border-[#DCE2F7] bg-[#F2F4FD]",
    tag: "bg-[#E2E8FB] text-brand-dark",
    check: "bg-[#E2E8FB] text-brand",
  },
] as const;
const TINT_ORDER = [0, 1, 1, 0];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function AboutSection() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const cards = t("aboutCards", { returnObjects: true }) as AboutCard[];
  const stats = t("aboutStats", { returnObjects: true }) as AboutStat[];
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative overflow-clip py-24">
      {/* Section is full-bleed so these motifs sit at the true screen edges
          (an inner max-w wrapper holds the content). Clipped by overflow so
          they peek in — top-left blue, bottom-right peach. */}
      <Image
        src="/images/branding-motifs/cutout-logo-blue.png"
        alt=""
        aria-hidden
        width={1600}
        height={768}
        className="pointer-events-none absolute -left-8 -top-16 z-0 h-auto w-80 select-none opacity-80 md:w-[30rem]"
      />
      <Image
        src="/images/branding-motifs/cutout-logo-peach.png"
        alt=""
        aria-hidden
        width={1600}
        height={790}
        className="pointer-events-none absolute -bottom-10 -right-8 z-0 h-auto w-72 select-none opacity-90 md:w-[26rem]"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* Text + feature cards */}
        <motion.div
          variants={container}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.span variants={item} className="text-xs font-bold uppercase tracking-wide text-brand">
            {t("aboutKicker")}
          </motion.span>

          <motion.div variants={item} className="relative mt-3">
            {/* Brand arch motif overlapping the first letter of the heading */}
            <Image
              src="/images/branding-motifs/brand-arch-small-peach.png"
              alt=""
              aria-hidden
              width={120}
              height={120}
              className="pointer-events-none absolute -top-5 z-0 h-12 w-12 select-none"
            />
            <h2 className="relative z-10 text-2xl font-bold leading-tight text-brand-navy md:text-[32px]">
              {t("aboutTitle1")}{" "}
              <span className="bg-gradient-to-l from-brand to-brand-light bg-clip-text text-transparent">
                {t("aboutTitleAccent")}
              </span>
            </h2>
          </motion.div>

          <motion.p variants={item} className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            {t("aboutLead")}
          </motion.p>

          <div className="mt-7 grid gap-3.5 sm:grid-cols-2">
            {cards.map((card, i) => {
              const tint = TINTS[TINT_ORDER[i]];
              return (
                <motion.div key={card.tag} variants={item}>
                  <Card
                    variant="news"
                    bordered
                    className={`h-full rounded-2xl p-4 transition-shadow duration-300 hover:shadow-[0_14px_36px_rgba(99,128,211,0.12)] ${tint.card}`}
                  >
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${tint.tag}`}>
                      {card.tag}
                    </span>
                    <h3 className="mt-2.5 text-[14px] font-bold text-brand-navy">{card.title}</h3>
                    <ul className="mt-2 space-y-1.5">
                      {card.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-[12px] leading-snug text-ink-soft">
                          <span className={`mt-px flex h-4 w-4 flex-none items-center justify-center rounded ${tint.check}`}>
                            <Check size={11} weight="bold" />
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Image — pointed (sharp) top-left corner only, rounded on every other side */}
        <motion.div
          initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6 }}
          className="relative overflow-hidden rounded-tl-[90px] shadow-[0_24px_60px_rgba(7,14,67,0.12)] lg:sticky lg:top-24"
        >
          <Image
            src="/images/about-platform.png"
            alt={t("aboutImgAlt")}
            width={640}
            height={760}
            className="h-full w-full object-cover"
          />
          {/* Peach wave peeping in from the bottom-left of the image, smaller
              than full width and clipped by the parent's overflow-hidden. */}
          <Image
            src="/images/branding-motifs/wave-peach.png"
            alt=""
            aria-hidden
            width={1600}
            height={790}
            className="pointer-events-none absolute -left-8 bottom-0 z-10 h-auto w-[62%] max-w-none select-none"
          />
        </motion.div>
      </div>

      {/* Stat bar — soft peach → periwinkle gradient */}
      <motion.div
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6 }}
        className="mt-10"
      >
        <Card
          variant="news"
          className="overflow-hidden rounded-[28px] bg-gradient-to-r from-[#F5E1CB] via-[#C7C3DF] to-[#8E99D5] p-0 shadow-[0_20px_50px_rgba(110,130,205,0.22)]"
        >
          <div className="grid grid-cols-2 gap-y-7 py-8 md:grid-cols-4 md:divide-x md:divide-white/30 md:rtl:divide-x-reverse">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 text-center text-white">
                <div className="text-4xl font-bold leading-tight [text-shadow:0_4px_14px_rgba(7,14,67,0.65),0_2px_4px_rgba(7,14,67,0.55)] md:text-[52px]">
                  {stat.value}
                </div>
                <div className="mt-2 text-[12.5px] font-medium leading-snug text-white [text-shadow:0_2px_8px_rgba(7,14,67,0.6),0_1px_2px_rgba(7,14,67,0.5)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* CTA */}
      <div className="mt-9 flex justify-center">
        <Link href="/sign-up">
          <motion.div
            className="inline-block"
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button variant="solid" style="primary" size="lg">
              {t("aboutCta")}
            </Button>
          </motion.div>
        </Link>
      </div>
      </div>
    </section>
  );
}
