import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

/** Formats a number, converting to Eastern Arabic-Indic digits when lang is "ar". */
export function fmtNum(n: number, lang: "ar" | "en") {
  const s = String(n);
  if (lang !== "ar") return s;
  return s.replace(/\d/g, (d) => arabicDigits[+d]);
}
