"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";
import { mockChildProfile } from "@shared/content/mockDashboardData";
import { pillars } from "@shared/content/pillars";

const NAV_ITEMS = [
  { id: "dashboard", key: "navDash" },
  { id: "journey", key: "navJourney" },
] as const;

interface ParticipantSidebarProps {
  active: "dashboard" | "journey";
  onNavigate: (id: "dashboard" | "journey") => void;
}

export function ParticipantSidebar({ active, onNavigate }: ParticipantSidebarProps) {
  const { t } = useTranslation("translation", { keyPrefix: "participant" });
  const { lang } = useLanguage();
  const currentPillar = pillars[mockChildProfile.currentPillarIndex];

  return (
    <aside className="relative hidden w-64 flex-shrink-0 flex-col overflow-hidden bg-brand-navy p-5 md:flex">
      <Image
        src="/images/logo-white.png"
        alt=""
        width={320}
        height={320}
        className="pointer-events-none absolute -bottom-24 -start-11 w-80 opacity-[0.08]"
      />

      <Link href="/" className="relative mb-8 mt-1 block text-center">
        <Image src="/images/logo-white.png" alt="Youth Leaders Path" width={160} height={74} className="mx-auto h-[74px] w-auto object-contain" />
      </Link>

      <nav className="relative flex flex-col gap-1.5">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-start text-[15px] transition-colors ${
                isActive ? "bg-white/[0.16] font-bold text-white" : "font-medium text-white/65 hover:bg-white/10"
              }`}
            >
              <span className={`h-[7px] w-[7px] flex-shrink-0 rounded-full ${isActive ? "bg-brand-light" : "bg-white/25"}`} />
              <span>{t(item.key)}</span>
            </button>
          );
        })}
      </nav>

      <div className="relative mt-7 rounded-2xl border border-white/[0.16] bg-white/10 p-4 text-white backdrop-blur-sm">
        <div className="mb-1.5 text-[13px] opacity-80">{t("sideCardKicker")}</div>
        <div className="mb-3.5 text-[15.5px] font-bold leading-snug">{currentPillar.title[lang]}</div>
        <div className="mb-2 h-[7px] overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-white" style={{ width: `${mockChildProfile.overallProgressPct}%` }} />
        </div>
        <div className="text-xs opacity-80">{t("sideCardPct")}</div>
      </div>

      <div className="relative mt-auto flex flex-col gap-3.5">
        <Link href="/parent" className="px-2.5 text-[13px] text-white/65 hover:text-white">
          {t("parentLink")}
        </Link>
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/[0.16] bg-white/10 p-3 backdrop-blur-sm">
          <div className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full bg-white text-[15px] font-bold text-brand-dark">
            {mockChildProfile.initial[lang]}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-white">{mockChildProfile.name[lang]}</div>
            <div className="truncate text-xs text-white/70">{t("userTrack")}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
