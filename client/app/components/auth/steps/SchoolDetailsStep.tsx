"use client";

import { Input, Select } from "@aegov/design-system-react";
import { emirates } from "@shared/content/tracks";
import { fmtNum } from "../../../lib/utils";
import type { StepProps } from "./types";

const GRADE_NUMBERS = [7, 8, 9, 10, 11, 12];

export function SchoolDetailsStep({ values, errors, onChange, t, lang }: StepProps) {
  const emirateOptions = emirates.map((em) => ({ value: em[lang], label: em[lang] }));
  const gradeOptions = GRADE_NUMBERS.map((n) => ({
    value: String(n),
    label: `${t("gradeWord")}${fmtNum(n, lang)}`,
  }));

  return (
    <div>
      <h2 className="mb-6 text-lg font-bold text-brand-navy">{t("s2Title")}</h2>

      <Select
        label={t("emirate")}
        placeholder={t("emiratePick")}
        options={emirateOptions}
        value={values.emirate}
        onChange={(value: string) => onChange("emirate", value)}
        error={errors.emirate || undefined}
      />

      <div className="mt-4">
        <Input
          label={t("school")}
          placeholder={t("schoolPh")}
          value={values.school}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("school", e.target.value)}
          variant={errors.school ? "error" : "primary"}
        />
        {errors.school && <p className="mt-1 text-sm text-red-600">{errors.school}</p>}
      </div>

      <div className="mt-4">
        <Select
          label={t("grade")}
          placeholder={t("gradePick")}
          options={gradeOptions}
          value={values.grade}
          onChange={(value: string) => onChange("grade", value)}
          error={errors.grade || undefined}
        />
      </div>
    </div>
  );
}
