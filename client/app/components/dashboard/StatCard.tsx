"use client";

import { cn } from "../../lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  tone?: "positive" | "neutral" | "warning";
  className?: string;
}

const TONE_CLASSES: Record<NonNullable<StatCardProps["tone"]>, string> = {
  positive: "text-success bg-success/10",
  neutral: "text-brand bg-surface-accent",
  warning: "text-warning-dark bg-warning/10",
};

export function StatCard({ label, value, sub, tone = "neutral", className }: StatCardProps) {
  return (
    <div className={cn("rounded-2xl border border-stroke bg-white p-5", className)}>
      <div className="text-sm text-muted">{label}</div>
      <div className="mt-2 text-2xl font-bold text-brand-navy">{value}</div>
      {sub && (
        <span className={cn("mt-3 inline-block rounded-full px-2.5 py-1 text-xs font-semibold", TONE_CLASSES[tone])}>
          {sub}
        </span>
      )}
    </div>
  );
}
