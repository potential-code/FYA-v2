/**
 * Mock/fixture data for the Admin, Parent, and Participant portals.
 * Ported verbatim from the original .dc.html hardcoded arrays (Admin Dashboard.dc.html,
 * Parent Portal.dc.html, Participant Portal.dc.html). No backend/API exists yet in this
 * phase — this is the single source of truth the client renders directly, and the
 * server can reuse as seed data once the backend phase starts.
 */

export interface AdminKpi {
  label: { ar: string; en: string };
  value: { ar: string; en: string };
  sub: { ar: string; en: string };
  tone: "positive" | "neutral";
}

export const adminKpis: AdminKpi[] = [
  {
    label: { ar: "إجمالي المسجلين", en: "Total registered" },
    value: { ar: "١٬٢٤٨", en: "1,248" },
    sub: { ar: "+١٢٪ هذا الأسبوع", en: "+12% this week" },
    tone: "positive",
  },
  {
    label: { ar: "أكملوا التقييم الأساسي", en: "Completed baseline" },
    value: { ar: "١٬٠٣٢", en: "1,032" },
    sub: { ar: "٨٣٪ من المسجلين", en: "83% of registered" },
    tone: "neutral",
  },
  {
    label: { ar: "نشطون هذا الأسبوع", en: "Active this week" },
    value: { ar: "٨٦١", en: "861" },
    sub: { ar: "٦٩٪ من المسجلين", en: "69% of registered" },
    tone: "neutral",
  },
  {
    label: { ar: "متوسط الإتقان العام", en: "Overall mastery avg." },
    value: { ar: "٧٢٪", en: "72%" },
    sub: { ar: "+٥ نقاط عن خط الأساس", en: "+5 pts vs baseline" },
    tone: "positive",
  },
];

export interface FunnelStep {
  label: { ar: string; en: string };
  value: { ar: string; en: string };
  widthPct: number;
  final: boolean;
}

export const selectionFunnel: FunnelStep[] = [
  { label: { ar: "التسجيل", en: "Registered" }, value: { ar: "١٬٢٤٨", en: "1,248" }, widthPct: 100, final: false },
  {
    label: { ar: "إتمام التقييم الأساسي", en: "Completed baseline assessment" },
    value: { ar: "١٬٠٣٢", en: "1,032" },
    widthPct: 83,
    final: false,
  },
  { label: { ar: "القائمة المختصرة", en: "Shortlisted" }, value: { ar: "١٢٠", en: "120" }, widthPct: 22, final: false },
  {
    label: { ar: "الأفضل ٤٠ — البرنامج التجريبي", en: "Top 40 — pilot program" },
    value: { ar: "٤٠ (مستهدف)", en: "40 (target)" },
    widthPct: 9,
    final: true,
  },
];

/** Average pillar mastery scores (0-100), in pillar order matching shared/content/pillars.ts. */
export const pillarAverageScores = [78, 71, 66, 74, 62, 81];
export const pillarScoreDeltas = [4, 6, 2, 5, 1, 8];
/** [low, mid, high] distribution percentages per pillar, in pillar order. */
export const pillarScoreDistribution: [number, number, number][] = [
  [18, 42, 40],
  [22, 44, 34],
  [30, 44, 26],
  [20, 42, 38],
  [34, 44, 22],
  [14, 40, 46],
];
/** Track A vs Track B average scores per pillar, in pillar order. */
export const trackComparisonScores: { a: number; b: number }[] = [
  { a: 74, b: 82 },
  { a: 68, b: 74 },
  { a: 61, b: 71 },
  { a: 70, b: 78 },
  { a: 58, b: 66 },
  { a: 77, b: 85 },
];

export type ParticipantStatus = "assessing" | "shortlisted" | "top40";

export interface MockStudent {
  name: { ar: string; en: string };
  initial: { ar: string; en: string };
  emirate: { ar: string; en: string };
  track: "A" | "B";
  progressPct: number;
  score: number;
  status: ParticipantStatus;
}

