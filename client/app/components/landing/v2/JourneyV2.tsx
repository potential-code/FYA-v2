"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import gsap from "gsap";
import { Sparkle, UsersThree, ChartLineUp, ArrowUpRight, type Icon } from "@phosphor-icons/react";
import { phases } from "@shared/content/phases";
import { useLanguage } from "@/app/context/LanguageContext";
import { fmtNum } from "@/app/lib/utils";
import { mixHex } from "@/app/lib/pillarAccents";
import { ensureGsapRegistered } from "@/app/lib/gsapConfig";

const N = phases.length;

interface PhaseExtra {
  line: string;
  highlights: string[];
}

/** Evolving ambient glow hue per phase (brand periwinkle family, deepening). */
const PHASE_GLOW = ["#8FA6E5", "#6380D3", "#566BC0"];
/** A signature icon + decorative motif per phase (all brand assets). */
const PHASE_ICONS: Icon[] = [Sparkle, UsersThree, ChartLineUp];
const PHASE_MOTIF = [
  "/images/youth-leaders-motif-blue.png",
  "/images/brand-arch-blue.png",
  "/images/youth-leaders-motif-peach.png",
];

/** Deterministic floating particles (fixed to stay SSR/hydration-stable). */
const PARTICLES = [
  { left: "8%", top: "18%", size: 5, dur: 7.5, delay: 0 },
  { left: "16%", top: "68%", size: 3, dur: 9, delay: 1.2 },
  { left: "26%", top: "34%", size: 7, dur: 8.5, delay: 0.6 },
  { left: "34%", top: "82%", size: 4, dur: 10, delay: 2.1 },
  { left: "44%", top: "12%", size: 3, dur: 8, delay: 1.6 },
  { left: "58%", top: "72%", size: 6, dur: 9.5, delay: 0.3 },
  { left: "66%", top: "26%", size: 4, dur: 7, delay: 2.4 },
  { left: "74%", top: "58%", size: 3, dur: 10.5, delay: 1 },
  { left: "82%", top: "16%", size: 5, dur: 8.2, delay: 0.9 },
  { left: "88%", top: "78%", size: 4, dur: 9.2, delay: 1.8 },
  { left: "50%", top: "44%", size: 2, dur: 11, delay: 0.4 },
  { left: "20%", top: "50%", size: 2, dur: 10, delay: 2.7 },
];

