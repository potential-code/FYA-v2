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
