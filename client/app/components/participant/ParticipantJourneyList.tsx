"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { pillars } from "@shared/content/pillars";
import { mockChildProfile } from "@shared/content/mockDashboardData";
import { useLanguage } from "../../context/LanguageContext";

interface ModuleEntry {
  title: string;
  meta: string;
  status: "done" | "current" | "next";
}

export function ParticipantJourneyList({ onContinue }: { onContinue: () => void }) {
  const { t } = useTranslation("translation", { keyPrefix: "participant" });
  const { lang } = useLanguage();
  const currentIndex = mockChildProfile.currentPillarIndex;

  return (
    <div className="flex max-w-3xl flex-col gap-3.5">
      {pillars.map((pillar, i) => {
        const done = i < currentIndex;
        const current = i === currentIndex;
        const locked = i > currentIndex;
        const modules = t(`modules.${pillar.id}`, { returnObjects: true }) as ModuleEntry[];

        return (
          <div
            key={pillar.id}
            className={`rounded-[18px] border-[1.5px] bg-white p-5.5 sm:p-6 ${
              current ? "border-brand" : "border-stroke-soft"
            } ${locked ? "opacity-60" : "opacity-100"}`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full text-[17px] font-bold ${
                  done ? "bg-success text-white" : current ? "bg-brand text-white" : "bg-surface-accent text-muted"
                }`}
              >
                {pillar.num[lang]}
              </div>
              <Image src={`/images/pillar-${i + 1}.png`} alt="" width={44} height={44} className="h-11 w-11 flex-shrink-0 rounded-[11px] object-cover" />
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 text-[16.5px] font-bold text-brand-navy">{pillar.title[lang]}</div>
                <div className="text-[13px] text-muted">{t("moduleMeta")}</div>
              </div>
              <span
                className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] font-bold ${
                  done
                    ? "bg-success/15 text-success-dark"
                    : current
                      ? "bg-surface-accent text-brand-dark"
                      : "bg-surface-softer text-muted"
                }`}
              >
                {done ? t("statusComplete") : current ? `${t("statusInProgress")} · 64%` : t("statusLocked")}
              </span>
            </div>

            {current && (
              <div className="mt-4.5 flex flex-col gap-2.5 border-t border-stroke-soft pt-4.5">
                {modules.map((m) => (
                  <div
                    key={m.title}
                    className={`flex items-center gap-3 rounded-xl p-3.5 ${m.status === "current" ? "bg-surface-accent" : "bg-surface-soft"}`}
                  >
                    <span
                      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                        m.status === "done" ? "bg-success" : m.status === "current" ? "bg-brand" : "bg-stroke-strong"
                      }`}
                    >
                      {m.status === "done" ? "✓" : "•"}
                    </span>
                    <span className={`flex-1 text-sm font-medium ${m.status === "next" ? "text-muted" : "text-brand-navy"}`}>
                      {m.title}
                    </span>
                    <span
                      className={`text-[12.5px] font-bold ${
                        m.status === "done" ? "text-success" : m.status === "current" ? "text-brand-dark" : "text-muted-soft"
                      }`}
                    >
                      {m.meta}
                    </span>
                  </div>
                ))}
                <button
                  onClick={onContinue}
                  className="mt-1.5 self-start rounded-[11px] bg-brand px-7 py-3 text-sm font-bold text-white transition hover:bg-brand-dark"
                >
                  {t("continueCta")}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
