"use client";

import { Input, Alert } from "@aegov/design-system-react";
import { PhoneInput, defaultCountries, parseCountry } from "react-international-phone";
import type { StepProps } from "./types";

const UAE_ONLY = defaultCountries.filter((country) => parseCountry(country).iso2 === "ae");

const PHONE_INPUT_VARS = {
  "--react-international-phone-height": "3rem",
  "--react-international-phone-border-radius": "0.5rem",
  "--react-international-phone-font-size": "1rem",
  "--react-international-phone-background-color": "#FFFFFF",
} as React.CSSProperties;

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
        <label className={`mb-1 block text-sm font-medium text-gray-900 ${errors.parentPhone ? "text-red-600" : ""}`}>
          {t("parentPhone")}
        </label>
        {/* react-international-phone isn't RTL-aware — force LTR so the flag
            stays flush against the input under the page's Arabic dir="rtl". */}
        <div dir="ltr">
          <PhoneInput
            defaultCountry="ae"
            countries={UAE_ONLY}
            hideDropdown
            forceDialCode
            value={values.parentPhone}
            onChange={(phone) => onChange("parentPhone", phone)}
            inputProps={{ name: "parentPhone" }}
            className="w-full"
            style={{
              ...PHONE_INPUT_VARS,
              ["--react-international-phone-border-color" as string]: errors.parentPhone ? "#F87171" : "#9AA8E2",
            }}
            inputClassName="w-full flex-1 !text-base text-gray-900 placeholder:text-gray-400"
          />
        </div>
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
