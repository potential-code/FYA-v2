/** Age-group tracks used across Sign Up, Admin, and Participant mock data. */
export interface Track {
  id: "A" | "B";
  ageRange: string;
  label: { ar: string; en: string };
}

export const tracks: Track[] = [
  { id: "A", ageRange: "13-14", label: { ar: "المسار أ", en: "Track A" } },
  { id: "B", ageRange: "15-18", label: { ar: "المسار ب", en: "Track B" } },
];

export const emirates = [
  { ar: "أبوظبي", en: "Abu Dhabi" },
  { ar: "دبي", en: "Dubai" },
  { ar: "الشارقة", en: "Sharjah" },
  { ar: "عجمان", en: "Ajman" },
  { ar: "أم القيوين", en: "Umm Al Quwain" },
  { ar: "رأس الخيمة", en: "Ras Al Khaimah" },
  { ar: "الفجيرة", en: "Fujairah" },
];
