"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import gsap from "gsap";
import { pillars } from "@shared/content/pillars";
import { useLanguage } from "../../context/LanguageContext";
import { Card } from "@aegov/design-system-react";
import { ensureGsapRegistered } from "../../lib/gsapConfig";
import { useGsapMatchMedia } from "../../hooks/useGsapMatchMedia";

export function PillarsSection() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  // Split the heading so the first word can carry the peach arch motif accent.
  const pillarsTitle = t("pillarsTitle");
  const ptSpace = pillarsTitle.indexOf(" ");
  const ptFirst = ptSpace === -1 ? pillarsTitle : pillarsTitle.slice(0, ptSpace);
  const ptRest = ptSpace === -1 ? "" : pillarsTitle.slice(ptSpace);
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    const { mm, breakpoints } = useGsapMatchMedia();
    const root = sectionRef.current;
    if (!root) return;

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

        const rows = gsap.utils.toArray<HTMLElement>("[data-pillar-row]", root);

        if (reduce) {
          if (headerRef.current) gsap.set(headerRef.current.children, { opacity: 1, y: 0 });
          rows.forEach((row) => {
            const image = row.querySelector("[data-pillar-image]");
            const text = row.querySelector("[data-pillar-text]");
            const tags = row.querySelectorAll("[data-pillar-tag]");
            gsap.set([image, text].filter(Boolean) as Element[], { opacity: 1, x: 0, y: 0 });
            if (tags.length) gsap.set(tags, { opacity: 1, y: 0 });
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

        rows.forEach((row) => {
          const flip = row.dataset.flip === "true";
          const mirrored = lang === "ar" ? flip : !flip;
          const image = row.querySelector("[data-pillar-image]");
          const text = row.querySelector("[data-pillar-text]");
          const tags = row.querySelectorAll("[data-pillar-tag]");

          if (isDesktop) {
            // Image and text halves converge from opposite edges. `mirrored`
            // decides which half starts on which side, following the exact
            // conditional-sign pattern this file already uses for its
            // gradient-fade direction.
            const imageFromX = mirrored ? 50 : -50;
            const textFromX = mirrored ? -50 : 50;

            const tl = gsap.timeline({
              scrollTrigger: { trigger: row, start: "top 80%", toggleActions: "play none none none" },
            });

            if (image) {
              tl.fromTo(image, { opacity: 0, x: imageFromX }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, 0);
            }
            if (text) {
              tl.fromTo(text, { opacity: 0, x: textFromX }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, 0);
            }
            if (tags.length) {
              tl.fromTo(
                tags,
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" },
                0.35,
              );
            }
          } else {
            // Mobile: simple vertical-only reveal, no horizontal converge, no tag substagger.
            const targets = [image, text].filter(Boolean) as Element[];
            if (targets.length) {
              gsap.fromTo(
                targets,
                { opacity: 0, y: 24 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.1,
                  ease: "power2.out",
                  scrollTrigger: { trigger: row, start: "top 85%", toggleActions: "play none none none" },
                },
              );
            }
          }
        });
      },
    );

    return () => mm.revert();
  }, [lang]);

  return (
    <section id="pillars" ref={sectionRef} className="py-24">
      <div className="mx-auto max-w-6xl px-6 text-center md:px-12">
        <div ref={headerRef}>
          <span className="text-sm font-semibold uppercase tracking-wide text-brand">{t("pillarsKicker")}</span>
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
              <span className="relative z-10">{ptFirst}</span>
            </span>
            {ptRest}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink-soft">{t("pillarsSub")}</p>
        </div>
      </div>

      <div className="mt-16 flex flex-col">
        {pillars.map((pillar, i) => {
          const flip = i % 2 === 1;
          const isSoftRow = i % 2 === 1;
          const bg = isSoftRow ? "bg-surface-soft" : "bg-white";
          // Cards use a peach→periwinkle gradient; fade the image edge into the
          // gradient's mid tone.
          const rowBgHex = "212,203,232";
          // The image alternates sides per row (flip). When it sits on the right,
          // mirror the corner motif so it always reads toward the card interior.
          const imageOnRight = !flip;
          // Direction the image-edge fade points, mirrored for RTL so it always
          // blends toward whichever side the text panel visually sits on.
          const fadeToRight = lang === "ar" ? flip : !flip;

          return (
            <div key={pillar.id} className={`${bg} py-10`}>
              <div className="mx-auto max-w-6xl px-6 md:px-12">
                <div className="rounded-[24px] bg-gradient-to-br from-[#F4D7B9] via-[#C6BEDD] to-brand p-[2px] transition-shadow duration-300 hover:shadow-[0_18px_44px_rgba(99,128,211,0.16)]">
                <Card
                  asChild
                  variant="default"
                  size="lg"
                  className="overflow-hidden rounded-[22px] bg-gradient-to-br from-[#F4DCC0] via-[#D4CBE8] to-[#BAC3EE] p-0"
                >
                  <div
                    data-pillar-row
                    data-flip={flip ? "true" : "false"}
                    className={`grid md:grid-cols-2 md:min-h-[360px] ${flip ? "md:[&>*:first-child]:order-2" : ""}`}
                  >
                    <div data-pillar-image className="relative h-56 overflow-hidden sm:h-72 md:h-auto">
                      <Image
                        src={pillar.id ? `/images/pillar-${i + 1}.png` : ""}
                        alt={pillar.title[lang]}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background: `linear-gradient(${fadeToRight ? "90deg" : "270deg"}, rgba(${rowBgHex},0) 65%, rgba(${rowBgHex},1) 100%)`,
                        }}
                      />
                      <Image
                        src="/images/branding-motifs/logo-motif-image.png"
                        alt=""
                        aria-hidden
                        width={228}
                        height={200}
                        className={`pointer-events-none absolute bottom-0 z-10 h-auto w-70 select-none drop-shadow-md ${
                          imageOnRight ? "right-0 -scale-x-100" : "left-0"
                        }`}
                      />
                    </div>

                    <div data-pillar-text className="flex flex-col justify-center px-8 py-8 md:px-10">
                      <div className="mb-3.5 flex items-center gap-3.5">
                        <div className="grid h-[46px] w-[46px] flex-none place-items-center rounded-full bg-gradient-to-br from-[#F4D7B9] to-brand text-lg font-bold text-white shadow-md shadow-brand/30">
                          {pillar.num[lang]}
                        </div>
                        <div className="h-[2px] w-full max-w-16 flex-1 rounded-full bg-gradient-to-r from-[#F4D7B9] to-brand" />
                      </div>
                      <h3 className="mb-2.5 text-[22px] font-bold text-brand-navy">{pillar.title[lang]}</h3>
                      <p className="mb-5 max-w-[48ch] text-[15px] leading-[1.75] text-ink-soft">
                        {pillar.desc[lang]}
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        {pillar.tags[lang].map((tag) => (
                          <motion.span
                            key={tag}
                            data-pillar-tag
                            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(99,128,211,0.18)" }}
                            whileTap={{ scale: 0.98 }}
                            transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-stroke bg-surface-accent px-4 py-[7px] text-[13px] font-medium text-brand-darker"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
