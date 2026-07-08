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
      ar: "ترسيخ الانتماء الوطني والقيم الإماراتية الأصيلة كأساس لكل قائد — عبر قصص القيادات الإماراتية وجلسات حوارية تربط الهوية بالممارسة اليومية.",
      en: "Grounding national belonging and authentic Emirati values as the foundation of every leader — through stories of Emirati leaders and dialogue sessions linking identity to daily practice.",
    },
    tags: {
      ar: ["القيم الإماراتية", "الانتماء الوطني", "السرد والقصص التراثية"],
      en: ["Emirati values", "National belonging", "Heritage storytelling"],
    },
  },
  {
    id: "self-management",
    num: { ar: "٢", en: "2" },
    title: { ar: "الإدارة الذاتية والانضباط", en: "Self-Management & Discipline" },
    desc: {
      ar: "بناء عادات يومية منضبطة وإدارة الوقت والطاقة بوعي ومسؤولية — لأن القائد الذي يقود نفسه أولاً قادر على قيادة الآخرين.",
      en: "Building disciplined daily habits and managing time and energy with intention — because a leader who leads themselves first can lead others.",
    },
    tags: {
      ar: ["إدارة الوقت والطاقة", "بناء العادات", "الاتزان والتركيز"],
      en: ["Time & energy", "Habit building", "Focus & balance"],
    },
  },
  {
    id: "communication",
    num: { ar: "٣", en: "3" },
    title: { ar: "مهارات التواصل", en: "Communication Skills" },
    desc: {
      ar: "التعبير بثقة، والإصغاء الفعّال، وفن العرض والإقناع — مهارات تُصقل عبر تحديات إلقاء حقيقية وإنتاج محتوى إعلامي.",
      en: "Speaking with confidence, active listening, and the art of presenting and persuasion — sharpened through real speaking challenges and media production.",
    },
    tags: {
      ar: ["الإلقاء والعرض", "الإصغاء الفعّال", "الحوار والإقناع"],
      en: ["Public speaking", "Active listening", "Dialogue & persuasion"],
    },
  },
  {
    id: "leadership-teamwork",
    num: { ar: "٤", en: "4" },
    title: { ar: "القيادة والعمل الجماعي", en: "Leadership & Teamwork" },
    desc: {
      ar: "قيادة الفرق، وتوزيع الأدوار، واتخاذ القرار في المواقف الحقيقية — عبر محاكاة وتحديات جماعية تُظهر شخصية القائد.",
      en: "Leading teams, delegating roles, and making decisions in real situations — through simulations and group challenges that reveal leadership character.",
    },
    tags: {
      ar: ["قيادة الفرق", "اتخاذ القرار", "توزيع الأدوار"],
      en: ["Leading teams", "Decision-making", "Role delegation"],
    },
  },
  {
    id: "initiative-community",
    num: { ar: "٥", en: "5" },
    title: { ar: "المبادرة والمسؤولية المجتمعية", en: "Initiative & Community Responsibility" },
    desc: {
      ar: "تحويل الأفكار إلى مشاريع أثر تخدم المجتمع وتترك بصمة — من التخطيط إلى التنفيذ والقياس، بإشراف مرشدين مختصين.",
      en: "Turning ideas into impact projects that serve the community and leave a mark — from planning to execution and measurement, guided by dedicated mentors.",
    },
    tags: {
      ar: ["مشاريع الأثر", "خدمة المجتمع", "ريادة المبادرات"],
      en: ["Impact projects", "Community service", "Initiative leadership"],
    },
  },
  {
    id: "future-digital",
    num: { ar: "٦", en: "6" },
    title: { ar: "مهارات المستقبل والمواطنة الرقمية", en: "Future Skills & Digital Citizenship" },
    desc: {
      ar: "الذكاء الاصطناعي، والمهارات المستقبلية، والاستخدام المسؤول للتقنية — ليقود المشارك بثقة في عالم رقمي متسارع.",
      en: "AI, future-ready skills, and responsible use of technology — so participants lead with confidence in a fast-moving digital world.",
    },
    tags: {
      ar: ["الذكاء الاصطناعي", "صناعة المحتوى", "المواطنة الرقمية"],
      en: ["AI literacy", "Content creation", "Digital citizenship"],
    },
  },
];
