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
            // Mobile/tablet: reveal the row's pieces in order as it enters —
            // image, then each text row (number badge, title, description),
            // then the tag chips. Vertical-only, no horizontal converge.
            // The tags' wrapper is excluded from the text cascade so only the
            // chips themselves substagger.
            const textRows = text
              ? Array.from(text.children).filter((child) => !child.querySelector("[data-pillar-tag]"))
              : [];
            const pieces = [image, ...textRows].filter(Boolean) as Element[];
            if (pieces.length) gsap.set(pieces, { opacity: 0, y: 24 });
            if (tags.length) gsap.set(tags, { opacity: 0, y: 10 });

            const tl = gsap.timeline({
              scrollTrigger: { trigger: row, start: "top 85%", toggleActions: "play none none none" },
            });
            if (image) {
              tl.to(image, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
            }
            if (textRows.length) {
              tl.to(textRows, { opacity: 1, y: 0, duration: 0.45, stagger: 0.12, ease: "power2.out" }, "-=0.2");
            }
            if (tags.length) {
              tl.to(tags, { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: "power2.out" }, "-=0.15");
            }
          }
        });
      },
    );

    return () => mm.revert();
  }, [lang]);

  return (
    <section id="pillars" ref={sectionRef} className="relative overflow-clip py-16 md:py-24">
      {/* Brand motifs at the two extreme top corners (fixed physical):
          peach shown prominently on the left, blue faint on the right.
          On mobile the peach one is large and pulled outside the top-left corner so
          it peeks in (clipped by the section's overflow-clip) instead of sitting
          fully inside the header and crowding the kicker/heading text; the blue one
          stays hidden on mobile to avoid doubling up. Both revert to the original
          flush corner treatment from md up. */}
      <Image
        src="/images/branding-motifs/cutout-logo-peach.png"
        alt=""
        aria-hidden
        width={1600}
        height={790}
        className="pointer-events-none absolute -left-12 -top-10 z-0 h-auto w-60 select-none opacity-30 sm:-left-16 sm:-top-12 sm:w-80 sm:opacity-35 md:left-0 md:top-0 md:w-[28rem] md:opacity-40 lg:w-[34rem]"
      />
      <Image
        src="/images/branding-motifs/wave-blue.png"
        alt=""
        aria-hidden
        width={1600}
        height={790}
        className="pointer-events-none absolute -right-24 -top-20 z-0 hidden h-auto w-96 select-none opacity-25 md:block md:w-[30rem] lg:-right-32 lg:-top-24"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center md:px-12">
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

      <div className="mt-10 flex flex-col md:mt-16">
        {pillars.map((pillar, i) => {
          const flip = i % 2 === 1;
          const isSoftRow = i % 2 === 1;
          const bg = isSoftRow ? "bg-surface-soft" : "bg-white";
          // Cards use the same peach→periwinkle progression as the analytics
          // stats card, lightened for these large panels; fade the image edge
          // into the gradient's mid tone.
          const rowBgHex = "226,223,239";
          // The image alternates sides per row (flip). When it sits on the right,
          // mirror the corner motif so it always reads toward the card interior.
          const imageOnRight = !flip;
          // Direction the image-edge fade points, mirrored for RTL so it always
          // blends toward whichever side the text panel visually sits on.
          const fadeToRight = lang === "ar" ? flip : !flip;

          return (
            <div key={pillar.id} className={`relative ${bg} py-6 sm:py-10`}>
              {/* Prominent wave peeking in from the section's outer edge (clipped
                  by the section's overflow-clip). Placed on the OPPOSITE side to
                  the card image so it never sits near the photo: image is on the
                  right for even rows (RTL), so the wave peeks from the left there,
                  and vice-versa. Colour alternates blue / peach per row. */}
              <Image
                src={`/images/branding-motifs/wave-${i % 2 === 0 ? "blue" : "peach"}.png`}
                alt=""
                aria-hidden
                width={1600}
                height={790}
                className={`pointer-events-none absolute top-1/2 z-0 h-auto w-[20rem] -translate-y-1/2 select-none opacity-60 md:w-[26rem] ${
                  i % 2 === 0 ? "-left-24" : "-right-24"
                }`}
              />
              <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
                <div className="rounded-[24px] bg-gradient-to-br from-[#F4D7B9] via-[#C6BEDD] to-brand p-[2px] transition-shadow duration-300 can-hover:hover:shadow-[0_18px_44px_rgba(99,128,211,0.16)]">
                <Card
                  asChild
                  variant="default"
                  size="lg"
                  className="overflow-hidden rounded-[22px] bg-gradient-to-r from-[#FBF1E6] via-[#E2DFEF] to-[#B9C2EA] p-0"
                >
                  <div
                    data-pillar-row
                    data-flip={flip ? "true" : "false"}
                    className={`grid md:grid-cols-2 md:min-h-[320px] lg:min-h-[360px] ${flip ? "md:[&>*:first-child]:order-2" : ""}`}
                  >
                    <div data-pillar-image className="relative h-44 overflow-hidden sm:h-60 md:h-auto">
                      <Image
                        src={pillar.id ? `/images/pillar-${i + 1}.png` : ""}
                        alt={pillar.title[lang]}
                        fill
                        className="object-cover transition-transform duration-500 can-hover:hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background: `linear-gradient(${fadeToRight ? "90deg" : "270deg"}, rgba(${rowBgHex},0) 65%, rgba(${rowBgHex},1) 100%)`,
                        }}
                      />
                      <Image
                        src={
                          i % 2 === 0
                            ? "/images/branding-motifs/logo-motif-image.png"
                            : "/images/branding-motifs/logo-motif-peach.png"
                        }
                        alt=""
                        aria-hidden
                        width={560}
                        height={490}
                        className={`pointer-events-none absolute bottom-0 z-10 h-auto w-52 select-none drop-shadow-md sm:w-72 md:w-96 ${
                          imageOnRight ? "right-0 -scale-x-100" : "left-0"
                        }`}
                      />
                    </div>

                    <div data-pillar-text className="flex flex-col justify-center px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
                      <div className="mb-3.5 flex items-center gap-3.5">
                        <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-gradient-to-br from-[#F4D7B9] to-brand text-base font-bold text-white shadow-md shadow-brand/30 sm:h-[46px] sm:w-[46px] sm:text-lg">
                          {pillar.num[lang]}
                        </div>
                        <div className="h-[2px] w-full max-w-16 flex-1 rounded-full bg-gradient-to-r from-[#F4D7B9] to-brand" />
                      </div>
                      <h3 className="mb-2.5 text-lg font-bold text-brand-navy sm:text-[22px]">{pillar.title[lang]}</h3>
                      <p className="mb-5 max-w-[48ch] text-sm leading-[1.75] text-ink-soft sm:text-[15px]">
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
                            className="inline-flex items-center gap-1.5 rounded-full border border-stroke bg-surface-accent px-3 py-1.5 text-xs font-medium text-brand-darker sm:px-4 sm:py-[7px] sm:text-[13px]"
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
