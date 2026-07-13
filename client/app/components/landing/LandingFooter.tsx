"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { Hyperlink } from "@aegov/design-system-react";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function LandingFooter() {
  const { t: tc } = useTranslation("translation", { keyPrefix: "common" });
  const { t: tl } = useTranslation("translation", { keyPrefix: "landing" });
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative overflow-hidden bg-brand-navy py-16 text-white">
      {/* Actual logo watermark cropped to the symbol only (Arabic + English lines removed). */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -end-16 -top-10"
        initial={reduceMotion ? { opacity: 0.12 } : { opacity: 0 }}
        whileInView={{ opacity: 0.12 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 1.4, ease: "easeOut" }}
      >
        <div className="h-[205px] w-[440px] overflow-hidden">
          <Image src="/images/logo-white.png" alt="" width={880} height={676} className="w-full" />
        </div>
      </motion.div>

      <motion.div
        className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.3fr_1fr_1fr] md:px-12"
        variants={container}
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={item}>
          {/* Full actual logo (symbol + Arabic + English wordmark). */}
          <Image src="/images/logo-white.png" alt="Youth Leaders Path" width={200} height={154} className="h-auto w-[140px]" />
          <p className="mt-4 max-w-sm text-sm text-white/70">{tl("footerAbout")}</p>
        </motion.div>
        <motion.div variants={item}>
          <h4 className="text-sm font-semibold text-white/90">{tl("footerCol1")}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Hyperlink asChild className="!text-white/60 !no-underline transition-colors duration-200 hover:!text-white"><a href="#about">{tl("navAbout")}</a></Hyperlink></li>
            <li><Hyperlink asChild className="!text-white/60 !no-underline transition-colors duration-200 hover:!text-white"><a href="#journey">{tl("navJourney")}</a></Hyperlink></li>
            <li><Hyperlink asChild className="!text-white/60 !no-underline transition-colors duration-200 hover:!text-white"><a href="#pillars">{tl("navPillars")}</a></Hyperlink></li>
          </ul>
        </motion.div>
        <motion.div variants={item}>
          <h4 className="text-sm font-semibold text-white/90">{tl("footerCol2")}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Hyperlink asChild className="!text-white/60 !no-underline transition-colors duration-200 hover:!text-white"><Link href="/login">{tc("login")}</Link></Hyperlink></li>
            <li><Hyperlink asChild className="!text-white/60 !no-underline transition-colors duration-200 hover:!text-white"><Link href="/sign-up">{tc("registerNow")}</Link></Hyperlink></li>
          </ul>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative mx-auto mt-12 flex max-w-6xl flex-col items-center gap-2 border-t border-white/10 px-6 pt-6 text-xs text-white/50 md:flex-row md:justify-between md:px-12"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.5 }}
      >
        <span>{tc("footerCopy")}</span>
        <span>{tc("footerTag")}</span>
      </motion.div>
    </footer>
  );
}