export const mockStudents: MockStudent[] = [
  {
    name: { ar: "مريم النعيمي", en: "Maryam Alnuaimi" },
    initial: { ar: "م", en: "M" },
    emirate: { ar: "رأس الخيمة", en: "Ras Al Khaimah" },
    track: "B",
    progressPct: 88,
    score: 94,
    status: "top40",
  },
  {
    name: { ar: "أحمد الشامسي", en: "Ahmed Alshamsi" },
    initial: { ar: "أ", en: "A" },
    emirate: { ar: "الشارقة", en: "Sharjah" },
    track: "B",
    progressPct: 42,
    score: 89,
    status: "shortlisted",
  },
  {
    name: { ar: "سلطان الكعبي", en: "Sultan Alkaabi" },
    initial: { ar: "س", en: "S" },
    emirate: { ar: "أبوظبي", en: "Abu Dhabi" },
    track: "A",
    progressPct: 76,
    score: 87,
    status: "shortlisted",
  },
  {
    name: { ar: "فاطمة الزعابي", en: "Fatima Alzaabi" },
    initial: { ar: "ف", en: "F" },
    emirate: { ar: "دبي", en: "Dubai" },
    track: "B",
    progressPct: 91,
    score: 92,
    status: "top40",
  },
  {
    name: { ar: "خالد المنصوري", en: "Khalid Almansoori" },
    initial: { ar: "خ", en: "K" },
    emirate: { ar: "العين", en: "Al Ain" },
    track: "A",
    progressPct: 55,
    score: 78,
    status: "assessing",
  },
  {
    name: { ar: "شما الظاهري", en: "Shamma Aldhaheri" },
    initial: { ar: "ش", en: "S" },
    emirate: { ar: "أبوظبي", en: "Abu Dhabi" },
    track: "A",
    progressPct: 68,
    score: 84,
    status: "shortlisted",
  },
  {
    name: { ar: "راشد السويدي", en: "Rashed Alsuwaidi" },
    initial: { ar: "ر", en: "R" },
    emirate: { ar: "دبي", en: "Dubai" },
    track: "B",
    progressPct: 33,
    score: 71,
    status: "assessing",
  },
  {
    name: { ar: "موزة المهيري", en: "Moza Almheiri" },
    initial: { ar: "م", en: "M" },
    emirate: { ar: "دبي", en: "Dubai" },
    track: "A",
    progressPct: 82,
    score: 90,
    status: "top40",
  },
];

export const recentRegistrations = [
  { name: { ar: "حمدان البلوشي", en: "Hamdan Albalooshi" }, meta: { ar: "المسار أ · الفجيرة", en: "Track A · Fujairah" }, minutesAgo: 5 },
  { name: { ar: "علياء الحوسني", en: "Alya Alhosani" }, meta: { ar: "المسار ب · عجمان", en: "Track B · Ajman" }, minutesAgo: 12 },
  { name: { ar: "سيف النقبي", en: "Saif Alnaqbi" }, meta: { ar: "المسار أ · أم القيوين", en: "Track A · Umm Al Quwain" }, minutesAgo: 40 },
  { name: { ar: "لطيفة الشحي", en: "Latifa Alshehhi" }, meta: { ar: "المسار ب · رأس الخيمة", en: "Track B · Ras Al Khaimah" }, minutesAgo: 60 },
  { name: { ar: "محمد الحمادي", en: "Mohammed Alhammadi" }, meta: { ar: "المسار أ · الشارقة", en: "Track A · Sharjah" }, minutesAgo: 120 },
];

/** Shared mock profile used by both the Parent and Participant portals (same "child"). */
export const mockChildProfile = {
  name: { ar: "أحمد الشامسي", en: "Ahmed Alshamsi" },
  initial: { ar: "أ", en: "A" },
  points: 1240,
  pointsThisWeek: 80,
  dayStreak: 7,
  badges: 4,
  overallProgressPct: 42,
  currentPillarIndex: 1, // Self-Management & Discipline
};

export const weeklyEngagementDays = [
  { day: { ar: "س", en: "Sat" }, minutes: 35 },
  { day: { ar: "ح", en: "Sun" }, minutes: 50 },
  { day: { ar: "ن", en: "Mon" }, minutes: 20 },
  { day: { ar: "ث", en: "Tue" }, minutes: 60 },
  { day: { ar: "ر", en: "Wed" }, minutes: 45 },
  { day: { ar: "خ", en: "Thu" }, minutes: 55 },
  { day: { ar: "ج", en: "Fri" }, minutes: 15 },
];
