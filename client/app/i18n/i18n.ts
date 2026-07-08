"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./locales/ar.json";
import en from "./locales/en.json";

// Language detection is handled explicitly by LanguageContext (reads
// localStorage on mount, then calls i18n.changeLanguage). We deliberately do
// NOT use i18next-browser-languagedetector here: its "navigator"/"localStorage"
// detectors behave inconsistently during Next.js's server-side render (no real
// `window`/`navigator` on the server), which caused the SSR output to render
// English content under an `lang="ar" dir="rtl"` <html> tag. Hardcoding the
// initial language keeps server and first client render identical (both "ar"),
// avoiding that mismatch; LanguageContext upgrades to a saved preference after mount.
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      lng: "ar",
      resources: {
        ar: { translation: ar },
        en: { translation: en },
      },
      fallbackLng: "ar",
      supportedLngs: ["ar", "en"],
      interpolation: { escapeValue: false },
    });
}

export default i18n;
