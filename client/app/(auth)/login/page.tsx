"use client";

import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";
import loginAr from "../../i18n/locales/login.ar.json";
import loginEn from "../../i18n/locales/login.en.json";
import { AuthBrandPanel } from "../../components/auth/AuthBrandPanel";
import { LoginForm } from "../../components/auth/LoginForm";

// Register this page's copy as its own i18next namespace without touching the
// shared app/i18n/i18n.ts or the common ar.json/en.json (other pages are being
// built in parallel and also register their own bundles the same way).
if (!i18n.hasResourceBundle("ar", "translation") || !i18n.getResourceBundle("ar", "translation")?.login) {
  i18n.addResourceBundle("ar", "translation", { login: loginAr }, true, true);
  i18n.addResourceBundle("en", "translation", { login: loginEn }, true, true);
}

export default function LoginPage() {
  const { t } = useTranslation("translation", { keyPrefix: "login" });

  return (
    <main className="grid min-h-screen lg:h-screen lg:grid-cols-2 lg:overflow-hidden">
      <AuthBrandPanel image="/images/auth-side.png" tagline={t("brandLine")} subtext={t("brandSub")} />
      <LoginForm />
    </main>
  );
}
