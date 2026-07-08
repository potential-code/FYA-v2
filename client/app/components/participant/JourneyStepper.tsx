"use client";

import { useTranslation } from "react-i18next";
import { pillars } from "@shared/content/pillars";
import { useLanguage } from "../../context/LanguageContext";

/** Horizontal 6-node journey stepper used on the Dashboard tab. Nodes before
 * `currentIndex` are complete (checkmark), the current node pulses. */
export function JourneyStepper({ currentIndex }: { currentIndex: number }) {
  const { t } = useTranslation("translation", { keyPrefix: "participant" });
  const { lang } = useLanguage();

  return (
    <div className="relative">
      <div className="absolute inset-x-12 top-6 border-t-2 border-dashed border-white/25" />
      <div className="relative flex justify-between">
        {pillars.map((pillar, i) => {
          const done = i < currentIndex;
          const current = i === currentIndex;
          return (
            <div key={pillar.id} className="flex max-w-[96px] flex-1 flex-col items-center gap-2">
              <div className="relative flex h-[50px] items-center">
                {current && (
                  <span className="absolute -top-6 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[10.5px] font-bold text-brand-darker">
                    {t("youAreHere")}
                  </span>
                )}
                <div
                  className={`flex items-center justify-center rounded-full border-2 font-bold ${
                    current ? "h-[50px] w-[50px] animate-pulse-soft text-[17px]" : "h-10 w-10 text-sm"
                  } ${
                    done
                      ? "border-success bg-success text-white"
                      : current
                        ? "border-white bg-white text-brand-darker"
                        : "border-white/30 bg-white/[0.14] text-white/75"
                  }`}
                >
                  {done ? "✓" : pillar.num[lang]}
                </div>
              </div>
              <span
                className={`text-center text-[11.5px] leading-tight ${
                  done || current ? "font-bold text-white/95" : "font-medium text-white/55"
                }`}
              >
                {pillar.title[lang]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
