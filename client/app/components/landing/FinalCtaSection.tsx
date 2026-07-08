"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@aegov/design-system-react";

export function FinalCtaSection() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });

  return (
    <section className="relative overflow-hidden py-28 text-center text-white">
      <Image src="/images/cta-bg.jpg" alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-brand-navy/80" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-2xl px-6"
      >
        <h2 className="text-3xl font-bold md:text-4xl">{t("ctaTitle")}</h2>
        <p className="mt-4 text-white/80">{t("ctaSub")}</p>
        <Link href="/sign-up" className="mt-8 inline-block">
          <Button variant="solid" style="primary" size="lg">
            {t("ctaBtn")}
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
