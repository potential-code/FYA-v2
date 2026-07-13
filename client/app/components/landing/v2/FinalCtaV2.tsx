"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@aegov/design-system-react";

/**
 * Final CTA — "Tomorrow's leaders". Deep-navy cinematic finale with the brand
 * photo, petal-glow motifs and a single Apply CTA. Reuses `landing.cta*`.
 */
export function FinalCtaV2() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      data-nav-theme="dark"
      className="landing-v2 relative overflow-hidden bg-brand-navy py-28 text-white md:py-36"
    >
      {/* photo backdrop */}
      <Image src="/images/cta-bg.jpg" alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/85 via-brand-navy/80 to-brand-navy" />

      {/* petal glow motifs */}
      <Image
        src="/images/brand-arch-blue.png"
        alt=""
        aria-hidden
        width={520}
        height={520}
        className="pointer-events-none absolute -start-20 -top-16 w-80 opacity-30 blur-[2px]"
      />
      <Image
        src="/images/brand-arch-peach.png"
        alt=""
        aria-hidden
        width={480}
        height={480}
        className="pointer-events-none absolute -end-16 bottom-0 w-72 opacity-25 blur-[2px]"
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        <Image
          src="/images/youth-leaders-motif-peach.png"
          alt=""
          aria-hidden
          width={120}
          height={81}
          className="mx-auto mb-6 w-20 opacity-90"
        />
        <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight md:text-5xl">{t("ctaTitle")}</h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">{t("ctaSub")}</p>
        <div className="mt-9 flex justify-center">
          <Link href="/sign-up">
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button variant="solid" style="primary" size="lg">
                {t("ctaBtn")}
              </Button>
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
