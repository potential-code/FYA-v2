"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { mockChildProfile } from "@shared/content/mockDashboardData";

export function ChildProgressHeader() {
  const { t } = useTranslation("translation", { keyPrefix: "parent" });
  const pct = mockChildProfile.overallProgressPct;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative mb-5 flex flex-col gap-6 overflow-hidden rounded-[20px] bg-gradient-to-br from-brand-navy via-[#2E4494] to-brand-dark p-6 text-white sm:flex-row sm:items-center sm:gap-7 md:p-8"
    >
      <div className="flex flex-shrink-0 h-16 w-16 items-center justify-center rounded-full border-2 border-white/45 bg-white/20 text-2xl font-bold md:h-[72px] md:w-[72px]">
        {t("childInitial")}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-3">
          <span className="text-xl font-bold md:text-2xl">{t("childName")}</span>
          <span className="rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold">{t("childActive")}</span>
        </div>
        <div className="text-sm opacity-90">{t("childMeta")}</div>
      </div>

      <div className="flex flex-wrap items-center gap-6 sm:gap-8">
        <QuickStat value={t("qs1v")} label={t("qs1l")} />
        <Divider />
        <QuickStat value={t("qs2v")} label={t("qs2l")} />
        <Divider />
        <QuickStat value={t("qs3v")} label={t("qs3l")} />
      </div>

      <div
        className="flex h-[100px] w-[100px] flex-shrink-0 items-center justify-center rounded-full md:h-[110px] md:w-[110px]"
        style={{ background: `conic-gradient(#fff 0 ${pct}%, rgba(255,255,255,.22) ${pct}% 100%)` }}
      >
        <div className="flex h-[78px] w-[78px] flex-col items-center justify-center rounded-full bg-[#2E4494] md:h-[86px] md:w-[86px]">
          <div className="text-xl font-bold md:text-2xl">{t("ringPct")}</div>
          <div className="text-[11px] opacity-85">{t("ringLabel")}</div>
        </div>
      </div>
    </motion.div>
  );
}

function QuickStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-xl font-bold md:text-2xl">{value}</div>
      <div className="text-xs opacity-80 md:text-[12.5px]">{label}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-9 w-px bg-white/30" />;
}
