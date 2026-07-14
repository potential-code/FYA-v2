# v1 Landing & Auth — Content Status vs. the Approved Document

The v1 landing page (`/`) now shows **only content from** `FYA Arabic Landing Page Content.docx`, except for the explicitly agreed exceptions listed below. All Arabic on v1 has been verified **verbatim** against the document (exact wording, punctuation, and the document's Latin digits).

> v2 preview (`/landing-preview`) was intentionally left untouched (to be deleted later).

## Removed from v1 (were not in the document)
- **Hero badge** ("المؤسسة الاتحادية للشباب · دفعة ٢٠٢٦")
- **Hero "1000+ participants nationwide" stat** and the **About "1,000+ participants nationwide" stat**
- **About card tags** (سجل شخصي / تعلّم محفّز / واجهة ولي الأمر / شفافية كاملة)
- **About CTA button** ("انضم إلى الرحلة")
- **Phase card meta line** — kicker ("المرحلة الأولى/الثانية/الثالثة") + tag ("عبر المنصة · على مستوى الدولة", …)
- **Footer copyright line** ("© ٢٠٢٦ المؤسسة الاتحادية للشباب…") and **footer tagline** ("كل خطوة في مسارك تفرق")

(The shared i18n keys/fields behind the badge, About CTA, and phase kicker/tag were left in the locale/content files because the v2 preview still references them — only the v1 rendering was removed.)

## Kept on v1 (agreed exceptions — not in the document)
- **Stat counters** — hero stats (6 / 8 / 40) and the About stat bar (6 pillars / Top 40 / 2 age tracks). *Kept per request.*
- **Phase numbers** (1–3) and **pillar numbers** (1–6). *Just numbers — kept per request.*
- **Language toggle** (AR/EN) in the nav. *Functional control, not page copy.*
- **Footer link columns** (البرنامج / الحساب) — their link labels come from the document's navigation section (عن البرنامج / رحلة البرنامج / ركائز البرنامج / تسجيل الدخول / التسجيل).
- **Journey section title** ("ثلاث مراحل، مسار واحد") + **subheading**. *Kept per request, though not in the document.*

## Section labels now sourced from the document
Each section's kicker uses the document's own bilingual section label:
- About → **عن البرنامج** / About the Programme
- Phases → **مراحل البرنامج** / Programme Phases
- Journey steps → **رحلتك خطوة بخطوة** / User Journey (added above the 7-step timeline)
- Pillars → **ركائز البرنامج** / Leadership Pillars

## Still open
- **Contact nav item** — the document's nav lists "تواصل معنا" (Contact), but there is no contact page/section to link to. It was **not** added. Provide a destination (page or anchor) to enable it.
- **Guardian relationship field** ("صلة القرابة") — in the document's Sign Up form but not added (per earlier decision). Label "صلة القرابة" / placeholder "اختر صلة القرابة" available if you want it later.

## Auth pages (Sign Up / Login)
Applied verbatim from the document. A few functional/support strings with no document equivalent remain (age-track badges, DOB hint, consent info, success/timeline text, generic "fill required fields" fallback, login footer/validation) — these are UI necessities, not marketing copy.
