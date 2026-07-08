"use client";

import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface ProgressBarProps {
  /** 0-100 */
  percent: number;
  className?: string;
  trackClassName?: string;
  barClassName?: string;
}

export function ProgressBar({ percent, className, trackClassName, barClassName }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-accent", trackClassName, className)}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${clamped}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn("h-full rounded-full bg-brand", barClassName)}
      />
    </div>
  );
}
