"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { pillars } from "@shared/content/pillars";
import { adminKpis, selectionFunnel, pillarAverageScores, recentRegistrations } from "@shared/content/mockDashboardData";
import { useLanguage } from "../../context/LanguageContext";
import { StatCard } from "../dashboard/StatCard";
import { fmtNum } from "../../lib/utils";

function timeAgoLabel(minutesAgo: number, lang: "ar" | "en") {
  if (minutesAgo < 60) {
    return lang === "ar" ? `قبل ${fmtNum(minutesAgo, lang)} دقيقة` : `${minutesAgo} min ago`;
  }
  const hours = Math.round(minutesAgo / 60);
  return lang === "ar" ? `قبل ${fmtNum(hours, lang)} ساعة` : `${hours} hr${hours > 1 ? "s" : ""} ago`;
}

export function AdminOverview() {
  const { t } = useTranslation("translation", { keyPrefix: "admin" });
  const { lang } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminKpis.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            <StatCard label={kpi.label[lang]} value={kpi.value[lang]} sub={kpi.sub[lang]} tone={kpi.tone} />
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Selection funnel */}
        <div className="rounded-2xl border border-stroke bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-brand-navy">{t("funnelTitle")}</h3>
            <span className="rounded-full bg-surface-accent px-3 py-1 text-xs font-bold text-brand-dark">{t("funnelChip")}</span>
          </div>
          <p className="mt-1 text-sm text-muted">{t("funnelSub")}</p>

          <div className="mt-6 space-y-4">
            {selectionFunnel.map((step) => (
              <div key={step.label[lang]}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-ink-soft">{step.label[lang]}</span>
                  <span className={`font-bold ${step.final ? "text-success" : "text-brand-dark"}`}>{step.value[lang]}</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-accent">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${step.widthPct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: step.final ? "linear-gradient(90deg,#3E9B6E,#54B584)" : "linear-gradient(90deg,#4E6BC4,#6380D3)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent registrations */}
        <div className="rounded-2xl border border-stroke bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-brand-navy">{t("recentTitle")}</h3>
            <button className="text-xs font-semibold text-brand">{t("viewAll")}</button>
          </div>
          <ul className="mt-4 space-y-3">
            {recentRegistrations.map((r) => (
              <li key={r.name.en} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-accent text-sm font-bold text-brand-dark">
                  {r.name[lang].charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-ink">{r.name[lang]}</div>
                  <div className="truncate text-xs text-muted">{r.meta[lang]}</div>
                </div>
                <span className="shrink-0 text-xs text-muted">{timeAgoLabel(r.minutesAgo, lang)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Pillar average bar chart */}
        <div className="rounded-2xl border border-stroke bg-white p-6">
          <h3 className="text-base font-bold text-brand-navy">{t("avgTitle")}</h3>
          <p className="mt-1 text-sm text-muted">{t("avgSub")}</p>
          <div className="mt-6 flex items-end gap-4" style={{ height: 160 }}>
            {pillars.map((pillar, i) => (
              <div key={pillar.id} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${pillarAverageScores[i]}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.06 }}
                  className="w-full rounded-t-md bg-brand"
                  style={{ maxHeight: 120 }}
                />
                <span className="text-xs font-bold text-brand-navy">{fmtNum(pillarAverageScores[i], lang)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Track distribution */}
        <div className="rounded-2xl border border-stroke bg-white p-6">
          <h3 className="text-base font-bold text-brand-navy">{t("trackTitle")}</h3>
          <p className="mt-1 text-sm text-muted">{t("trackSub")}</p>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-ink-soft">{t("trackA")}</span>
              <span className="font-bold text-brand-navy">{t("trackAv")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-soft">{t("trackB")}</span>
              <span className="font-bold text-brand-navy">{t("trackBv")}</span>
            </div>
            <div className="my-3 h-px bg-stroke" />
            <div className="flex items-center justify-between">
              <span className="text-ink-soft">{t("emirates")}</span>
              <span className="font-bold text-brand-navy">{t("emiratesV")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-soft">{t("avgTime")}</span>
              <span className="font-bold text-brand-navy">{t("avgTimeV")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-soft">{t("completion")}</span>
              <span className="font-bold text-brand-navy">{t("completionV")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
