"use client";

import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";
import signupAr from "../../i18n/locales/signup.ar.json";
import signupEn from "../../i18n/locales/signup.en.json";
import Image from "next/image";
import { AuthBrandPanel } from "../../components/auth/AuthBrandPanel";
import { SignupWizard } from "../../components/auth/SignupWizard";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";

if (!i18n.hasResourceBundle("ar", "translation") || !i18n.getResourceBundle("ar", "translation")?.signup) {
  i18n.addResourceBundle("ar", "translation", { signup: signupAr }, true, true);
  i18n.addResourceBundle("en", "translation", { signup: signupEn }, true, true);
}

export default function SignUpPage() {
  const { t } = useTranslation("translation", { keyPrefix: "signup" });
  const { t: tc } = useTranslation("translation", { keyPrefix: "common" });

  return (
    <main className="grid min-h-screen md:h-screen md:grid-cols-[1fr_1.1fr] md:overflow-hidden">
      <AuthBrandPanel image="/images/auth-side.png" tagline={t("brandLine")} subtext={t("brandSub")} />

      <div className="relative overflow-hidden flex flex-col md:h-full md:overflow-y-auto">
        {/* Big, faint brand wave bleeding off the top edge, clipped by the
            container so it reads as a peeking span rather than a full graphic. */}
        <Image
          src="/images/branding-motifs/wave-blue.png"
          alt=""
          aria-hidden
          width={1600}
          height={790}
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-auto w-[48rem] max-w-none -translate-x-1/2 select-none opacity-10 md:w-[64rem]"
        />

        <div className="flex items-center justify-between gap-2 px-6 pt-6 text-sm text-ink-soft md:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-medium text-ink-soft transition hover:text-brand"
          >
            <ArrowLeft size={16} weight="bold" className="rtl:-scale-x-100" />
            {tc("backToHome")}
          </Link>
          <div className="flex items-center gap-2">
            <span>{t("haveAccount")}</span>
            <Link href="/login" className="font-bold text-brand hover:underline">
              {t("loginLink")}
            </Link>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-10 md:px-10">
          <SignupWizard />
        </div>
      </div>
    </main>
  );
}
