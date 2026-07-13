"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import { pillars } from "@shared/content/pillars";
import { useLanguage } from "@/app/context/LanguageContext";
import { fmtNum } from "@/app/lib/utils";
import { accentFor, hexToRgb, mixHex } from "@/app/lib/pillarAccents";
import { ensureGsapRegistered } from "@/app/lib/gsapConfig";

const PillarParticles = dynamic(() => import("./webgl/PillarParticles"), { ssr: false });

const N = pillars.length;

/**
 * Six Pillars — a single pinned, scroll-driven filmstrip.
 *
 * Desktop: the stage is pinned (GSAP ScrollTrigger) and a scrubbed timeline
 * glides the current pillar flat off the screen (toward the leading edge) while
 * the next glides in from the opposite edge — a clean, straight horizontal
 * hand-off, no rotation or tilt. Each pillar arrives with its photo, title,
 * description and pill badges, which then reveal in a stagger as it takes centre
 * stage. An ambient radial glow (+ subtle particle field) morphs its colour
 * continuously between each pillar's brand accent. RTL flips the glide
 * direction; photos wear a navy+accent wash to stay on-brand.
 *
 * Mobile / reduced-motion: falls back to an accessible stacked list (no pin),
 * each pillar (photo + content) revealed on scroll.
 */
