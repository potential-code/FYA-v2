"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";
import ar from "../../i18n/locales/participant.ar.json";
import en from "../../i18n/locales/participant.en.json";
import { ParticipantSidebar } from "../../components/participant/ParticipantSidebar";
import { ParticipantTopbar } from "../../components/participant/ParticipantTopbar";
import { ParticipantMobileTabBar } from "../../components/participant/ParticipantMobileTabBar";
import { DashboardHeroCard } from "../../components/participant/DashboardHeroCard";
import { StatCard } from "../../components/participant/StatCard";
import { PillarProgressList } from "../../components/participant/PillarProgressList";
import { NextUpCard } from "../../components/participant/NextUpCard";
import { WeeklyChallengeCard } from "../../components/participant/WeeklyChallengeCard";
import { ParticipantJourneyList } from "../../components/participant/ParticipantJourneyList";
import { mockChildProfile } from "@shared/content/mockDashboardData";
import { fmtNum } from "../../lib/utils";
import { useLanguage } from "../../context/LanguageContext";

const arBundle = i18n.getResourceBundle("ar", "translation") as Record<string, unknown> | null;
if (!arBundle?.participant) {
  i18n.addResourceBundle("ar", "translation", { participant: ar }, true, true);
  i18n.addResourceBundle("en", "translation", { participant: en }, true, true);
}

type Screen = "dashboard" | "journey";

export default function ParticipantPortalPage() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const { t } = useTranslation("translation", { keyPrefix: "participant" });
  const { lang } = useLanguage();

  const screenTitle = screen === "dashboard" ? t("navDash") : t("navJourney");

  return (
    <div className="flex h-screen overflow-hidden bg-surface-softer">
      <ParticipantSidebar active={screen} onNavigate={setScreen} />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <ParticipantTopbar title={screenTitle} />

        <div className="flex-1 overflow-y-auto px-5 py-7 sm:px-9 sm:pb-10">
          <AnimatePresence mode="wait">
            {screen === "dashboard" ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-5">
                  <DashboardHeroCard onContinue={() => setScreen("journey")} />
                </div>

                <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <StatCard label={t("statPoints")} value={fmtNum(mockChildProfile.points, lang)} sub={t("statPointsSub")} subClassName="text-success" />
                  <StatCard
                    label={t("statStreak")}
                    value={`${fmtNum(mockChildProfile.dayStreak, lang)} ${t("days")}`}
                    sub={t("statStreakSub")}
                    subClassName="text-warning-dark"
                  />
                  <StatCard label={t("statBadges")} value={fmtNum(mockChildProfile.badges, lang)} sub={t("statBadgesSub")} />
                  <StatCard label={t("statRank")} value={t("statRankValue")} sub={t("statRankSub")} />
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                  <PillarProgressList onViewJourney={() => setScreen("journey")} />
                  <div className="flex flex-col gap-4">
                    <NextUpCard onContinue={() => setScreen("journey")} />
                    <WeeklyChallengeCard />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="journey"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-5 flex flex-col items-start justify-between gap-5 rounded-[18px] border border-stroke-soft bg-white p-6 sm:flex-row sm:items-center">
                  <div>
                    <div className="mb-1 text-[17px] font-bold text-brand-navy">{t("journeyHeadTitle")}</div>
                    <div className="text-sm text-muted">{t("journeyHeadSub")}</div>
                  </div>
                  <div className="w-full sm:max-w-[340px]">
                    <div className="mb-1.5 flex justify-between text-[12.5px] text-muted">
                      <span>{t("journeyOverall")}</span>
                      <span className="font-bold text-brand-dark">{fmtNum(mockChildProfile.overallProgressPct, lang)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-surface-accent">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-dark to-brand"
                        style={{ width: `${mockChildProfile.overallProgressPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <ParticipantJourneyList onContinue={() => {}} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ParticipantMobileTabBar active={screen} onNavigate={setScreen} />
      </main>
    </div>
  );
}
