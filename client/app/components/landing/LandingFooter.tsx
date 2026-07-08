"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";

export function LandingFooter() {
  const { t: tc } = useTranslation("translation", { keyPrefix: "common" });
  const { t: tl } = useTranslation("translation", { keyPrefix: "landing" });

  return (
    <footer className="relative overflow-hidden bg-brand-navy py-16 text-white">
      <div className="pointer-events-none absolute -end-24 -top-24 opacity-5">
        <Image src="/images/logo-white.png" alt="" width={480} height={480} />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.3fr_1fr_1fr] md:px-12">
        <div>
          <Image src="/images/logo-white.png" alt="Youth Leaders Path" width={160} height={40} className="h-8 w-auto object-contain" />
          <p className="mt-4 max-w-sm text-sm text-white/70">{tl("footerAbout")}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white/90">{tl("footerCol1")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li><a href="#about" className="hover:text-white">{tl("navAbout")}</a></li>
            <li><a href="#journey" className="hover:text-white">{tl("navJourney")}</a></li>
            <li><a href="#pillars" className="hover:text-white">{tl("navPillars")}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white/90">{tl("footerCol2")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li><Link href="/login" className="hover:text-white">{tc("login")}</Link></li>
            <li><Link href="/sign-up" className="hover:text-white">{tc("registerNow")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="relative mx-auto mt-12 flex max-w-6xl flex-col items-center gap-2 border-t border-white/10 px-6 pt-6 text-xs text-white/50 md:flex-row md:justify-between md:px-12">
        <span>{tc("footerCopy")}</span>
        <span>{tc("footerTag")}</span>
      </div>
    </footer>
  );
}
