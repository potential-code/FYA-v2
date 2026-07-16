"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Check } from "@phosphor-icons/react";
import { Card, Button } from "@aegov/design-system-react";

export function SignupSuccess({ firstName, parentEmail }: { firstName: string; parentEmail: string }) {
  const { t } = useTranslation("translation", { keyPrefix: "signup" });
  const reduceMotion = useReducedMotion();

  return (
    <Card
      asChild
      variant="news"
      bordered
      className="w-full max-w-xl rounded-2xl border-stroke bg-white p-6 text-center shadow-sm sm:p-10 lg:p-12"
    >
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-full border-2 border-success/30 bg-success/10 text-success-dark">
        <Check size={32} weight="bold" />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-brand-navy">{t("doneTitle")}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
        {t("doneMsgA")} {firstName}! {t("doneMsgB")}
      </p>

      <div className="mt-8 flex flex-col rounded-2xl border border-stroke bg-surface-soft p-6 text-start">
        <div className="flex items-start gap-3.5">
          <div className="flex flex-col items-center">
            <div className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-success text-sm text-white">
              <Check size={14} weight="bold" />
            </div>
            <div className="min-h-[26px] w-0.5 flex-1 bg-success/30" />
          </div>
          <div className="pb-5">
            <div className="text-sm font-bold text-brand-navy">{t("tl1")}</div>
            <div className="text-xs text-muted">{t("tl1s")}</div>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="flex flex-col items-center">
            <motion.div
              // MotionConfig reducedMotion doesn't cover opacity loops, so gate explicitly.
              animate={reduceMotion ? { opacity: 1 } : { opacity: [1, 0.45, 1] }}
              transition={reduceMotion ? { duration: 0 } : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-warning text-white"
            >
              <span className="h-2 w-2 rounded-full bg-white" />
            </motion.div>
            <div className="min-h-[26px] w-0.5 flex-1 bg-stroke" />
          </div>
          <div className="pb-5">
            <div className="text-sm font-bold text-brand-navy">{t("tl2")}</div>
            <div className="text-xs text-muted">
              {t("tl2sA")} {parentEmail || "—"}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full border-2 border-dashed border-stroke-strong text-xs text-muted">
            3
          </div>
          <div>
            <div className="text-sm font-bold text-muted">{t("tl3")}</div>
            <div className="text-xs text-muted/70">{t("tl3s")}</div>
          </div>
        </div>
      </div>

      <Button asChild variant="link" style="primary" size="sm" className="mt-8">
        <Link href="/">{t("backHome")}</Link>
      </Button>
    </motion.div>
    </Card>
  );
}
