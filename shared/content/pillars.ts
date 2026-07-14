/** The six Youth Leaders Path leadership pillars — ported verbatim from Landing.dc.html's pillarsRaw(). */
export interface Pillar {
  id: string;
  num: { ar: string; en: string };
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  tags: { ar: string[]; en: string[] };
}

export const pillars: Pillar[] = [
  {
    id: "identity-values",
    num: { ar: "١", en: "1" },
    title: { ar: "الهوية والقيم", en: "Identity & Values" },
    desc: {
      ar: "ترسّخ قيم الإمارات، وتعزز الانتماء، وتحوّل الهوية الوطنية إلى سلوك قيادي في الحياة اليومية.",
      en: "Instills the values of the UAE, strengthens belonging, and turns national identity into leadership behavior in daily life.",
    },
    tags: {
      ar: ["الهوية الوطنية", "القيم الإماراتية", "الانتماء والمسؤولية"],
      en: ["National identity", "Emirati values", "Belonging & responsibility"],
    },
  },
  {
    id: "self-management",
    num: { ar: "٢", en: "2" },
    title: { ar: "القيادة الذاتية", en: "Self-Leadership" },
    desc: {
      ar: "تبني شخصيتك القيادية من خلال الوعي الذاتي، والانضباط، والمرونة، واتخاذ القرارات بثقة.",
      en: "Builds your leadership character through self-awareness, discipline, resilience, and confident decision-making.",
    },
    tags: {
      ar: ["الوعي الذاتي", "إدارة الوقت", "اتخاذ القرار"],
      en: ["Self-awareness", "Time management", "Decision-making"],
    },
  },
  {
    id: "communication",
    num: { ar: "٣", en: "3" },
    title: { ar: "التواصل والتأثير", en: "Communication & Influence" },
    desc: {
      ar: "تطوّر مهارات التواصل والحوار، وتعزز قدرتك على التأثير الإيجابي وبناء حضور قيادي.",
      en: "Develops communication and dialogue skills, and strengthens your ability to influence positively and build a leadership presence.",
    },
    tags: {
      ar: ["التواصل الفعّال", "الحوار والإقناع", "الحضور القيادي"],
      en: ["Effective communication", "Dialogue & persuasion", "Leadership presence"],
    },
  },
  {
    id: "leadership-teamwork",
    num: { ar: "٤", en: "4" },
    title: { ar: "قيادة الفرق والتعاون", en: "Leading Teams & Collaboration" },
    desc: {
      ar: "تنمّي مهارات العمل الجماعي، وقيادة الفرق، وتحقيق النتائج من خلال التعاون.",
      en: "Develops teamwork skills, team leadership, and achieving results through collaboration.",
    },
    tags: {
      ar: ["العمل الجماعي", "توزيع الأدوار", "إدارة الاختلاف"],
      en: ["Teamwork", "Role delegation", "Managing differences"],
    },
  },
  {
    id: "initiative-community",
    num: { ar: "٥", en: "5" },
    title: { ar: "العمل المجتمعي والأثر", en: "Community Work & Impact" },
    desc: {
      ar: "تشجعك على توظيف مهاراتك القيادية في مبادرات تصنع أثراً إيجابياً في المجتمع.",
      en: "Encourages you to use your leadership skills in initiatives that make a positive impact on the community.",
    },
    tags: {
      ar: ["خدمة المجتمع", "المبادرات القيادية", "صناعة الأثر"],
      en: ["Community service", "Leadership initiatives", "Creating impact"],
    },
  },
  {
    id: "future-digital",
    num: { ar: "٦", en: "6" },
    title: { ar: "المهارات المستقبلية والرقمية", en: "Future & Digital Skills" },
    desc: {
      ar: "تؤهلك لمتطلبات المستقبل من خلال الابتكار، والتفكير النقدي، والاستخدام المسؤول للتكنولوجيا.",
      en: "Prepares you for the demands of the future through innovation, critical thinking, and responsible use of technology.",
    },
    tags: {
      ar: ["التفكير النقدي", "الابتكار", "الوعي الرقمي"],
      en: ["Critical thinking", "Innovation", "Digital awareness"],
    },
  },
];