/** Floating brand-colour orbs — soft ambient depth. Static under reduced motion. */
function FloatingParticles({ reduce }: { reduce: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand-light/40"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={reduce ? undefined : { y: [0, -22, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={reduce ? undefined : { duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/**
 * The Journey — an immersive vertical scroll story. Desktop: the stage pins and
 * a scrubbed timeline lifts each phase up and dissolves it as the next emerges
 * from below — one continuous ascent through the three chapters. As it advances,
 * an ambient glow blends between each phase's brand hue, floating orbs + soft
 * light rays drift behind, a ken-burns photo breathes, and the phase's number,
 * icon, title, story line and highlights reveal in sequence. A vertical 1→2→3
 * rail tracks progress. Mobile / reduced-motion: stacked immersive cards.
 */
export function JourneyV2() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion() ?? false;

  const extras = t("journeyPhases", { returnObjects: true }) as unknown as PhaseExtra[];

  const [mode, setMode] = useState<"stacked" | "pinned">("stacked");
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // Pinned vertical story: lift-and-dissolve out, emerge-from-below in, with a
  // colour-morphing ambient glow driving the "background evolves" feel.
  useEffect(() => {
    if (mode !== "pinned") return;
    ensureGsapRegistered();
    let lastIdx = -1;

    const ctx = gsap.context(() => {
      const scenes = sceneRefs.current;

      const setGlow = (rgb: string) => {
        if (glowRef.current) {
          glowRef.current.style.background = `radial-gradient(70% 60% at 50% 42%, rgba(${rgb}, 0.42) 0%, rgba(${rgb}, 0.12) 42%, transparent 72%)`;
        }
      };

      scenes.forEach((s, i) => {
        if (!s) return;
        gsap.set(
          s,
          i === 0
            ? { autoAlpha: 1, yPercent: 0, scale: 1, "--jblur": "0px" }
            : { autoAlpha: 0, yPercent: 32, scale: 1.03, "--jblur": "6px" },
        );
      });
      setGlow(mixHex(PHASE_GLOW[0], PHASE_GLOW[0], 0));

      const tl = gsap.timeline({
        defaults: { ease: "power1.inOut", duration: 1 },
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
            setGlow(mixHex(PHASE_GLOW[i], PHASE_GLOW[i + 1], f));
            const idx = Math.round(pos);
            if (idx !== lastIdx) {
              lastIdx = idx;
              setActive(idx);
            }
          },
        },
      });

      for (let i = 0; i < N - 1; i++) {
        tl.to(scenes[i], { yPercent: -24, autoAlpha: 0, scale: 0.96, "--jblur": "8px" }, i);
        tl.fromTo(
          scenes[i + 1],
          { yPercent: 32, autoAlpha: 0, scale: 1.03, "--jblur": "6px" },
          { yPercent: 0, autoAlpha: 1, scale: 1, "--jblur": "0px" },
          i,
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [mode, lang]);

  // Sequential reveal + ken-burns + icon pop each time a scene takes over.
  useEffect(() => {
    if (mode !== "pinned") return;
    const scene = sceneRefs.current[active];
    if (!scene) return;
    const items = scene.querySelectorAll("[data-reveal]");
    const icon = scene.querySelector("[data-icon]");
    const kb = scene.querySelector("[data-kb]");
    const dir = lang === "ar" ? -1 : 1;

    const tl = gsap.timeline();
    if (icon) {
      tl.fromTo(
        icon,
        { scale: 0.4, rotate: -18 * dir, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)", overwrite: "auto" },
      );
    }
    tl.fromTo(
      items,
      { y: 30, x: 14 * dir, opacity: 0 },
      { y: 0, x: 0, opacity: 1, duration: 0.62, stagger: 0.11, ease: "power3.out", overwrite: "auto" },
      icon ? "-=0.35" : 0,
    );
    const kbTw = kb
      ? gsap.fromTo(kb, { scale: 1.18 }, { scale: 1, duration: 6.5, ease: "none", overwrite: "auto" })
      : null;

    return () => {
      tl.kill();
      kbTw?.kill();
    };
  }, [active, mode, lang]);

  const heading = (
    <>
      <span className="text-xs font-semibold tracking-[0.24em] text-brand-light">{t("journeyKicker")}</span>
      <h2 className="mt-2 text-2xl font-bold leading-tight text-white md:text-4xl">{t("journeyTitle")}</h2>
    </>
  );

  return (
    <section
      id="journey"
      ref={sectionRef}
      data-nav-theme="dark"
      className="landing-v2 relative bg-brand-navy text-white"
    >
      {mode === "pinned" ? (
        <div ref={stageRef} className="relative h-screen overflow-hidden">
          {/* evolving ambient glow */}
          <div ref={glowRef} aria-hidden className="pointer-events-none absolute inset-0" />
          {/* soft drifting light rays */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-1/3 start-1/4 h-[160%] w-40 -rotate-12 bg-gradient-to-b from-brand-light/12 via-brand-light/5 to-transparent blur-2xl"
              animate={reduceMotion ? undefined : { x: [0, 40, 0], opacity: [0.5, 0.9, 0.5] }}
              transition={reduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-1/3 end-1/4 h-[160%] w-56 rotate-12 bg-gradient-to-t from-brand/12 via-brand/5 to-transparent blur-3xl"
              animate={reduceMotion ? undefined : { x: [0, -50, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={reduceMotion ? undefined : { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
          </div>
          {/* floating orbs */}
          <FloatingParticles reduce={reduceMotion} />

          {/* scenes */}
          {phases.map((p, i) => {
            const Ico = PHASE_ICONS[i] ?? Sparkle;
            const glow = PHASE_GLOW[i] ?? "#6E82CD";
            const extra = extras?.[i];
            return (
              <div
                key={p.id}
                ref={(el) => {
                  sceneRefs.current[i] = el;
                }}
                className="absolute inset-0"
                style={{ filter: "blur(var(--jblur, 0px))", willChange: "transform, opacity, filter" }}
              >
                {/* ken-burns photo backdrop */}
                <div data-kb className="absolute inset-0 will-change-transform">
                  <Image src={p.image} alt={p.title[lang]} fill priority={i === 0} sizes="100vw" className="object-cover" />
                </div>
                {/* legibility washes */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/45" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/30 to-transparent rtl:bg-gradient-to-l" />

                {/* decorative motif (parallax float) */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-6 end-6 w-56 opacity-30 md:w-80 md:opacity-40"
                  animate={reduceMotion ? undefined : { y: [0, -16, 0] }}
                  transition={reduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image src={PHASE_MOTIF[i] ?? PHASE_MOTIF[0]} alt="" width={340} height={230} className="h-auto w-full" />
                </motion.div>

                {/* content */}
                <div className="relative z-10 flex h-full items-center">
                  <div className="mx-auto w-full max-w-6xl px-6 ps-20 md:px-10 md:ps-28">
                    <div className="max-w-xl">
                      <div
                        data-reveal
                        className="font-nums text-[6rem] font-bold leading-none text-white/10 md:text-[8rem]"
                        style={{ WebkitTextStroke: `1px ${glow}55` }}
                      >
                        {fmtNum(i + 1, lang)}
                      </div>
                      <div className="-mt-6 flex items-center gap-3 md:-mt-10">
                        <span
                          data-icon
                          className="grid h-11 w-11 place-items-center rounded-xl"
                          style={{ background: `${glow}22`, boxShadow: `inset 0 0 0 1px ${glow}66`, color: glow }}
                        >
                          <Ico size={24} weight="duotone" />
                        </span>
                        <span data-reveal className="text-xs font-semibold tracking-[0.2em] text-brand-light">
                          {p.kicker[lang]}
                        </span>
                      </div>
                      <h3 data-reveal className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                        {p.title[lang]}
                      </h3>
                      <span
                        data-reveal
                        className="glass-dark mt-4 inline-block rounded-full px-3.5 py-1.5 text-xs font-medium text-white/85"
                        style={{ boxShadow: `inset 0 0 0 1px ${glow}55` }}
                      >
                        {p.tag[lang]}
                      </span>
                      {extra?.line && (
                        <p data-reveal className="mt-5 max-w-lg text-lg font-semibold leading-snug text-white md:text-2xl">
                          {extra.line}
                        </p>
                      )}
                      <p data-reveal className="mt-3 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
                        {p.desc[lang]}
                      </p>
                      {extra?.highlights?.length ? (
                        <ul className="mt-5 space-y-2.5">
                          {extra.highlights.map((h) => (
                            <li key={h} data-reveal className="flex items-start gap-3 text-sm text-white/85 md:text-base">
                              <span
                                className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full"
                                style={{ background: `${glow}33`, color: glow }}
                              >
                                <ArrowUpRight size={11} weight="bold" />
                              </span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* persistent heading */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 pt-24 md:px-10">
            <div className="mx-auto max-w-6xl">{heading}</div>
          </div>

          {/* vertical 1→2→3 progress rail */}
          <div className="absolute top-1/2 z-20 flex -translate-y-1/2 flex-col items-center start-6 md:start-10">
            {phases.map((p, i) => {
              const glow = PHASE_GLOW[i] ?? "#6E82CD";
              const on = active >= i;
              return (
                <div key={p.id} className="flex flex-col items-center">
                  <span
                    className="font-nums grid h-8 w-8 place-items-center rounded-full border text-xs font-bold transition-all duration-500"
                    style={{
                      borderColor: on ? glow : "rgba(255,255,255,0.25)",
                      background: active === i ? glow : "transparent",
                      color: active === i ? "#070E43" : on ? glow : "rgba(255,255,255,0.5)",
                      boxShadow: active === i ? `0 0 16px ${glow}` : "none",
                    }}
                  >
                    {fmtNum(i + 1, lang)}
                  </span>
                  {i < N - 1 && (
                    <span className="my-1 h-14 w-0.5 overflow-hidden rounded-full bg-white/15">
                      <span
                        className="block w-full transition-all duration-500"
                        style={{ height: active > i ? "100%" : "0%", background: glow }}
                      />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ---------- Stacked immersive cards (mobile / reduced-motion) ---------- */
        <div className="px-6 py-20">
          <div className="mx-auto max-w-3xl">{heading}</div>
          <div className="mx-auto mt-10 max-w-3xl space-y-6">
            {phases.map((p, i) => {
              const Ico = PHASE_ICONS[i] ?? Sparkle;
              const glow = PHASE_GLOW[i] ?? "#6E82CD";
              const extra = extras?.[i];
              return (
                <motion.div
                  key={p.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="relative min-h-[30rem] overflow-hidden rounded-3xl"
                >
                  <Image src={p.image} alt={p.title[lang]} fill sizes="100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/65 to-brand-navy/25" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="mb-2 flex items-center gap-3">
                      <span
                        className="grid h-10 w-10 place-items-center rounded-xl"
                        style={{ background: `${glow}22`, boxShadow: `inset 0 0 0 1px ${glow}66`, color: glow }}
                      >
                        <Ico size={22} weight="duotone" />
                      </span>
                      <span className="text-xs font-semibold tracking-[0.2em] text-brand-light">{p.kicker[lang]}</span>
                    </div>
                    <h3 className="text-2xl font-bold">{p.title[lang]}</h3>
                    <span
                      className="glass-dark mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium text-white/85"
                      style={{ boxShadow: `inset 0 0 0 1px ${glow}55` }}
                    >
                      {p.tag[lang]}
                    </span>
                    {extra?.line && <p className="mt-3 text-base font-semibold leading-snug text-white">{extra.line}</p>}
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{p.desc[lang]}</p>
                    {extra?.highlights?.length ? (
                      <ul className="mt-3 space-y-2">
                        {extra.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5 text-sm text-white/85">
                            <span
                              className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full"
                              style={{ background: `${glow}33`, color: glow }}
                            >
                              <ArrowUpRight size={11} weight="bold" />
                            </span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
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
