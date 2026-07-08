"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { phases } from "@shared/content/phases";
import { useLanguage } from "../../context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function JourneySection() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const { lang } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" },
          },
        );
      }
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%", toggleActions: "play none none none" },
          },
        );
      }
    });
    return () => ctx.revert();
  }, [lang]);

  return (
    <section id="journey" className="bg-surface-soft py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div ref={headerRef} className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand">{t("journeyKicker")}</span>
          <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">{t("journeyTitle")}</h2>
          <p className="mt-4 text-ink-soft">{t("journeySub")}</p>
        </div>

        <div ref={cardsRef} className="mt-14 grid gap-6 md:grid-cols-3">
          {phases.map((phase) => (
            <div key={phase.id} className="overflow-hidden rounded-2xl border border-stroke bg-white shadow-sm">
              <div className="relative h-44 w-full">
                <Image src={phase.image} alt={phase.title[lang]} fill className="object-cover" />
                <div
                  className="absolute start-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: phase.accent }}
                >
                  {phase.num[lang]}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand">
                  <span>{phase.kicker[lang]}</span>
                  <span className="text-stroke-strong">·</span>
                  <span className="text-muted">{phase.tag[lang]}</span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-brand-navy">{phase.title[lang]}</h3>
                <p className="mt-2 text-sm text-ink-soft">{phase.desc[lang]}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl border border-stroke">
          <Image
            src="/images/journey-map.png"
            alt={t("journeyMapAlt")}
            width={1200}
            height={480}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
