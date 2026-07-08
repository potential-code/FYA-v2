"use client";

import { PlayCircle } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

export function NextUpCard({ onContinue }: { onContinue: () => void }) {
  const { t } = useTranslation("translation", { keyPrefix: "participant" });

  return (
    <div className="rounded-[18px] border border-stroke-soft bg-white p-5.5">
      <div className="mb-3.5 text-[15.5px] font-bold text-brand-navy">{t("nextTitle")}</div>
      <div className="mb-3.5 flex items-center gap-3.5 rounded-2xl bg-surface-accent p-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand text-white">
          <PlayCircle size={22} weight="fill" />
        </div>
        <div>
          <div className="text-[14.5px] font-bold leading-snug text-brand-navy">{t("nextModule")}</div>
          <div className="mt-0.5 text-[12.5px] text-muted">{t("nextMeta")}</div>
        </div>
      </div>
      <button
        onClick={onContinue}
        className="block w-full rounded-[11px] bg-brand py-3 text-center text-sm font-bold text-white transition hover:bg-brand-dark"
      >
        {t("nextCta")}
      </button>
    </div>
  );
}
