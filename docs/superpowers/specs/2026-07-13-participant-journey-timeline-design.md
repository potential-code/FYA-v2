# Participant Journey Timeline — Design Spec

**Date:** 2026-07-13
**Section:** Landing page `الرحلة` / Journey (`JourneySection.tsx`)

## Goal

Replace the static funnel/megaphone infographic image (`journey-map.png`) at the
bottom of the Journey section with a coded, animated **horizontal timeline
visual** of the 7-stage participant journey. Smooth, playful, scroll-triggered
animation. Built from AEGov (UAE Design System) components + design tokens only.

## Non-goals

- This is a **visual timeline only** — NOT an interactive progress stepper.
  No step is ever "completed" / checked / current. All 7 numbered badges (1–7)
  are always shown equally.
- The 3 phase cards and the header above the image are untouched.
- No new i18n translation keys — content is stored inline bilingual, matching the
  existing `shared/content/phases.ts` pattern.

## AEGov constraint & interpretation

The installed `@aegov/design-system-react` exposes: Accordion, Alert, Avatar,
Banner, Blockquote, Breadcrumbs, Button, Card, Checkbox, Dropdown, FileUpload,
Hyperlink, Input, Modal, Navigation, Pagination, Popover, Radio, RangeSlider,
Select, Steps, Tabs, Textarea, Toast, Toggle, Tooltip.

- AEGov's `Steps` is a **progress stepper** (completed→checkmark, current→ring,
  upcoming→muted grey number). It has no "all badges equal with numbers 1–7"
  state, so it is the wrong primitive for a pure timeline. **Not used.**
- AEGov ships **no** timeline/connector/number-badge component, and `Card`
  alone cannot draw a connector line or a numbered badge.
- **Decision (user-approved):** build the timeline from AEGov `<Card>` +
  `@phosphor-icons/react` (AEGov's own icon library, already installed) +
  design tokens, with exactly **two minimal styled wrappers** where AEGov has no
  equivalent: the **connector line** and the **numbered badge**. Both use AEGov
  design tokens for color/spacing (`brand`, `brand-navy`, `surface-soft`,
  `ink-soft`, `muted`, `stroke`, etc.). No third-party UI libraries, no custom
  visual widgets beyond those two wrappers.

## Content — the 7 steps

New file `shared/content/journeySteps.ts`. Pure bilingual data (React-free); the
icon is stored as a Phosphor icon **name string**, mapped to a component inside
the timeline component.

| # | num {ar/en} | title AR | title EN | desc AR | desc EN | icon |
|---|---|---|---|---|---|---|
| 1 | ١ / 1 | الوعي | Awareness | التواصل والتفاعل المجتمعي | Community outreach & engagement | Megaphone |
| 2 | ٢ / 2 | التسجيل | Registration | التسجيل والتعيينة | Sign-up & onboarding | UserPlus |
| 3 | ٣ / 3 | دورات ذاتية الوتيرة | Self-paced courses | التعلم بالوتيرة الخاصة بك | Learn at your own pace | Laptop |
| 4 | ٤ / 4 | مدربو الذكاء الاصطناعي | AI coaches | توجيه وإرشاد شخصي | Personal guidance & mentoring | Robot |
| 5 | ٥ / 5 | ورش عمل حضورية | In-person workshops | ٨ أيام من التعلم المكثف والعملي | 8 days of intensive hands-on learning | ChalkboardTeacher |
| 6 | ٦ / 6 | رحلات ميدانية | Field trips | التعلم التجريبي في العالم الحقيقي | Real-world experiential learning | MapTrifold |
| 7 | ٧ / 7 | المكافآت | Rewards | تقدير الإنجازات والاحتفال بالأثر | Recognition & celebrating impact | Trophy |

`JourneyStep` interface:
```ts
export interface JourneyStep {
  id: string;
  num: { ar: string; en: string };
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  icon: string; // Phosphor icon component name, e.g. "Megaphone"
}
```

## Components & structure

**New:** `client/app/components/landing/ParticipantJourneyTimeline.tsx`
(`"use client"`). Composes AEGov `<Card>` + Phosphor icons + GSAP. Contains an
icon-name → Phosphor component `Record` so the content file stays React-free.

- Each step = an AEGov `<Card>` containing: numbered badge (styled wrapper),
  Phosphor icon, title (`text-brand-navy`), short description (`text-ink-soft`).
- A single connector line (styled wrapper) runs through all badges.

**Layout**
- **Desktop (`isDesktop`):** 7 cards in a horizontal row; connector line is
  horizontal, running through the badge centers. RTL-aware ordering.
- **Mobile (`isMobile`):** cards stack vertically; connector line runs down the
  side through the badges.

**Edit:** `client/app/components/landing/JourneySection.tsx`
- Remove the `journey-map.png` block (current lines ~236–246) and its
  `mapWrapRef` GSAP wipe logic + the `mapWrapRef` ref.
- Render `<ParticipantJourneyTimeline />` in its place.
- Header + 3 phase-card grid + their animations unchanged.

## Animation (GSAP)

Reuse existing helpers: `ensureGsapRegistered()` (`lib/gsapConfig.ts`) and
`useGsapMatchMedia()` (`hooks/useGsapMatchMedia.ts`), matching the pattern
already in `JourneySection.tsx`.

Scroll-triggered, playful, one fluid sequence:
1. **Connector line draws in** along the reading direction (scaleX / clip-based),
   as a pure visual flourish — no completion semantics.
2. **Badges pop** in sequence with `back.out(1.7)` scale bounce as the line
   reaches each; Phosphor icon does a small settle.
3. **Title + description fade-up**, staggered, overlapping so it reads as one
   motion (same easing/pattern as the existing phase-card cascade).
4. **Hover** on a card: gentle lift (`-translate-y`) + subtle icon wiggle.

**RTL:** animation direction mirrors reading order (right→left for Arabic), same
approach as the existing `mapWrapRef` clip mirroring. Driven by `isArabic`.

**Reduced motion (`reduce` branch):** set everything to final visible state
(line fully drawn, all badges/cards visible), no motion — reusing the existing
`reduce` guard pattern in the file.

## Files summary

| File | Action |
|---|---|
| `shared/content/journeySteps.ts` | **new** — 7 bilingual steps + icon names |
| `client/app/components/landing/ParticipantJourneyTimeline.tsx` | **new** — timeline component (AEGov Card + Phosphor + GSAP) |
| `client/app/components/landing/JourneySection.tsx` | **edit** — swap image block for the timeline; drop `mapWrapRef` |

## Testing / verification

- `bun run build` (or the client typecheck/lint) passes.
- Visual check at desktop + mobile widths, in both EN (LTR) and AR (RTL): all 7
  badges show numbers 1–7 (never checkmarks), line + cards animate on scroll,
  hover works, reduced-motion shows the final static state.
