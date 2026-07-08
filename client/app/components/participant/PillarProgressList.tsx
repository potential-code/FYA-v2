"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { pillars } from "@shared/content/pillars";
import { mockChildProfile } from "@shared/content/mockDashboardData";
import { useLanguage } from "../../context/LanguageContext";
import { fmtNum } from "../../lib/utils";

/** Fixed pillar completion percentages ported from Participant Portal.dc.html
 * (pillar 1 complete, pillar 2 — the current one — in progress, rest untouched). */
const PILLAR_PCTS = [100, 64, 0, 0, 0, 0];

export function PillarProgressList({ onViewJourney }: { onViewJourney: () => void }) {
  const { t } = useTranslation("translation", { keyPrefix: "participant" });
  const { lang } = useLanguage();

  return (
    <div className="rounded-[18px] border border-stroke-soft bg-white p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="text-[17px] font-bold text-brand-navy">{t("pillarsCardTitle")}</div>
        <button onClick={onViewJourney} className="text-sm font-bold text-brand-dark hover:text-brand">
          {t("viewJourney")}
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {pillars.map((pillar, i) => {
          const pct = PILLAR_PCTS[i];
          const active = pct > 0;
          return (
            <div key={pillar.id} className="flex items-center gap-3.5">
              <Image
                src={`/images/pillar-${i + 1}.png`}
                alt=""
                width={40}
                height={40}
                className={`h-10 w-10 flex-shrink-0 rounded-[10px] object-cover ${active ? "" : "opacity-45"}`}
              />
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex justify-between">
                  <span className={`text-sm font-medium ${active ? "text-brand-navy" : "text-muted"}`}>{pillar.title[lang]}</span>
                  <span className={`text-[13px] font-bold ${active ? "text-brand-dark" : "text-stroke-strong"}`}>
                    {fmtNum(pct, lang)}{lang === "ar" ? "٪" : "%"}
                  </span>
                </div>
                <div className="h-[7px] overflow-hidden rounded-full bg-surface-accent">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-dark to-brand" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
