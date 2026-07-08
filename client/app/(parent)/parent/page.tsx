"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import i18n from "../../i18n/i18n";
import parentAr from "../../i18n/locales/parent.ar.json";
import parentEn from "../../i18n/locales/parent.en.json";
import { useLanguage } from "../../context/LanguageContext";
import { ChildProgressHeader } from "../../components/parent/ChildProgressHeader";
import { PillarProgressList } from "../../components/parent/PillarProgressList";
import { ProgramTimeline } from "../../components/parent/ProgramTimeline";
import { ActivityFeed, MentorNote } from "../../components/parent/ActivityFeed";
import { WeeklyEngagementChart } from "../../components/parent/WeeklyEngagementChart";

if (!i18n.hasResourceBundle("ar", "translation") || !i18n.getResourceBundle("ar", "translation")?.parent) {
  i18n.addResourceBundle("ar", "translation", { parent: parentAr }, true, true);
  i18n.addResourceBundle("en", "translation", { parent: parentEn }, true, true);
}

export default function ParentPortalPage() {
  const { t } = useTranslation("translation", { keyPrefix: "parent" });
  const { toggleLang } = useLanguage();

  return (
    <div className="flex min-h-screen bg-surface-softer text-ink">
      {/* Sidebar — desktop only */}
      <aside className="relative hidden w-[252px] flex-shrink-0 flex-col overflow-hidden bg-brand-navy p-6 md:flex">
        <Image
          src="/images/logo-white.png"
          alt=""
          width={320}
          height={80}
          className="pointer-events-none absolute -bottom-24 -start-10 w-80 opacity-[0.08]"
        />
        <Link href="/" className="relative mb-4 block text-center">
          <Image src="/images/logo-white.png" alt="Youth Leaders Path" width={160} height={74} className="mx-auto h-[74px] w-auto object-contain" />
        </Link>
        <div className="relative mb-4 text-center text-[11px] font-bold tracking-wider text-white/50">{t("portalBadge")}</div>

        <nav className="relative flex flex-col gap-1.5">
          <div className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 text-[15px] font-bold text-white">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-light" />
            <span>{t("navOverview")}</span>
          </div>
        </nav>

        <div className="relative mt-7 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-sm">
          <div className="mb-1.5 text-[13px] opacity-80">{t("sideCardKicker")}</div>
          <div className="mb-3.5 text-[15.5px] font-bold leading-snug">{t("sideCardTitle")}</div>
          <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/25">
            <div className="h-full w-[42%] rounded-full bg-white" />
          </div>
          <div className="text-[12.5px] opacity-80">{t("sideCardPct")}</div>
        </div>

        <div className="relative mt-auto flex flex-col gap-3.5 pt-6">
          <Link href="/participant" className="px-2.5 text-[13px] text-white/65 transition hover:text-white">
            {t("participantLink")}
          </Link>
          <div className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 backdrop-blur-sm">
            <div className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full bg-white text-[15px] font-bold text-brand-dark">
              {t("parentInitial")}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-white">{t("parentName")}</div>
              <div className="text-xs text-white/70">{t("parentRole")}</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <div className="flex items-center justify-between gap-4 border-b border-stroke-soft bg-white px-6 py-4 md:px-9">
          <div className="flex items-center gap-3 md:hidden">
            <Image src="/images/logo-blue.png" alt="" width={120} height={32} className="h-8 w-auto object-contain" />
          </div>
          <div className="hidden text-xl font-bold text-brand-navy md:block">{t("navOverview")}</div>
          <div className="flex items-center gap-3.5">
            <button
              onClick={toggleLang}
              className="rounded-full border border-stroke-strong px-3 py-1.5 text-xs font-bold text-brand-dark transition hover:bg-surface-accent"
            >
              {i18n.language === "ar" ? "EN" : "ع"}
            </button>
            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-brand-navy text-[15px] font-bold text-white">
              {t("parentInitial")}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 overflow-y-auto px-4 py-6 md:px-9 md:py-7"
        >
          <ChildProgressHeader />

          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1.5fr_1fr]">
            <div className="flex flex-col gap-4">
              <PillarProgressList />
              <ProgramTimeline />
            </div>
            <div className="flex flex-col gap-4">
              <ActivityFeed />
              <MentorNote />
              <WeeklyEngagementChart />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
