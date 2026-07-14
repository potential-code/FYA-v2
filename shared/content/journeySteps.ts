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
    id: "registration-consent",
    num: { ar: "١", en: "1" },
    title: { ar: "التسجيل وموافقة ولي الأمر", en: "Registration & guardian consent" },
    desc: {
      ar: "أنشئ حسابك، وأضف بيانات ولي الأمر لتفعيل مشاركتك.",
      en: "Create your account and add your guardian's details to activate your participation.",
    },
    icon: "UserPlus",
  },
  {
    id: "interactive-courses",
    num: { ar: "٢", en: "2" },
    title: { ar: "الدورات التفاعلية", en: "Interactive courses" },
    desc: {
      ar: "أنجز الدورات والتحديات، وطوّر مهاراتك عبر ستة محاور قيادية.",
      en: "Complete the courses and challenges, and develop your skills across six leadership pillars.",
    },
    icon: "Laptop",
  },
  {
    id: "ai-support",
    num: { ar: "٣", en: "3" },
    title: { ar: "الدعم بالذكاء الاصطناعي", en: "AI support" },
    desc: {
      ar: "احصل على توجيه شخصي يساعدك على تحقيق أفضل أداء.",
      en: "Get personalized guidance that helps you achieve your best performance.",
    },
    icon: "Robot",
  },
  {
    id: "challenges-assessment",
    num: { ar: "٤", en: "4" },
    title: { ar: "التحديات والتقييم", en: "Challenges & assessment" },
    desc: {
      ar: "أنجز الأنشطة، وأثبت تميزك، وتابع تقدمك خلال الرحلة.",
      en: "Complete the activities, prove your excellence, and track your progress throughout the journey.",
    },
    icon: "Target",
  },
  {
    id: "in-person-workshops",
    num: { ar: "٥", en: "5" },
    title: { ar: "ورش العمل الحضورية", en: "In-person workshops" },
    desc: {
      ar: "نافس لتكون من بين أفضل 40 مشاركاً يتأهلون إلى ورش عمل حضورية.",
      en: "Compete to be among the top 40 participants who qualify for in-person workshops.",
    },
    icon: "ChalkboardTeacher",
  },
  {
    id: "field-experiences",
    num: { ar: "٦", en: "6" },
    title: { ar: "التجارب الميدانية", en: "Field experiences" },
    desc: {
      ar: "طبّق ما تعلمته من خلال أنشطة وتجارب واقعية تعزز مهاراتك القيادية.",
      en: "Apply what you've learned through real-world activities and experiences that strengthen your leadership skills.",
    },
    icon: "MapTrifold",
  },
  {
    id: "achievement-recognition",
    num: { ar: "٧", en: "7" },
    title: { ar: "الإنجاز والتكريم", en: "Achievement & recognition" },
    desc: {
      ar: "احتفل بإنجازاتك، واحصل على شهادة وتقدير لرحلتك القيادية.",
      en: "Celebrate your achievements and receive a certificate and recognition for your leadership journey.",
    },
    icon: "Trophy",
  },
];
