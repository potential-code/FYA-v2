# Participant Journey Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static funnel infographic image at the bottom of the landing Journey section with an animated, horizontal **timeline visual** of the 7-stage participant journey.

**Architecture:** A new client component composes AEGov `<Card>` + `@phosphor-icons/react` (AEGov's own icon library) + design tokens, plus two minimal styled wrappers (a connector line and a numbered badge) since AEGov ships no timeline component. Content lives in a new pure-data bilingual file. GSAP drives a scroll-triggered, playful reveal, reusing the same helpers already used in `JourneySection.tsx`.

**Tech Stack:** Next.js (App Router, client components), React, TypeScript, Tailwind CSS, `@aegov/design-system-react`, `@phosphor-icons/react`, GSAP + ScrollTrigger, `react-i18next` language context.

## Global Constraints

- **Visual only — never a stepper.** No step is ever completed/current/checked. All 7 numbered badges (1–7) render identically and stay visible; no checkmarks.
- **AEGov + tokens only.** UI built from AEGov `<Card>` + Phosphor icons + AEGov design tokens (`brand`, `brand-navy`, `surface-soft`, `ink-soft`, `muted`, `stroke`). The ONLY non-AEGov visual wrappers allowed: the connector line and the numbered badge. No other UI libraries.
- **Bilingual, no new i18n keys.** Content stored inline as `{ ar, en }`, matching `shared/content/phases.ts`. Text is picked with `step.field[lang]`.
- **RTL-aware and reduced-motion safe.** Animation direction mirrors reading order via `isArabic`; the `reduce` branch sets everything to its final visible state with no motion.
- **No test framework exists** in `client/` (scripts: `dev`, `build`, `typecheck` only). Do NOT add one. Verification per task = `bun run typecheck` (from `client/`), plus `bun run build` and a visual check at the final task.
- Commit message trailer: `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`

---

### Task 1: Journey steps content file

**Files:**
- Create: `shared/content/journeySteps.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `interface JourneyStep { id: string; num: { ar: string; en: string }; title: { ar: string; en: string }; desc: { ar: string; en: string }; icon: string }`
  - `const journeySteps: JourneyStep[]` — exactly 7 entries. `icon` is a Phosphor component name string: one of `"Megaphone" | "UserPlus" | "Laptop" | "Robot" | "ChalkboardTeacher" | "MapTrifold" | "Trophy"`.

- [ ] **Step 1: Create the content file**

Create `shared/content/journeySteps.ts` with this exact content:

```ts
/** The 7-stage participant journey shown as a horizontal timeline in the landing
 *  Journey section. Pure bilingual data (no React), mirroring shared/content/phases.ts.
 *  `icon` is a @phosphor-icons/react component name, mapped to a component in the
 *  ParticipantJourneyTimeline component. */
export interface JourneyStep {
  id: string;
  num: { ar: string; en: string };
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  icon: string;
}

export const journeySteps: JourneyStep[] = [
  {
    id: "awareness",
    num: { ar: "١", en: "1" },
    title: { ar: "الوعي", en: "Awareness" },
    desc: {
      ar: "التواصل والتفاعل المجتمعي",
      en: "Community outreach & engagement",
    },
    icon: "Megaphone",
  },
  {
    id: "registration",
    num: { ar: "٢", en: "2" },
    title: { ar: "التسجيل", en: "Registration" },
    desc: {
      ar: "التسجيل والتعيينة",
      en: "Sign-up & onboarding",
    },
    icon: "UserPlus",
  },
  {
    id: "self-paced-courses",
    num: { ar: "٣", en: "3" },
    title: { ar: "دورات ذاتية الوتيرة", en: "Self-paced courses" },
    desc: {
      ar: "التعلم بالوتيرة الخاصة بك",
      en: "Learn at your own pace",
    },
    icon: "Laptop",
  },
  {
    id: "ai-coaches",
    num: { ar: "٤", en: "4" },
    title: { ar: "مدربو الذكاء الاصطناعي", en: "AI coaches" },
    desc: {
      ar: "توجيه وإرشاد شخصي",
      en: "Personal guidance & mentoring",
    },
    icon: "Robot",
  },
  {
    id: "in-person-workshops",
    num: { ar: "٥", en: "5" },
    title: { ar: "ورش عمل حضورية", en: "In-person workshops" },
    desc: {
      ar: "٨ أيام من التعلم المكثف والعملي",
      en: "8 days of intensive hands-on learning",
    },
    icon: "ChalkboardTeacher",
  },
  {
    id: "field-trips",
    num: { ar: "٦", en: "6" },
    title: { ar: "رحلات ميدانية", en: "Field trips" },
    desc: {
      ar: "التعلم التجريبي في العالم الحقيقي",
      en: "Real-world experiential learning",
    },
    icon: "MapTrifold",
  },
  {
    id: "rewards",
    num: { ar: "٧", en: "7" },
    title: { ar: "المكافآت", en: "Rewards" },
    desc: {
      ar: "تقدير الإنجازات والاحتفال بالأثر",
      en: "Recognition & celebrating impact",
    },
    icon: "Trophy",
  },
];
```

- [ ] **Step 2: Typecheck**

Run: `cd client && bun run typecheck`
Expected: PASS (no errors). The `@shared/*` alias already resolves `shared/content/*` — confirm no "cannot find module" errors.

- [ ] **Step 3: Commit**

```bash
git add shared/content/journeySteps.ts
git commit -m "feat(content): add 7-stage participant journey steps

Bilingual journey data for the landing timeline, mirroring phases.ts.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Timeline component — static structure + responsive layout

**Files:**
- Create: `client/app/components/landing/ParticipantJourneyTimeline.tsx`

**Interfaces:**
- Consumes: `journeySteps` / `JourneyStep` from `@shared/content/journeySteps` (Task 1); `useLanguage()` from `../../context/LanguageContext` (returns `{ lang: "ar" | "en" }`); AEGov `Card`; Phosphor icons.
- Produces: `export function ParticipantJourneyTimeline(): JSX.Element` — a self-contained timeline with **no animation yet** (everything renders visible). DOM carries the hooks later tasks rely on: root `ref`, elements with `data-journey-line` (+ `data-orientation="horizontal|vertical"`), `data-journey-step`, `data-journey-badge`, `data-journey-body`.

This task renders the final DOM, fully visible and styled, with NO GSAP. Task 3 adds motion.

- [ ] **Step 1: Create the component**

Create `client/app/components/landing/ParticipantJourneyTimeline.tsx`:

```tsx
"use client";

import { useRef, type ComponentType } from "react";
import {
  Megaphone,
  UserPlus,
  Laptop,
  Robot,
  ChalkboardTeacher,
  MapTrifold,
  Trophy,
  type IconProps,
} from "@phosphor-icons/react";
import { Card } from "@aegov/design-system-react";
import { journeySteps } from "@shared/content/journeySteps";
import { useLanguage } from "../../context/LanguageContext";

/** Phosphor icon-name -> component. Content stores names as strings so it stays
 *  React-free; this map keeps the icon set explicit and tree-shakeable. */
const iconMap: Record<string, ComponentType<IconProps>> = {
  Megaphone,
  UserPlus,
  Laptop,
  Robot,
  ChalkboardTeacher,
  MapTrifold,
  Trophy,
};

export function ParticipantJourneyTimeline() {
  const { lang } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);

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

      <ol className="grid grid-cols-1 gap-8 md:grid-cols-7 md:gap-x-4">
        {journeySteps.map((step) => {
          const Icon = iconMap[step.icon] ?? Megaphone;
          return (
            <li
              key={step.id}
              data-journey-step
              className="flex flex-row items-start gap-4 md:flex-col md:items-center md:gap-0"
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
                className="w-full rounded-2xl border border-stroke bg-white p-0 shadow-sm md:mt-6"
              >
                <div
                  data-journey-body
                  className="group flex flex-col gap-2 p-5 transition-transform duration-300 hover:-translate-y-1 md:items-center md:text-center"
                >
                  <span className="text-brand transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Icon size={28} weight="duotone" aria-hidden />
                  </span>
                  <h3 className="text-base font-bold text-brand-navy">{step.title[lang]}</h3>
                  <p className="text-sm text-ink-soft">{step.desc[lang]}</p>
                </div>
              </Card>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `cd client && bun run typecheck`
Expected: PASS. (`@aegov/design-system-react` is ambient-typed as `any`, so `Card` won't error; `IconProps` and the Phosphor icon names must resolve.)

- [ ] **Step 3: Commit**

```bash
git add client/app/components/landing/ParticipantJourneyTimeline.tsx
git commit -m "feat(landing): add participant journey timeline (static)

Horizontal (desktop) / vertical (mobile) timeline of the 7 journey steps
built from AEGov Card + Phosphor icons + tokens. No animation yet.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Add GSAP scroll-triggered animation

**Files:**
- Modify: `client/app/components/landing/ParticipantJourneyTimeline.tsx`

**Interfaces:**
- Consumes: `ensureGsapRegistered()` from `../../lib/gsapConfig`; `useGsapMatchMedia()` from `../../hooks/useGsapMatchMedia` (returns `{ mm, breakpoints }` where `breakpoints` has `isDesktop`, `isMobile`, `reduce` media-query keys — same shape used in `JourneySection.tsx`); the `data-journey-*` hooks from Task 2; `lang`/`isArabic`.
- Produces: same exported component, now animated.

Animation: on scroll into view, the connector line(s) draw in (RTL-aware origin), then badges pop with `back.out(1.7)` and bodies fade-up, staggered. The `reduce` branch sets the final visible state. Nothing is ever marked complete.

- [ ] **Step 1: Add the imports**

In `ParticipantJourneyTimeline.tsx`, change the React import line and add three imports. Replace:

```tsx
import { useRef, type ComponentType } from "react";
```

with:

```tsx
import { useEffect, useRef, type ComponentType } from "react";
import gsap from "gsap";
```

Then, immediately after the existing `import { useLanguage } from "../../context/LanguageContext";` line, add:

```tsx
import { ensureGsapRegistered } from "../../lib/gsapConfig";
import { useGsapMatchMedia } from "../../hooks/useGsapMatchMedia";
```

- [ ] **Step 2: Derive `isArabic` and add the effect**

Replace this block:

```tsx
  const { lang } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);

  return (
```

with:

```tsx
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

        // Reduced motion: show the final state, no animation.
        if (reduce) {
          gsap.set(lines, { scaleX: 1, scaleY: 1, opacity: 1 });
          gsap.set(badges, { scale: 1, opacity: 1 });
          gsap.set(bodies, { opacity: 1, y: 0 });
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
      },
    );

    return () => mm.revert();
  }, [lang, isArabic]);

  return (
```

- [ ] **Step 3: Typecheck**

Run: `cd client && bun run typecheck`
Expected: PASS.

- [ ] **Step 4: Visual check (dev server)**

Run: `cd client && bun run dev` (serves on port 5000). Open `http://localhost:5000`, scroll to the Journey (`الرحلة`) section.
Expected: the connector line draws in, badges pop with a bounce, cards fade up in sequence; badges show 1–7 (Arabic numerals in AR), never checkmarks; hovering a card lifts it and nudges the icon. Toggle language to confirm RTL mirrors the draw direction. (If a `prefers-reduced-motion` OS setting is on, the timeline appears fully formed with no motion.)

- [ ] **Step 5: Commit**

```bash
git add client/app/components/landing/ParticipantJourneyTimeline.tsx
git commit -m "feat(landing): animate the participant journey timeline

Scroll-triggered line-draw + badge pop + fade-up via GSAP, RTL-aware and
reduced-motion safe, reusing the section's existing GSAP helpers.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Wire the timeline into JourneySection (remove the image)

**Files:**
- Modify: `client/app/components/landing/JourneySection.tsx`

**Interfaces:**
- Consumes: `ParticipantJourneyTimeline` from `./ParticipantJourneyTimeline` (Task 2/3).
- Produces: Journey section rendering the timeline in place of `journey-map.png`; the `mapWrapRef` wipe animation is removed. Header + 3 phase cards + their animations are unchanged.

- [ ] **Step 1: Add the import**

In `JourneySection.tsx`, immediately after the existing line
`import { useGsapMatchMedia } from "../../hooks/useGsapMatchMedia";`
add:

```tsx
import { ParticipantJourneyTimeline } from "./ParticipantJourneyTimeline";
```

- [ ] **Step 2: Remove the `mapWrapRef` declaration**

Delete this line:

```tsx
  const mapWrapRef = useRef<HTMLDivElement>(null);
```

- [ ] **Step 3: Remove the `mapWrapRef` reduced-motion set**

Inside the `if (reduce) { ... }` block, delete this line:

```tsx
          if (mapWrapRef.current) gsap.set(mapWrapRef.current, { clipPath: "inset(0 0% 0 0%)" });
```

- [ ] **Step 4: Remove the `mapWrapRef` wipe animation block**

Delete this entire block (the map wipe reveal):

```tsx
        if (mapWrapRef.current) {
          // Wipe-open reveal: mirrored for RTL so the wipe always travels in
          // the same visual direction the reading order does.
          const startClip = isArabic ? "inset(0 0% 0 100%)" : "inset(0 100% 0 0%)";
          gsap.fromTo(
            mapWrapRef.current,
            { clipPath: startClip },
            {
              clipPath: "inset(0 0% 0 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: mapWrapRef.current,
                start: "top 90%",
                end: "top 40%",
                scrub: 0.5,
              },
            },
          );
        }
```

- [ ] **Step 5: Replace the image block with the timeline**

Replace this block:

```tsx
        <div className="mt-14 overflow-hidden rounded-3xl border border-stroke">
          <div ref={mapWrapRef}>
            <Image
              src="/images/journey-map.png"
              alt={t("journeyMapAlt")}
              width={1200}
              height={480}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
```

with:

```tsx
        <ParticipantJourneyTimeline />
```

- [ ] **Step 6: Typecheck and build**

Run: `cd client && bun run typecheck && bun run build`
Expected: both PASS. (`Image` is still used for the header arch motif and the phase-card images, so its import stays. `isArabic` is still referenced by the cards' reveal, so it stays. If the build flags `isArabic` or `Image` as unused, something above was over-deleted — restore only what's genuinely still referenced.)

- [ ] **Step 7: Visual check**

Run: `cd client && bun run dev`. Open `http://localhost:5000`, scroll to the Journey section.
Expected: the funnel image is gone; the animated 7-step timeline renders in its place below the 3 phase cards; EN (LTR) and AR (RTL) both correct.

- [ ] **Step 8: Commit**

```bash
git add client/app/components/landing/JourneySection.tsx
git commit -m "feat(landing): replace journey funnel image with animated timeline

Swap the static journey-map.png for the ParticipantJourneyTimeline and
drop the now-unused mapWrapRef wipe animation.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Notes for the implementer

- **`journey-map.png` is intentionally left on disk.** It is only referenced from this section; removing the file is out of scope for this plan (avoids touching unrelated asset tooling). If a later cleanup removes it, also remove the now-unused `journeyMapAlt` i18n key — but not here.
- **Do not "improve" the 3 phase cards or the header.** Scope is strictly the image → timeline swap.
- **`asChild` on AEGov `<Card>`** merges its props onto the single child `<div>` (Radix Slot pattern) — this mirrors the existing usage in `JourneySection.tsx`; keep exactly one child element.
