"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { phases } from "@shared/content/phases";
import { Card } from "@aegov/design-system-react";
import { useLanguage } from "../../context/LanguageContext";
import { ensureGsapRegistered } from "../../lib/gsapConfig";
import { useGsapMatchMedia } from "../../hooks/useGsapMatchMedia";
import { ParticipantJourneyTimeline } from "./ParticipantJourneyTimeline";

export function JourneySection() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const { lang } = useLanguage();
  const isArabic = lang === "ar";
  // Split the heading so the first word can carry the peach arch motif accent.
  const journeyTitle = t("journeyTitle");
  const jtSpace = journeyTitle.indexOf(" ");
  const jtFirst = jtSpace === -1 ? journeyTitle : journeyTitle.slice(0, jtSpace);
  const jtRest = jtSpace === -1 ? "" : journeyTitle.slice(jtSpace);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

        const cardsRoot = cardsRef.current;
        const cards = cardsRoot ? gsap.utils.toArray<HTMLElement>("[data-phase-card]", cardsRoot) : [];

        if (reduce) {
          if (headerRef.current) gsap.set(headerRef.current.children, { opacity: 1, y: 0 });
          if (cardsRoot) gsap.set(cardsRoot.children, { opacity: 1, y: 0 });
          cards.forEach((card) => {
            const image = card.querySelector("[data-phase-image]");
            const badge = card.querySelector("[data-phase-badge]");
            const meta = card.querySelector("[data-phase-meta]");
            const title = card.querySelector("[data-phase-title]");
            const desc = card.querySelector("[data-phase-desc]");
            gsap.set(
              [image, badge, meta, title, desc].filter(Boolean) as Element[],
              { opacity: 1, y: 0, scale: 1 },
            );
          });
          return;
        }

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

        if (isDesktop) {
          // Two-level cascade: the 3 cards stagger relative to each other
          // (via each timeline's `delay`, since they sit in the same grid
          // row and would otherwise all cross the ScrollTrigger threshold
          // at once), and each card's internal elements cascade within it —
          // image reveal -> badge pop -> meta -> title -> description, with
          // small overlapping offsets so it reads as one fluid motion.
          cards.forEach((card, i) => {
            const image = card.querySelector("[data-phase-image]");
            const badge = card.querySelector("[data-phase-badge]");
            const meta = card.querySelector("[data-phase-meta]");
            const title = card.querySelector("[data-phase-title]");
            const desc = card.querySelector("[data-phase-desc]");

            const tl = gsap.timeline({
              delay: i * 0.15,
              scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
            });

            if (image) {
              tl.fromTo(
                image,
                { opacity: 0, scale: 1.08 },
                { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
              );
            }
            if (badge) {
              tl.fromTo(
                badge,
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
                "-=0.3",
              );
            }
            if (meta) {
              tl.fromTo(meta, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.25");
            }
            if (title) {
              tl.fromTo(title, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.25");
            }
            if (desc) {
              tl.fromTo(desc, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.25");
            }
          });
        } else if (cardsRoot) {
          // Mobile: keep the simpler pre-existing group-stagger-only reveal —
          // no per-element cascade, no badge pop overshoot, to keep
          // scroll-triggered work light.
          gsap.fromTo(
            cardsRoot.children,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: { trigger: cardsRoot, start: "top 85%", toggleActions: "play none none none" },
            },
          );
        }
      },
    );

    return () => mm.revert();
  }, [lang, isArabic]);

  return (
    <section id="journey" className="bg-surface-soft py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="relative">
          {/* Large faint brand-logo watermark spanning behind the header copy
              and the 3 phase cards (not the timeline below). */}
          <Image
            src="/images/branding-motifs/cutout-logo-blue.png"
            alt=""
            aria-hidden
            width={1600}
            height={768}
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[115%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.1]"
          />
          <div className="relative z-10">
        <div ref={headerRef} className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand">{t("journeyKicker")}</span>
          <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">
            <span className="relative inline-block">
              <Image
                src="/images/branding-motifs/brand-arch-small-peach.png"
                alt=""
                aria-hidden
                width={80}
                height={80}
                className="pointer-events-none absolute -right-5 -top-5 z-0 h-14 w-14 select-none"
              />
              <span className="relative z-10">{jtFirst}</span>
            </span>
            {jtRest}
          </h2>
          <p className="mt-4 text-ink-soft">{t("journeySub")}</p>
        </div>

        <div ref={cardsRef} className="mt-14 grid gap-6 md:grid-cols-3">
          {phases.map((phase) => (
            <div
              key={phase.id}
              className="h-full rounded-[18px] bg-gradient-to-br from-[#F4D7B9] via-[#C6BEDD] to-brand p-[2px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(99,128,211,0.16)]"
            >
            <Card
              asChild
              variant="news"
              className="flex h-full flex-col overflow-hidden rounded-2xl bg-white p-0 shadow-sm"
            >
              <div data-phase-card>
              <div className="relative h-44 w-full overflow-hidden">
                <div data-phase-image className="absolute inset-0">
                  <Image
                    src={phase.image}
                    alt={phase.title[lang]}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div
                  data-phase-badge
                  className="absolute start-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white transition-shadow duration-300 group-hover:shadow-[0_0_0_6px_rgba(99,128,211,0.25)]"
                  style={{ background: phase.accent }}
                >
                  {phase.num[lang]}
                </div>
              </div>
              <div className="p-6">
                <h3 data-phase-title className="text-lg font-bold text-brand-navy">
                  {phase.title[lang]}
                </h3>
                <p data-phase-desc className="mt-2 text-sm text-ink-soft">
                  {phase.desc[lang]}
                </p>
              </div>
              </div>
            </Card>
            </div>
          ))}
        </div>
        </div>
        </div>

        <h2 className="mt-20 text-center text-3xl font-bold text-brand-navy md:text-4xl">
          {t("journeyStepsTitle")}
        </h2>
        <ParticipantJourneyTimeline />
      </div>
    </section>
  );
}
