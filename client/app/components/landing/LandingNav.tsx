"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import { Button, Toggle } from "@aegov/design-system-react";

const NAV_LINKS = [
  { href: "#about", key: "navAbout" },
  { href: "#journey", key: "navJourney" },
  { href: "#pillars", key: "navPillars" },
] as const;

export function LandingNav() {
  const { t: tc } = useTranslation("translation", { keyPrefix: "common" });
  const { t: tl } = useTranslation("translation", { keyPrefix: "landing" });
  const { lang, toggleLang } = useLanguage();
  const isArabic = lang === "ar";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Transparent nav embedded in the hero */}
      <nav className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-12">
        <NavBrand light />
        <NavLinks t={tl} tc={tc} toggleLang={toggleLang} isArabic={isArabic} light />
        <NavActions tc={tc} toggleLang={toggleLang} isArabic={isArabic} light />
      </nav>

      {/* Fixed nav that slides in once scrolled past the hero */}
      <motion.nav
        initial={false}
        animate={{ y: scrolled ? 0 : "-110%" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-stroke bg-white/95 px-6 py-4 shadow-sm backdrop-blur md:px-12"
      >
        <NavBrand />
        <NavLinks t={tl} tc={tc} toggleLang={toggleLang} isArabic={isArabic} />
        <NavActions tc={tc} toggleLang={toggleLang} isArabic={isArabic} />
      </motion.nav>
    </>
  );
}

function NavBrand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={light ? "/images/logo-white.png" : "/images/logo-blue.png"}
        alt="Youth Leaders Path"
        width={170}
        height={44}
        className="h-10 w-auto object-contain md:h-12"
        priority
      />
    </Link>
  );
}

function NavLinks({
  t,
  tc,
  toggleLang,
  isArabic,
  light = false,
}: {
  t: (key: string) => string;
  tc: (key: string) => string;
  toggleLang: () => void;
  isArabic: boolean;
  light?: boolean;
}) {
  return (
    <div className="hidden items-center gap-8 text-sm font-medium md:flex">
      {NAV_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={light ? "text-white/90 transition hover:text-white" : "text-ink-soft transition hover:text-brand"}
        >
          {t(link.key)}
        </a>
      ))}
      {/* Language toggle lives inline with the nav links on desktop, centered in the nav bar. */}
      <Toggle
        checked={isArabic}
        onCheckedChange={toggleLang}
        variant="secondary"
        label={tc("langBtn")}
        aria-label="Toggle language"
        className={light ? "text-white/90" : undefined}
      />
    </div>
  );
}

function NavActions({
  tc,
  toggleLang,
  isArabic,
  light = false,
}: {
  tc: (key: string) => string;
  toggleLang: () => void;
  isArabic: boolean;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {/* On mobile the nav links (and the toggle inside them) are hidden, so surface
          the language toggle here instead — hidden on md+ where NavLinks already shows it. */}
      <Toggle
        checked={isArabic}
        onCheckedChange={toggleLang}
        variant="secondary"
        label={tc("langBtn")}
        aria-label="Toggle language"
        className={`md:hidden ${light ? "text-white/90" : ""}`}
      />
      <Link
        href="/login"
        className={light ? "text-sm font-medium text-white/90 hover:text-white" : "text-sm font-medium text-ink-soft hover:text-brand"}
      >
        {tc("login")}
      </Link>
      <Link href="/sign-up">
        <Button variant="solid" style="primary" size="sm">
          {tc("registerNow")}
        </Button>
      </Link>
    </div>
  );
}