export function PillarsV2() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();

  const [mode, setMode] = useState<"stacked" | "pinned">("stacked"); // SSR-safe default
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const colorRef = useRef<[number, number, number]>(
    (() => {
      const [r, g, b] = hexToRgb(accentFor(pillars[0].id).hex);
      return [r / 255, g / 255, b / 255];
    })(),
  );

  // Decide pinned vs stacked once mounted (and on breakpoint / motion change).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const decide = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setMode(mq.matches && !reduce ? "pinned" : "stacked");
    };
    decide();
    mq.addEventListener("change", decide);
    return () => mq.removeEventListener("change", decide);
  }, []);

  // Pause the particle canvas when the section is off-screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The pinned filmstrip timeline (flat horizontal glide + morphing glow).
  useEffect(() => {
    if (mode !== "pinned") return;
    ensureGsapRegistered();
    // Leading edge: LTR content advances left→right, so the current pillar exits
    // to the left and the next enters from the right. RTL mirrors (dir = -1).
    const dir = lang === "ar" ? -1 : 1;
    const OUT = 62; // exit offset (% of layer width)
    let lastIdx = -1;

    const ctx = gsap.context(() => {
      const layers = layerRefs.current;

      const setGlow = (rgb: string) => {
        if (glowRef.current) {
          glowRef.current.style.background = `radial-gradient(58% 55% at 50% 45%, rgba(${rgb}, 0.30) 0%, rgba(${rgb}, 0.08) 40%, transparent 68%)`;
        }
      };

      // Initial states: pillar 0 centred, the rest waiting off the leading edge.
      layers.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, i === 0 ? { autoAlpha: 1, xPercent: 0 } : { autoAlpha: 0, xPercent: OUT * dir });
      });
      setGlow(mixHex(accentFor(pillars[0].id).hex, accentFor(pillars[0].id).hex, 0));

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: () => `+=${N * window.innerHeight}`,
          scrub: 1,
          pin: stageRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const pos = self.progress * (N - 1);
            const i = Math.max(0, Math.min(N - 2, Math.floor(pos)));
            const f = Math.max(0, Math.min(1, pos - i));
            const rgb = mixHex(accentFor(pillars[i].id).hex, accentFor(pillars[i + 1].id).hex, f);
            setGlow(rgb);
            const [r, g, b] = rgb.split(",").map((n) => parseFloat(n) / 255);
            colorRef.current = [r, g, b];
            const idx = Math.round(pos);
            if (idx !== lastIdx) {
              lastIdx = idx;
              setActive(idx);
            }
          },
        },
      });

      // Straight hand-off: current glides out one edge as the next glides in from
      // the opposite edge. No rotation, no scale — a clean flat slide.
      for (let i = 0; i < N - 1; i++) {
        tl.to(layers[i], { autoAlpha: 0, xPercent: -OUT * dir }, i);
        tl.fromTo(
          layers[i + 1],
          { autoAlpha: 0, xPercent: OUT * dir },
          { autoAlpha: 1, xPercent: 0 },
          i,
        );
      }
    }, sectionRef);

    return () => ctx.revert();
    // Re-run on language toggle (glide direction + text metrics change).
  }, [mode, lang]);

  // Content reveal each time a pillar takes centre stage: the photo slides up
  // first, then the side content staggers in — title → description → pill badges.
  useEffect(() => {
    if (mode !== "pinned") return;
    const layer = layerRefs.current[active];
    if (!layer) return;
    const img = layer.querySelector('[data-reveal="image"]');
    const texts = layer.querySelectorAll('[data-reveal="text"]');
    const dir = lang === "ar" ? -1 : 1;

    const tl = gsap.timeline();
    if (img) {
      tl.fromTo(
        img,
        { y: 72, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out", overwrite: "auto" },
      );
    }
    tl.fromTo(
      texts,
      { y: 28, x: 16 * dir, opacity: 0 },
      { y: 0, x: 0, opacity: 1, duration: 0.6, stagger: 0.16, ease: "power3.out", overwrite: "auto" },
      "-=0.35",
    );

    return () => {
      tl.kill();
    };
  }, [active, mode, lang]);

  // Image frame: every corner pointed EXCEPT the outer-top corner, which is
  // curved. RTL: image is on the right → outer-top is top-right; LTR mirrors.
  const curve = "6rem";
  const photoRadius = lang === "ar" ? `0 ${curve} 0 0` : `${curve} 0 0 0`;

  return (
    <section
      id="pillars"
      ref={sectionRef}
      data-nav-theme="dark"
      className="landing-v2 relative bg-[#0A0D1A] text-white"
      aria-label={t("pillarsTitle")}
    >
      {mode === "pinned" ? (
        <div ref={stageRef} className="relative h-screen overflow-hidden">
          {/* ambient morphing glow */}
          <div ref={glowRef} aria-hidden className="pointer-events-none absolute inset-0" />
          {/* particle vortex */}
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <PillarParticles colorRef={colorRef} active={visible} />
          </div>
          {/* subtle navy vignette to seat the content */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_45%,#0A0D1A_100%)]" />

          {/* pinned heading */}
          <div className="absolute inset-x-0 top-0 z-20 px-6 pt-20 text-center md:pt-24">
            <span className="text-xs font-semibold tracking-[0.25em] text-brand-light">
              {t("pillarsKicker")}
            </span>
            <h2 className="mx-auto mt-2 max-w-xl text-2xl font-bold leading-tight md:text-3xl">
              {t("pillarsTitle")}
            </h2>
          </div>

          {/* spiralling pillar layers */}
          <div className="absolute inset-0 z-10">
            {pillars.map((p, i) => {
              const a = accentFor(p.id);
              return (
                <div
                  key={p.id}
                  ref={(el) => {
                    layerRefs.current[i] = el;
                  }}
                  className="absolute inset-0 flex items-center justify-center px-6 pb-16 pt-32"
                  style={{ willChange: "transform, opacity" }}
                >
                  <div className="grid w-full max-w-5xl items-center gap-8 md:grid-cols-2 md:gap-12">
                    {/* photo — only the outer-top corner curved */}
                    <div data-reveal="image" className="relative mx-auto aspect-[4/5] w-full max-w-[22rem]">
                      {/* soft accent glow behind the photo */}
                      <div
                        aria-hidden
                        className="absolute -inset-2 opacity-60 blur-xl"
                        style={{
                          background: `radial-gradient(circle at 50% 40%, ${a.hex}55, transparent 70%)`,
                          borderRadius: photoRadius,
                        }}
                      />
                      <div
                        className="relative h-full w-full overflow-hidden border shadow-2xl"
                        style={{ borderColor: `${a.hex}66`, borderRadius: photoRadius }}
                      >
                        <Image
                          src={`/images/pillar-${i + 1}.png`}
                          alt={p.title[lang]}
                          fill
                          sizes="(max-width: 1024px) 0px, 27rem"
                          className="object-cover"
                        />
                        {/* subtle brand wash keeps the photo on-brand */}
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(to top, #0A0D1A 4%, rgba(10,13,26,0.15) 50%, transparent 100%), ${a.hex}14`,
                          }}
                        />
                        {/* big pillar number */}
                        <div
                          className="font-nums absolute bottom-3 start-5 text-6xl font-bold leading-none drop-shadow-lg"
                          style={{ color: a.glow }}
                        >
                          {fmtNum(i + 1, lang)}
                        </div>
                      </div>
                    </div>

                    {/* content */}
                    <div className="text-center md:text-start">
                      <div data-reveal="text" className="font-nums text-sm font-bold tracking-wide" style={{ color: a.glow }}>
                        {fmtNum(i + 1, lang)} / {fmtNum(N, lang)}
                      </div>
                      <h3 data-reveal="text" className="mt-2 text-3xl font-bold leading-tight md:text-5xl">
                        {p.title[lang]}
                      </h3>
                      <p data-reveal="text" className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/75 md:mx-0 md:text-base">
                        {p.desc[lang]}
                      </p>
                      <div data-reveal="text" className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                        {p.tags[lang].map((tag) => (
                          <span
                            key={tag}
                            className="glass-dark rounded-full px-3.5 py-1.5 text-xs font-medium text-white/85"
                            style={{ boxShadow: `inset 0 0 0 1px ${a.hex}55` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* progress rail */}
          <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center gap-2.5">
            {pillars.map((p, i) => {
              const a = accentFor(p.id);
              const on = active === i;
              return (
                <span
                  key={p.id}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: on ? 28 : 8,
                    background: on ? a.hex : "rgba(255,255,255,0.25)",
                    boxShadow: on ? `0 0 12px ${a.hex}` : "none",
                  }}
                />
              );
            })}
          </div>
        </div>
      ) : (
        /* ---------- Stacked fallback (mobile / reduced-motion) ---------- */
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-[0.25em] text-brand-light">
              {t("pillarsKicker")}
            </span>
            <h2 className="mx-auto mt-2 max-w-md text-3xl font-bold leading-tight">{t("pillarsTitle")}</h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">{t("pillarsSub")}</p>
          </div>

          <div className="mt-14 space-y-8">
            {pillars.map((p, i) => {
              const a = accentFor(p.id);
              return (
                <motion.div
                  key={p.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="glass-dark relative overflow-hidden rounded-3xl"
                  style={{ boxShadow: `inset 0 0 0 1px ${a.hex}33` }}
                >
                  {/* photo banner — enlarged */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={`/images/pillar-${i + 1}.png`}
                      alt={p.title[lang]}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(to top, #0A0D1A 6%, transparent 70%), ${a.hex}14` }}
                    />
                    <div
                      className="font-nums absolute bottom-2 start-5 text-5xl font-bold leading-none drop-shadow-lg"
                      style={{ color: a.glow }}
                    >
                      {fmtNum(i + 1, lang)}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="font-nums text-xs font-bold" style={{ color: a.glow }}>
                      {fmtNum(i + 1, lang)} / {fmtNum(N, lang)}
                    </div>
                    <h3 className="mt-1 text-xl font-bold">{p.title[lang]}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{p.desc[lang]}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags[lang].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
                          style={{ boxShadow: `inset 0 0 0 1px ${a.hex}44` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
