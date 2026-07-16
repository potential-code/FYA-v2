"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { X } from "@phosphor-icons/react";
import { Toggle } from "@aegov/design-system-react";
import { useLanguage } from "../../context/LanguageContext";
import { NAV_LINKS } from "./LandingNav";

export function MobileNavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t: tc } = useTranslation("translation", { keyPrefix: "common" });
  const { t: tl } = useTranslation("translation", { keyPrefix: "landing" });
  const { lang, toggleLang } = useLanguage();
  const isArabic = lang === "ar";
  const reduceMotion = useReducedMotion();
  // Panel is anchored to the inline-end edge via `end-0`, but framer-motion
  // animates physical x — so the offscreen offset flips with direction.
  const off = isArabic ? "-100%" : "100%";

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-40 bg-brand-navy/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            id="mobile-nav-drawer"
            initial={{ x: off }}
            animate={{ x: 0 }}
            exit={{ x: off }}
            transition={reduceMotion ? { duration: 0 } : { type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed inset-y-0 end-0 z-50 flex w-[min(20rem,85vw)] flex-col bg-white p-6 shadow-2xl lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Image
                src="/images/logo-blue.png"
                alt="Youth Leaders Path"
                width={170}
                height={44}
                className="h-10 w-auto object-contain"
              />
              <button
                type="button"
                autoFocus
                onClick={onClose}
                aria-label={tc("menuClose")}
                className="-m-2 p-2 text-brand-navy transition hover:text-brand"
              >
                <X size={24} weight="bold" aria-hidden />
              </button>
            </div>

            <nav className="mt-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="block border-b border-stroke py-3.5 text-base font-medium text-ink-soft transition hover:text-brand"
                >
                  {tl(link.key)}
                </a>
              ))}
              {/* Login is hidden in the bar below sm — keep it reachable here. */}
              <Link
                href="/login"
                onClick={onClose}
                className="block border-b border-stroke py-3.5 text-base font-medium text-ink-soft transition hover:text-brand sm:hidden"
              >
                {tc("login")}
              </Link>
            </nav>

            <div className="mt-auto pt-6">
              <Toggle
                checked={isArabic}
                onCheckedChange={toggleLang}
                variant="secondary"
                label={tc("langBtn")}
                aria-label="Toggle language"
                className="text-ink-soft"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
