"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { weeklyEngagementDays } from "@shared/content/mockDashboardData";
import { Card } from "@aegov/design-system-react";
import { useLanguage } from "../../context/LanguageContext";

export function WeeklyEngagementChart() {
  const { t } = useTranslation("translation", { keyPrefix: "parent" });
  const { lang } = useLanguage();
  const maxMinutes = Math.max(...weeklyEngagementDays.map((d) => d.minutes), 1);

  return (
    <Card variant="news" bordered className="rounded-[18px] border-stroke-soft bg-white p-5 md:p-6">
      <div className="mb-4 text-base font-bold text-brand-navy">{t("weekTitle")}</div>
      <div className="mb-2.5 flex h-[76px] items-end gap-2">
        {weeklyEngagementDays.map((d, i) => {
          const heightPct = Math.max(8, (d.minutes / maxMinutes) * 100);
          return (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${heightPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                className={`w-full rounded-t-md rounded-b-sm ${
                  d.minutes > 0 ? "bg-gradient-to-b from-brand to-brand-dark" : "bg-surface-accent"
                }`}
              />
              <span className="text-[11px] text-muted-soft">{d.day[lang]}</span>
            </div>
          );
        })}
      </div>
      <div className="text-xs text-muted">{t("weekSub")}</div>
    </Card>
  );
}
