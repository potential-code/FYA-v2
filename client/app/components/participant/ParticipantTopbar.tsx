"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@aegov/design-system-react";
import { useLanguage } from "../../context/LanguageContext";
import { mockChildProfile } from "@shared/content/mockDashboardData";

export function ParticipantTopbar({ title }: { title: string }) {
  const { t } = useTranslation("translation", { keyPrefix: "participant" });
  const { lang, toggleLang } = useLanguage();

  return (
    <div className="flex items-center justify-between gap-4 border-b border-stroke-soft bg-white px-6 py-4 md:px-9">
      <div className="text-lg font-bold text-brand-navy md:text-xl">{title}</div>
      <div className="flex items-center gap-3.5">
        <div className="hidden items-center gap-2 rounded-full bg-surface-accent px-4 py-2 text-[13.5px] font-bold text-brand-dark sm:flex">
          <span className="h-[9px] w-[9px] rounded-full bg-brand" />
          {t("pointsChip")}
        </div>
        <Button
          onClick={toggleLang}
          variant="outline"
          style="secondary"
          size="xs"
          className="rounded-full tracking-wide"
        >
          {lang === "ar" ? "EN" : "ع"}
        </Button>
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-brand text-[15px] font-bold text-white">
          {mockChildProfile.initial[lang]}
        </div>
      </div>
    </div>
  );
}
