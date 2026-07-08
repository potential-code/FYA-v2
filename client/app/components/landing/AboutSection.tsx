"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@aegov/design-system-react";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function AboutSection() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const pills = t("aboutPills", { returnObjects: true }) as string[];
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:px-12">
      <div className="grid gap-14 md:grid-cols-2 md:items-center">
        <motion.div
          variants={container}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span variants={item} className="text-sm font-semibold uppercase tracking-wide text-brand">
            {t("aboutKicker")}
          </motion.span>
          <motion.h2 variants={item} className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">
            {t("aboutTitle1")} <span className="text-brand">{t("aboutTitleAccent")}</span>
          </motion.h2>
          <motion.p variants={item} className="mt-5 text-lg font-medium text-ink">
            {t("aboutLead")}
          </motion.p>
          <motion.p variants={item} className="mt-4 text-ink-soft">
            {t("aboutBody")}
          </motion.p>

          <motion.div variants={item} className="mt-6 flex flex-wrap gap-2">
            {pills.map((label) => (
              <motion.span
                key={label}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(99,128,211,0.18)" }}
                whileTap={{ scale: 0.98 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
                className="rounded-full border border-stroke bg-surface-soft px-3.5 py-1.5 text-xs font-medium text-ink-soft"
              >
                {label}
              </motion.span>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-8">
            <Link href="/sign-up" className="inline-block">
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 25 }}
              >
                <Button variant="solid" style="primary">
                  {t("aboutCta")}
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={reduceMotion ? undefined : { scale: 1.03 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <Image
            src="/images/about-platform.png"
            alt={t("aboutImgAlt")}
            width={640}
            height={720}
            className="h-auto w-full rounded-3xl object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
