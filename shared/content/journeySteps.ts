/** The 7-stage participant journey shown as a horizontal timeline in the landing
 *  Journey section. Pure bilingual data (no React), mirroring shared/content/phases.ts.
 *  `image` is the public path to the step's illustration, cropped from the original
 *  journey funnel infographic and displayed in each timeline card. */
export interface JourneyStep {
  id: string;
  num: { ar: string; en: string };
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  image: string;
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
    image: "/images/journey/step-1.png",
  },
  {
    id: "registration",
    num: { ar: "٢", en: "2" },
    title: { ar: "التسجيل", en: "Registration" },
    desc: {
      ar: "التسجيل والتهيئة",
      en: "Sign-up & onboarding",
    },
    image: "/images/journey/step-2.png",
  },
  {
    id: "self-paced-courses",
    num: { ar: "٣", en: "3" },
    title: { ar: "دورات ذاتية الوتيرة", en: "Self-paced courses" },
    desc: {
      ar: "التعلم بالوتيرة الخاصة بك",
      en: "Learn at your own pace",
    },
    image: "/images/journey/step-3.png",
  },
  {
    id: "ai-coaches",
    num: { ar: "٤", en: "4" },
    title: { ar: "مدربو الذكاء الاصطناعي", en: "AI coaches" },
    desc: {
      ar: "توجيه وإرشاد شخصي",
      en: "Personal guidance & mentoring",
    },
    image: "/images/journey/step-4.png",
  },
  {
    id: "in-person-workshops",
    num: { ar: "٥", en: "5" },
    title: { ar: "ورش عمل حضورية", en: "In-person workshops" },
    desc: {
      ar: "٨ أيام من التعلم المكثف والعملي",
      en: "8 days of intensive hands-on learning",
    },
    image: "/images/journey/step-5.png",
  },
  {
    id: "field-trips",
    num: { ar: "٦", en: "6" },
    title: { ar: "رحلات ميدانية", en: "Field trips" },
    desc: {
      ar: "التعلم التجريبي في العالم الحقيقي",
      en: "Real-world experiential learning",
    },
    image: "/images/journey/step-6.png",
  },
  {
    id: "rewards",
    num: { ar: "٧", en: "7" },
    title: { ar: "المكافآت", en: "Rewards" },
    desc: {
      ar: "تقدير الإنجازات والاحتفال بالأثر",
      en: "Recognition & celebrating impact",
    },
    image: "/images/journey/step-7.png",
  },
];
