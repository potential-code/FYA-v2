/**
 * UI-only validation helpers, ported verbatim from the original .dc.html vanilla JS.
 * These drive client-side field-error display only — there is no real submission
 * or backend validation in this phase.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UAE_PHONE_RE = /^(\+?971|0)?5\d{8}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isValidUaePhone(value: string): boolean {
  return UAE_PHONE_RE.test(value.replace(/[\s-]/g, ""));
}

export function ageFromDob(dob: string): number | null {
  const parsed = new Date(dob);
  if (Number.isNaN(parsed.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - parsed.getFullYear();
  const monthDiff = now.getMonth() - parsed.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < parsed.getDate())) {
    age -= 1;
  }
  return age;
}

export function trackForAge(age: number): "A" | "B" | null {
  if (age >= 13 && age <= 14) return "A";
  if (age >= 15 && age <= 18) return "B";
  return null;
}
