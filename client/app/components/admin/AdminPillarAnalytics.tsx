"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card } from "@aegov/design-system-react";
import { pillars } from "@shared/content/pillars";
import { pillarAverageScores, pillarScoreDeltas, pillarScoreDistribution, trackComparisonScores } from "@shared/content/mockDashboardData";
import { useLanguage } from "../../context/LanguageContext";
import { fmtNum } from "../../lib/utils";

export function AdminPillarAnalytics() {
  const { t } = useTranslation("translation", { keyPrefix: "admin" });
  const { lang } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar, i) => {
          const [low, mid, high] = pillarScoreDistribution[i];
          return (
            <Card
              key={pillar.id}
              asChild
              variant="news"
              bordered
              className="overflow-hidden rounded-2xl border-stroke bg-white p-0"
            >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <div className="relative h-28 w-full">
                <Image src={`/images/pillar-${i + 1}.png`} alt={pillar.title[lang]} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-sm font-bold text-brand-navy">{pillar.title[lang]}</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-brand-navy">{fmtNum(pillarAverageScores[i], lang)}</span>
                  <span className="text-xs text-muted">{t("avgLabel")}</span>
                  <span className="ms-auto text-xs font-semibold text-success">
                    +{fmtNum(pillarScoreDeltas[i], lang)}
                  </span>
                </div>
                <div className="mt-3 flex h-2 overflow-hidden rounded-full">
                  <div className="bg-danger" style={{ width: `${low}%` }} title={t("distLow")} />
                  <div className="bg-warning" style={{ width: `${mid}%` }} title={t("distMid")} />
                  <div className="bg-success" style={{ width: `${high}%` }} title={t("distHigh")} />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-muted">
                  <span>{t("distLow")}</span>
                  <span>{t("distMid")}</span>
                  <span>{t("distHigh")}</span>
                </div>
              </div>
            </motion.div>
            </Card>
          );
        })}
      </div>

      <Card variant="news" bordered className="rounded-2xl border-stroke bg-white p-6">
        <h3 className="text-base font-bold text-brand-navy">{t("trackCompTitle")}</h3>
        <p className="mt-1 text-sm text-muted">{t("trackCompSub")}</p>
        <div className="mt-6 space-y-4">
          {pillars.map((pillar, i) => (
            <div key={pillar.id}>
              <div className="mb-1.5 text-sm text-ink-soft">{pillar.title[lang]}</div>
              <div className="flex gap-2">
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-accent">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${trackComparisonScores[i].a}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="h-full rounded-full bg-brand-light"
                  />
                </div>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-accent">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${trackComparisonScores[i].b}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="h-full rounded-full bg-brand-dark"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-5 text-xs text-muted">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-light" /> Track A</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-dark" /> Track B</span>
        </div>
      </Card>
    </div>
  );
}
