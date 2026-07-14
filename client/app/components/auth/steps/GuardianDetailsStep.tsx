"use client";

import { Input, Alert } from "@aegov/design-system-react";
import type { StepProps } from "./types";

export function GuardianDetailsStep({ values, errors, onChange, t }: Omit<StepProps, "lang">) {
  return (
    <div>
      <h2 className="mb-2 text-lg font-bold text-brand-navy">{t("s3Title")}</h2>
      <p className="mb-6 text-sm leading-relaxed text-ink-soft">{t("s3Sub")}</p>

      <Input
        label={t("parentName")}
        placeholder={t("parentNamePh")}
        value={values.parentName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("parentName", e.target.value)}
        variant={errors.parentName ? "error" : "primary"}
      />
      {errors.parentName && <p className="mt-1 text-sm text-red-600">{errors.parentName}</p>}

      <div className="mt-4">
        <Input
          type="email"
          label={t("parentEmail")}
          placeholder={t("parentEmailPh")}
          value={values.parentEmail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("parentEmail", e.target.value)}
          variant={errors.parentEmail ? "error" : "primary"}
        />
        {errors.parentEmail && <p className="mt-1 text-sm text-red-600">{errors.parentEmail}</p>}
      </div>

      <div className="mt-4">
        <Input
          type="tel"
          label={t("parentPhone")}
          placeholder={t("parentPhonePh")}
          value={values.parentPhone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("parentPhone", e.target.value)}
          variant={errors.parentPhone ? "error" : "primary"}
        />
        {errors.parentPhone && <p className="mt-1 text-sm text-red-600">{errors.parentPhone}</p>}
      </div>

      <div className="mt-5">
        <Alert variant="info" style="soft" size="sm">
          {t("consentInfo")}
        </Alert>
      </div>
    </div>
  );
}
