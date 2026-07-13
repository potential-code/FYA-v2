"use client";

import { useTranslation } from "react-i18next";
import { phases } from "@shared/content/phases";
import { Card } from "@aegov/design-system-react";
import { useLanguage } from "../../context/LanguageContext";

// Phase 0 is "current", phase 1 is "next", phase 2 is "later" — matches the
// program's actual timeline position ported from Parent Portal.dc.html.
const STATUS = ["current", "next", "later"] as const;

export function ProgramTimeline() {
  const { t } = useTranslation("translation", { keyPrefix: "parent" });
  const { lang } = useLanguage();
  const chips = t("phaseChips", { returnObjects: true }) as Record<string, string>;

  return (
    <Card variant="news" bordered className="rounded-[18px] border-stroke-soft bg-white p-6 md:p-[26px]">
      <div className="mb-5 text-[17px] font-bold text-brand-navy">{t("timelineTitle")}</div>
      <div className="flex flex-col">
        {phases.map((phase, i) => {
          const status = STATUS[i];
          const isCurrent = status === "current";
          const isLater = status === "later";
          const isLast = i === phases.length - 1;
          return (
            <div key={phase.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${
                    isCurrent ? "border-brand bg-brand text-white" : "border-stroke-strong bg-white text-muted"
                  }`}
                >
                  {phase.num[lang]}
                </div>
                {!isLast && <div className="min-h-[18px] w-0.5 flex-1 bg-stroke-soft" />}
              </div>
              <div className={isLast ? "pb-0" : "pb-6"}>
                <div className="mb-1 flex flex-wrap items-center gap-2.5">
                  <span className={`text-[15px] font-bold ${isLater ? "text-muted" : "text-brand-navy"}`}>
                    {phase.title[lang]}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11.5px] font-bold ${
                      isCurrent ? "bg-surface-accent text-brand-dark" : "bg-surface-softer text-muted"
                    }`}
                  >
                    {chips[status]}
                  </span>
                </div>
                <div className="text-[13.5px] leading-relaxed text-muted">{phase.desc[lang]}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
