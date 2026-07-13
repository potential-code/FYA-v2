"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { Button, Toggle } from "@aegov/design-system-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLenisScroll } from "./LenisProvider";

interface NavLink {
  target: string;
  key: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { target: "#about", key: "navAbout" },
  { target: "#journey", key: "navJourney" },
  { target: "#pillars", key: "navPillars" },
];

/**
 * Adaptive glass nav. A scroll-progress hairline sits on top. The nav reads the
 * theme of the section currently under it (`data-nav-theme="dark|light"`) and
 * flips its logo + text + glass between light-on-dark and dark-on-light. Anchor
 * links use Lenis smooth-scroll.
 */
export function NavV2({ links = DEFAULT_LINKS }: { links?: NavLink[] }) {
  const { t: tc } = useTranslation("translation", { keyPrefix: "common" });
  const { t: tl } = useTranslation("translation", { keyPrefix: "landing" });
  const { lang, toggleLang } = useLanguage();
  const { scrollTo } = useLenisScroll();
  const reduceMotion = useReducedMotion();
  const isArabic = lang === "ar";
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detect the theme of the section crossing the strip just below the nav.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme]"));
    if (!els.length) return;
    const bottom = -(window.innerHeight - 84);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setTheme(((e.target as HTMLElement).dataset.navTheme as "dark" | "light") ?? "dark");
        });
      },
      { rootMargin: `-72px 0px ${bottom}px 0px`, threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const dark = theme === "dark";
  const linkColor = dark ? "text-white/85 hover:text-white" : "text-ink-soft hover:text-brand";
  const barClass = scrolled
    ? dark
      ? "glass-dark shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
      : "border-b border-stroke bg-white/85 shadow-sm backdrop-blur"
    : "bg-transparent";

  const go = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(target, { offset: -80 });
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${barClass}`}
    >
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-[left_center] bg-gradient-to-r from-brand-light via-brand to-brand-darker ltr:origin-left rtl:origin-right"
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 25 }}
          >
            <Image
              src={dark ? "/images/logo-white.png" : "/images/logo-blue.png"}
              alt="Youth Leaders Path"
              width={170}
              height={44}
              className="h-9 w-auto object-contain md:h-11"
              priority
            />
          </motion.div>
        </Link>

        <div className={`hidden items-center gap-8 text-sm font-medium md:flex ${dark ? "text-white/85" : "text-ink-soft"}`}>
          {links.map((link) => (
            <a
              key={link.target}
              href={link.target}
              onClick={go(link.target)}
              className={`group relative inline-block transition ${linkColor}`}
            >
              {tl(link.key)}
              <span className="absolute -bottom-1 start-0 h-0.5 w-full origin-center scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 25 }}
          >
            <Toggle
              checked={isArabic}
              onCheckedChange={toggleLang}
              variant="secondary"
              label={tc("langBtn")}
              aria-label="Toggle language"
              className={dark ? "text-white/90" : "text-ink"}
            />
          </motion.div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            className="md:hidden"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 25 }}
          >
            <Toggle
              checked={isArabic}
              onCheckedChange={toggleLang}
              variant="secondary"
              label={tc("langBtn")}
              aria-label="Toggle language"
              className={dark ? "text-white/90" : "text-ink"}
            />
          </motion.div>
          <Link href="/login" className={`hidden text-sm font-medium sm:block ${linkColor}`}>
            {tc("login")}
          </Link>
          <Link href="/sign-up">
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button variant="solid" style="primary" size="sm">
                {tc("registerNow")}
              </Button>
            </motion.div>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
