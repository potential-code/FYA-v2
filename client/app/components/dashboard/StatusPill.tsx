"use client";

import { cn } from "../../lib/utils";

interface StatusPillProps {
  label: string;
  tone?: "positive" | "neutral" | "warning";
  className?: string;
}

const TONE_CLASSES: Record<NonNullable<StatusPillProps["tone"]>, string> = {
  positive: "text-success bg-success/10",
  neutral: "text-brand bg-surface-accent",
  warning: "text-muted bg-surface-softer",
};

/** AEGov's React package ships no Badge component — this is a small in-house status pill. */
export function StatusPill({ label, tone = "neutral", className }: StatusPillProps) {
  return (
    <span className={cn("inline-block rounded-full px-2.5 py-1 text-xs font-semibold", TONE_CLASSES[tone], className)}>
      {label}
    </span>
  );
}
