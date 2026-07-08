"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import { pillars } from "@shared/content/pillars";
import { useLanguage } from "../../context/LanguageContext";
import { fmtNum } from "../../lib/utils";
import { ProgressBar } from "../dashboard/ProgressBar";

// Ported verbatim from Parent Portal.dc.html — Ahmed has completed pillar 1,
// is partway through pillar 2, and hasn't started 3-6 yet.
const PILLAR_PCTS = [100, 64, 0, 0, 0, 0];

export function PillarProgressList() {
  const { t } = useTranslation("translation", { keyPrefix: "parent" });
  const { lang } = useLanguage();

  return (
    <div className="rounded-[18px] border border-stroke-soft bg-white p-6 md:p-[26px]">
      <div className="mb-1.5 text-[17px] font-bold text-brand-navy">{t("pillarsTitle")}</div>
      <div className="mb-5 text-sm text-muted">{t("pillarsSub")}</div>
      <div className="flex flex-col gap-4">
        {pillars.map((pillar, i) => {
          const pct = PILLAR_PCTS[i];
          const started = pct > 0;
          return (
            <div key={pillar.id} className="flex items-center gap-3.5">
              <div className="relative h-[38px] w-[38px] flex-shrink-0 overflow-hidden rounded-[10px]" style={{ opacity: started ? 1 : 0.45 }}>
                <Image src={`/images/pillar-${i + 1}.png`} alt="" fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex justify-between">
                  <span className={started ? "text-sm font-medium text-ink" : "text-sm font-medium text-muted"}>
                    {pillar.title[lang]}
                  </span>
                  <span className={started ? "text-[13px] font-bold text-brand-dark" : "text-[13px] font-bold text-muted-soft"}>
                    {fmtNum(pct, lang)}{lang === "ar" ? "٪" : "%"}
                  </span>
                </div>
                <ProgressBar percent={pct} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
