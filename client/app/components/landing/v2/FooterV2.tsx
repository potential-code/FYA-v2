"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { useLenisScroll } from "./LenisProvider";

const PROGRAM_LINKS = [
  { target: "#about", key: "navAbout" },
  { target: "#journey", key: "navJourney" },
  { target: "#pillars", key: "navPillars" },
];

const ACCOUNT_LINKS = [
  { href: "/login", key: "login" },
  { href: "/sign-up", key: "registerNow" },
];

/**
 * Footer — deep navy, with a large faded logo watermark, program + account
 * links, and the official FYA copyright / tagline. Reuses `landing.footer*`
 * and `common` copy.
 */
export function FooterV2() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const { t: tc } = useTranslation("translation", { keyPrefix: "common" });
  const { scrollTo } = useLenisScroll();
  const reduceMotion = useReducedMotion();

  return (
    <footer data-nav-theme="dark" className="landing-v2 relative overflow-hidden bg-brand-navy text-white">
      {/* faded logo watermark */}
      <Image
        src="/images/logo-white.png"
        alt=""
        aria-hidden
        width={900}
        height={230}
        className="pointer-events-none absolute -bottom-10 start-0 w-[42rem] max-w-none opacity-[0.04]"
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-6xl px-6 py-16 md:px-10"
      >
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Image src="/images/logo-white.png" alt="Youth Leaders Path" width={180} height={46} className="h-11 w-auto object-contain" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">{t("footerAbout")}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white/90">{t("footerCol1")}</h3>
            <ul className="mt-4 space-y-2.5">
              {PROGRAM_LINKS.map((link) => (
                <li key={link.target}>
                  <a
                    href={link.target}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.target, { offset: -80 });
                    }}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white/90">{t("footerCol2")}</h3>
            <ul className="mt-4 space-y-2.5">
              {ACCOUNT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 transition hover:text-white">
                    {tc(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center md:flex-row md:text-start">
          <p className="text-xs text-white/50">{tc("footerCopy")}</p>
          <p className="text-xs font-medium text-brand-light">{tc("footerTag")}</p>
        </div>
      </motion.div>
    </footer>
  );
}
