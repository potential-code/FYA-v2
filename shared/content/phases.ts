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
    title: { ar: "التمكين الرقمي والتقييم", en: "Digital Empowerment & Assessment" },
    desc: {
      ar: "تعلّم تفاعلي محفّز بالألعاب وتقييم أساسي عبر المحاور الستة — لأكثر من ١٠٠٠ مشارك على مستوى الدولة.",
      en: "Gamified interactive learning and baseline assessment across the six pillars — for 1000+ participants nationwide.",
    },
    accent: "linear-gradient(135deg,#8FA6E5,#6380D3)",
    image: "/images/phase-1.png",
  },
  {
    id: "experiential-learning",
    num: { ar: "٢", en: "2" },
    kicker: { ar: "المرحلة الثانية", en: "PHASE TWO" },
    tag: { ar: "حضوري · رأس الخيمة", en: "In person · Ras Al Khaimah" },
    title: { ar: "التعلم التجريبي — ٨ أيام", en: "Experiential Learning — 8 days" },
    desc: {
      ar: "ورش محاكاة، زيارات ميدانية، وجلسات «التقِ القادة» في رأس الخيمة لأفضل ٤٠ مشاركاً.",
      en: 'Simulation workshops, field visits, and "Meet the Leaders" sessions in Ras Al Khaimah for the top 40.',
    },
    accent: "linear-gradient(135deg,#6380D3,#4E6BC4)",
    image: "/images/phase-2.png",
  },
  {
    id: "engagement-impact",
    num: { ar: "٣", en: "3" },
    kicker: { ar: "المرحلة الثالثة", en: "PHASE THREE" },
    tag: { ar: "متابعة مستمرة · ٣ أشهر", en: "Ongoing · 3 months" },
    title: { ar: "المتابعة والأثر", en: "Engagement & Impact" },
    desc: {
      ar: "مشاريع أثر واقعية، متابعة العادات القيادية، وتواصل مستمر مع أولياء الأمور عبر المنصة.",
      en: "Real-life impact projects, leadership habit tracking, and ongoing parent engagement through the platform.",
    },
    accent: "linear-gradient(135deg,#4E6BC4,#3D56A6)",
    image: "/images/phase-3.png",
  },
];
