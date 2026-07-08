"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@aegov/design-system-react";

export function AboutSection() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const pills = t("aboutPills", { returnObjects: true }) as string[];

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:px-12">
      <div className="grid gap-14 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-brand">{t("aboutKicker")}</span>
          <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">
            {t("aboutTitle1")} <span className="text-brand">{t("aboutTitleAccent")}</span>
          </h2>
          <p className="mt-5 text-lg font-medium text-ink">{t("aboutLead")}</p>
          <p className="mt-4 text-ink-soft">{t("aboutBody")}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {pills.map((label) => (
              <span
                key={label}
                className="rounded-full border border-stroke bg-surface-soft px-3.5 py-1.5 text-xs font-medium text-ink-soft"
              >
                {label}
              </span>
            ))}
          </div>

          <Link href="/sign-up" className="mt-8 inline-block">
            <Button variant="solid" style="primary">
              {t("aboutCta")}
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
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
