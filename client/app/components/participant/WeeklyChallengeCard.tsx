"use client";

import { useTranslation } from "react-i18next";

export function WeeklyChallengeCard() {
  const { t } = useTranslation("translation", { keyPrefix: "participant" });

  return (
    <div className="rounded-[18px] border border-stroke-soft bg-white p-5.5">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[15.5px] font-bold text-brand-navy">{t("taskTitle")}</div>
        <span className="rounded-full bg-warning/15 px-3 py-1 text-xs font-bold text-warning-dark">{t("taskChip")}</span>
      </div>
      <div className="mb-3.5 text-sm leading-relaxed text-ink-soft">{t("taskBody")}</div>
      <div className="mb-2 h-[7px] overflow-hidden rounded-full bg-surface-accent">
        <div className="h-full w-[60%] rounded-full bg-warning" />
      </div>
      <div className="text-[12.5px] text-muted">{t("taskProgress")}</div>
    </div>
  );
}
