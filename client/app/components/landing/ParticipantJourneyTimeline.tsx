"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Card } from "@aegov/design-system-react";
import { journeySteps } from "@shared/content/journeySteps";
import { useLanguage } from "../../context/LanguageContext";
import { ensureGsapRegistered } from "../../lib/gsapConfig";
import { useGsapMatchMedia } from "../../hooks/useGsapMatchMedia";

export function ParticipantJourneyTimeline() {
  const { lang } = useLanguage();
  const isArabic = lang === "ar";
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    const { mm, breakpoints } = useGsapMatchMedia();

    mm.add(
      { isDesktop: breakpoints.isDesktop, isMobile: breakpoints.isMobile, reduce: breakpoints.reduce },
      (context) => {
        const { reduce } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduce: boolean;
        };
        const root = rootRef.current;
        if (!root) return;

        const lines = gsap.utils.toArray<HTMLElement>("[data-journey-line]", root);
        const steps = gsap.utils.toArray<HTMLElement>("[data-journey-step]", root);
        const badges = steps
          .map((s) => s.querySelector("[data-journey-badge]"))
          .filter(Boolean) as Element[];
        const bodies = steps
          .map((s) => s.querySelector("[data-journey-body]"))
          .filter(Boolean) as Element[];
        const images = steps
          .map((s) => s.querySelector("[data-journey-image]"))
          .filter(Boolean) as Element[];

        // Reduced motion: show the final state, no animation.
        if (reduce) {
          gsap.set(lines, { scaleX: 1, scaleY: 1, opacity: 1 });
          gsap.set(badges, { scale: 1, opacity: 1 });
          gsap.set(bodies, { opacity: 1, y: 0 });
          gsap.set(images, { scale: 1 });
          return;
        }

        // Initial hidden state.
        lines.forEach((line) => {
          const horizontal = line.dataset.orientation === "horizontal";
          gsap.set(line, {
            transformOrigin: horizontal
              ? isArabic
                ? "right center"
                : "left center"
              : "center top",
            scaleX: horizontal ? 0 : 1,
            scaleY: horizontal ? 1 : 0,
          });
        });
        gsap.set(badges, { scale: 0, opacity: 0 });
        gsap.set(bodies, { opacity: 0, y: 16 });
        gsap.set(images, { scale: 1.08 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top 80%", toggleActions: "play none none none" },
        });

        // 1) Draw the connector line(s).
        tl.to(lines, { scaleX: 1, scaleY: 1, duration: 0.9, ease: "power2.inOut" });
        // 2) Badges pop in sequence as the line reaches them.
        tl.to(
          badges,
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", stagger: 0.12 },
          "-=0.6",
        );
        // 3) Bodies fade-up, overlapping so it reads as one motion.
        tl.to(
          bodies,
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.12 },
          "-=0.9",
        );
        // 4) Illustrations settle from a subtle zoom for a bit of life.
        tl.to(
          images,
          { scale: 1, duration: 0.7, ease: "power2.out", stagger: 0.12 },
          "-=0.9",
        );
      },
    );

    return () => mm.revert();
  }, [lang, isArabic]);

  return (
    <div ref={rootRef} className="relative mt-14">
      {/* Connector line — desktop (horizontal). Ends sit under the first/last
          badge centers (~7.143% for 7 equal columns); badges (z-10 + ring)
          overlay any small offset from the grid gap. */}
      <div
        data-journey-line
        data-orientation="horizontal"
        aria-hidden
        className="absolute left-[7.143%] right-[7.143%] top-6 hidden h-[3px] -translate-y-1/2 rounded-full bg-brand/40 md:block"
      />
      {/* Connector line — mobile (vertical), running through the badge column. */}
      <div
        data-journey-line
        data-orientation="vertical"
        aria-hidden
        className="absolute bottom-6 start-6 top-6 w-[3px] rounded-full bg-brand/40 md:hidden"
      />

      <ol className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-7 md:gap-x-4">
        {journeySteps.map((step) => (
          <li
            key={step.id}
            data-journey-step
            className="flex h-full flex-row items-start gap-4 md:flex-col md:items-center md:gap-0"
          >
            {/* Numbered badge (styled wrapper — token colors, always 1–7, never a check). */}
            <div
              data-journey-badge
              className="relative z-10 flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand text-base font-bold text-white shadow-[0_6px_16px_rgba(99,128,211,0.35)] ring-4 ring-surface-soft"
            >
              {step.num[lang]}
            </div>

            <Card
              asChild
              variant="news"
              className="flex w-full flex-col rounded-2xl border border-stroke bg-white p-0 shadow-sm md:mt-6 md:h-full md:flex-1"
            >
              <div
                data-journey-body
                className="group flex h-full flex-col gap-3 p-4 transition-transform duration-300 hover:-translate-y-1 md:items-center md:text-center"
              >
                {/* Illustration tile — cropped figure on a soft, uniform tile so all
                    7 differently-sized crops read as one consistent row. */}
                <div className="relative h-28 w-full flex-none overflow-hidden rounded-xl bg-surface-soft ring-1 ring-stroke/50 md:h-32">
                  <Image
                    src={step.image}
                    alt={step.title[lang]}
                    fill
                    sizes="(max-width: 768px) 40vw, 160px"
                    data-journey-image
                    className="object-contain p-2"
                  />
                </div>
                <h3 className="text-base font-bold text-brand-navy">{step.title[lang]}</h3>
                <p className="text-sm text-ink-soft">{step.desc[lang]}</p>
              </div>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
