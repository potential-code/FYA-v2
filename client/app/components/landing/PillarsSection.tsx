"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { pillars } from "@shared/content/pillars";
import { useLanguage } from "../../context/LanguageContext";
import { Card } from "@aegov/design-system-react";

export function PillarsSection() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const { lang } = useLanguage();

  return (
    <section id="pillars" className="py-24">
      <div className="mx-auto max-w-6xl px-6 text-center md:px-12">
        <span className="text-sm font-semibold uppercase tracking-wide text-brand">{t("pillarsKicker")}</span>
        <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">{t("pillarsTitle")}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-ink-soft">{t("pillarsSub")}</p>
      </div>

      <div className="mt-16 flex flex-col">
        {pillars.map((pillar, i) => {
          const flip = i % 2 === 1;
          const bg = i % 2 ? "bg-surface-soft" : "bg-white";
          return (
            <div key={pillar.id} className={`${bg} py-14`}>
              <div className="mx-auto max-w-6xl px-6 md:px-12">
                <Card asChild variant="default" size="lg" bordered className="overflow-hidden p-0">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className={`grid gap-8 p-6 md:grid-cols-2 md:items-center md:p-8 ${
                      flip ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image
                        src={pillar.id ? `/images/pillar-${i + 1}.png` : ""}
                        alt={pillar.title[lang]}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                        {pillar.num[lang]}
                      </div>
                      <h3 className="mt-4 text-2xl font-bold text-brand-navy">{pillar.title[lang]}</h3>
                      <p className="mt-3 text-ink-soft">{pillar.desc[lang]}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {pillar.tags[lang].map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-stroke bg-white px-3 py-1 text-xs font-medium text-ink-soft"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
