/** The three Youth Leaders Path program phases — ported verbatim from Landing.dc.html's phasesFor(). */
export interface Phase {
  id: string;
  num: { ar: string; en: string };
  kicker: { ar: string; en: string };
  tag: { ar: string; en: string };
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  accent: string;
  image: string;
}

export const phases: Phase[] = [
  {
    id: "digital-empowerment",
    num: { ar: "١", en: "1" },
    kicker: { ar: "المرحلة الأولى", en: "PHASE ONE" },
    tag: { ar: "عبر المنصة · على مستوى الدولة", en: "On platform · nationwide" },
    title: { ar: "التعلّم الرقمي", en: "Digital Learning" },
    desc: {
      ar: "ابدأ رحلتك عبر منصة تفاعلية تضم ستة محاور قيادية، وأنشطة عملية، وتحديات تساعدك على تطوير مهاراتك خطوة بخطوة.",
      en: "Begin your journey through an interactive platform with six leadership pillars, practical activities, and challenges that help you develop your skills step by step.",
    },
    accent: "linear-gradient(135deg,#8FA6E5,#6380D3)",
    image: "/images/phase-1.png",
  },
  {
    id: "experiential-learning",
    num: { ar: "٢", en: "2" },
    kicker: { ar: "المرحلة الثانية", en: "PHASE TWO" },
    tag: { ar: "حضوري · رأس الخيمة", en: "In person · Ras Al Khaimah" },
    title: { ar: "التأهل للتجربة الحضورية", en: "Qualifying for the in-person experience" },
    desc: {
      ar: "أظهر التزامك وتميّزك خلال رحلتك الرقمية، ونافس لتكون من بين أفضل 40 مشاركاً يتأهلون إلى ورش العمل الحضورية المكثفة لمدة 8 أيام.",
      en: "Show your commitment and excellence throughout your digital journey, and compete to be among the top 40 participants who qualify for the 8-day intensive in-person workshops.",
    },
    accent: "linear-gradient(135deg,#6380D3,#4E6BC4)",
    image: "/images/phase-2.png",
  },
  {
    id: "engagement-impact",
    num: { ar: "٣", en: "3" },
    kicker: { ar: "المرحلة الثالثة", en: "PHASE THREE" },
    tag: { ar: "متابعة مستمرة · ٣ أشهر", en: "Ongoing · 3 months" },
    title: { ar: "التطبيق وصناعة الأثر", en: "Application and creating impact" },
    desc: {
      ar: "طبّق ما تعلمته في بيئة واقعية، واكتسب خبرات عملية، وابدأ بصناعة أثر يبقى معك بعد انتهاء الرحلة.",
      en: "Apply what you've learned in a real-world setting, gain practical experience, and start creating an impact that stays with you after the journey ends.",
    },
    accent: "linear-gradient(135deg,#4E6BC4,#3D56A6)",
    image: "/images/phase-3.png",
  },
];
