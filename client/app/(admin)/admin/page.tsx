"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Input, Button } from "@aegov/design-system-react";
import i18n from "../../i18n/i18n";
import adminAr from "../../i18n/locales/admin.ar.json";
import adminEn from "../../i18n/locales/admin.en.json";
import { useLanguage } from "../../context/LanguageContext";
import { AdminSidebar, type AdminScreen } from "../../components/admin/AdminSidebar";
import { AdminOverview } from "../../components/admin/AdminOverview";
import { AdminParticipants } from "../../components/admin/AdminParticipants";
import { AdminPillarAnalytics } from "../../components/admin/AdminPillarAnalytics";

i18n.addResourceBundle("ar", "translation", { admin: adminAr }, true, true);
i18n.addResourceBundle("en", "translation", { admin: adminEn }, true, true);

const SCREEN_TITLE_KEY: Record<AdminScreen, string> = {
  overview: "navOverview",
  participants: "navParticipants",
  analytics: "navAnalytics",
};

export default function AdminDashboardPage() {
  const { t } = useTranslation("translation", { keyPrefix: "admin" });
  const { toggleLang } = useLanguage();
  const [screen, setScreen] = useState<AdminScreen>("overview");

  return (
    <div className="flex min-h-screen bg-surface-soft">
      <AdminSidebar screen={screen} onScreenChange={setScreen} />

      <div className="flex-1 pb-20 md:pb-0">
        <header className="flex items-center justify-between gap-4 border-b border-stroke bg-white px-6 py-4">
          <h1 className="text-lg font-bold text-brand-navy">{t(SCREEN_TITLE_KEY[screen])}</h1>
          <div className="flex items-center gap-3">
            <div className="hidden w-56 sm:block">
              <Input type="search" placeholder={t("searchPh")} aria-label={t("searchPh")} />
            </div>
            <Button
              onClick={toggleLang}
              variant="soft"
              style="secondary"
              size="xs"
              isIcon
              className="rounded-full"
              aria-label="Toggle language"
            >
              {t("adminName").charAt(0)}
            </Button>
          </div>
        </header>

        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {screen === "overview" && <AdminOverview />}
              {screen === "participants" && <AdminParticipants />}
              {screen === "analytics" && <AdminPillarAnalytics />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
