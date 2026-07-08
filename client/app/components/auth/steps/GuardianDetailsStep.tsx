"use client";

import { CheckCircle } from "@phosphor-icons/react";
import { Input } from "@aegov/design-system-react";
import type { StepProps } from "./types";

export function GuardianDetailsStep({ values, errors, onChange, t }: Omit<StepProps, "lang">) {
  return (
    <div>
      <h2 className="mb-2 text-lg font-bold text-brand-navy">{t("s3Title")}</h2>
      <p className="mb-6 text-sm leading-relaxed text-ink-soft">{t("s3Sub")}</p>

      <Input
        type="email"
        label={t("parentEmail")}
        placeholder={t("parentEmailPh")}
        value={values.parentEmail}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("parentEmail", e.target.value)}
        variant={errors.parentEmail ? "error" : "primary"}
      />

      <div className="mt-4">
        <Input
          type="tel"
          label={t("parentPhone")}
          placeholder={t("phonePh")}
          value={values.parentPhone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("parentPhone", e.target.value)}
          variant={errors.parentPhone ? "error" : "primary"}
        />
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-stroke bg-surface-softer p-4">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-surface-accent text-brand">
          <CheckCircle size={20} weight="bold" />
        </div>
        <p className="text-sm leading-relaxed text-ink-soft">{t("consentInfo")}</p>
      </div>
    </div>
  );
}
