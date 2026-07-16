"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Button } from "@aegov/design-system-react";
import { useLanguage } from "../../context/LanguageContext";
import { ensureGsapRegistered } from "../../lib/gsapConfig";
import { useGsapMatchMedia } from "../../hooks/useGsapMatchMedia";

export function FinalCtaSection() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    const { mm, breakpoints } = useGsapMatchMedia();

    mm.add(
      {
        isDesktop: breakpoints.isDesktop,
        isMobile: breakpoints.isMobile,
        reduce: breakpoints.reduce,
      },
      (context) => {
        const { isDesktop, reduce } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduce: boolean;
        };

        if (reduce) {
          if (bgRef.current) gsap.set(bgRef.current, { yPercent: 0, opacity: 1 });
          if (contentRef.current) gsap.set(contentRef.current.children, { opacity: 1, y: 0 });
          return;
        }

        if (contentRef.current) {
          gsap.fromTo(
            contentRef.current.children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: contentRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        }

        if (bgRef.current) {
          if (isDesktop) {
            gsap.fromTo(
              bgRef.current,
              { yPercent: -8 },
              {
                yPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: bgRef.current.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              },
            );
          } else {
            gsap.fromTo(
              bgRef.current,
              { opacity: 0.6 },
              {
                opacity: 1,
                duration: 0.8,
                ease: "power1.out",
                scrollTrigger: {
                  trigger: bgRef.current.parentElement,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              },
            );
          }
        }
      },
    );

    return () => mm.revert();
    // `lang` isn't read directly in this effect, but AR/EN text-length
    // differences shift layout height and therefore ScrollTrigger start
    // positions — re-running on toggle keeps them accurate (mirrors Journey).
  }, [lang]);

  return (
    <section className="relative overflow-hidden py-20 text-center text-white md:py-28">
      <div className="pointer-events-none absolute -inset-y-[8%] inset-x-0" ref={bgRef}>
        <Image src="/images/cta-bg.jpg" alt="" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-brand-navy/80" />
      <div ref={contentRef} className="relative z-10 mx-auto max-w-2xl px-6">
        <h2 className="text-3xl font-bold md:text-4xl">{t("ctaTitle")}</h2>
        <p className="mt-4 text-white/80">{t("ctaSub")}</p>
        <Link href="/sign-up" className="mt-8 inline-block">
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button variant="solid" style="primary" size="lg">
              {t("ctaBtn")}
            </Button>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
