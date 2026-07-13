"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Card, Button } from "@aegov/design-system-react";
import { pillars } from "@shared/content/pillars";
import { mockChildProfile } from "@shared/content/mockDashboardData";
import { useLanguage } from "../../context/LanguageContext";
import { fmtNum } from "../../lib/utils";
import { JourneyStepper } from "./JourneyStepper";

export function DashboardHeroCard({ onContinue }: { onContinue: () => void }) {
  const { t } = useTranslation("translation", { keyPrefix: "participant" });
  const { lang } = useLanguage();
  const currentPillar = pillars[mockChildProfile.currentPillarIndex];

  return (
    <Card variant="news" className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-brand-navy via-[#2E4494] to-brand-dark p-6 text-white sm:p-7">
      <Image
        src="/images/logo-white.png"
        alt=""
        width={360}
        height={96}
        className="pointer-events-none absolute -end-12 top-0 -mt-14 w-[360px] opacity-[0.07]"
      />

      <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row">
        <div>
          <div className="mb-1.5 text-[13.5px] opacity-80">{t("heroKicker")}</div>
          <div className="mb-2 text-2xl font-bold leading-snug sm:text-[27px]">{t("heroTitle")}</div>
          <div className="max-w-[56ch] text-[15px] leading-relaxed opacity-85">
            {t("heroSub", { pillar: currentPillar.title[lang] })}
          </div>
        </div>
        <div className="flex flex-shrink-0 gap-2.5">
          <div className="rounded-xl border border-white/20 bg-white/[0.13] px-4 py-2.5 text-center backdrop-blur-sm">
            <div className="text-[19px] font-bold">{fmtNum(mockChildProfile.points, lang)}</div>
            <div className="text-[11.5px] opacity-80">{t("chipPointsL")}</div>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/[0.13] px-4 py-2.5 text-center backdrop-blur-sm">
            <div className="text-[19px] font-bold">{fmtNum(mockChildProfile.dayStreak, lang)}</div>
            <div className="text-[11.5px] opacity-80">{t("chipStreakL")}</div>
          </div>
        </div>
      </div>

      <div className="relative mt-3.5 border-t border-white/[0.16] pt-3">
        <div className="mb-6 flex items-baseline justify-between">
          <span className="text-[15px] font-bold">{t("journeyLabel")}</span>
          <span className="text-[12.5px] opacity-70">{t("journeySubLabel")}</span>
        </div>

        <JourneyStepper currentIndex={mockChildProfile.currentPillarIndex} />

        <div className="mt-2 flex items-center gap-3.5 rounded-2xl border border-white/[0.18] bg-white/[0.12] p-3.5 backdrop-blur-sm sm:gap-4">
          <span className="flex-shrink-0 rounded-full bg-white px-3 py-1 text-[11px] font-bold tracking-wide text-brand-darker">
            {t("nextChip")}
          </span>
          <span className="flex-1 text-sm font-medium opacity-95">
            {t("nextModule")} · {t("nextMeta")}
          </span>
          <Button
            onClick={onContinue}
            size="sm"
            className="flex-shrink-0 rounded-lg bg-white px-6 text-[13.5px] font-bold text-brand-navy hover:-translate-y-px hover:bg-white"
          >
            {t("heroCta")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
