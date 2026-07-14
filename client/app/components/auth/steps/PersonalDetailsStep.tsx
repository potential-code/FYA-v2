"use client";

import { Input } from "@aegov/design-system-react";
import { PhoneInput, defaultCountries, parseCountry } from "react-international-phone";
import { ageFromDob, trackForAge } from "../../../lib/validators";
import type { StepProps } from "./types";

const UAE_ONLY = defaultCountries.filter((country) => parseCountry(country).iso2 === "ae");

const PHONE_INPUT_VARS = {
  "--react-international-phone-height": "3rem",
  "--react-international-phone-border-radius": "0.5rem",
  "--react-international-phone-font-size": "1rem",
  "--react-international-phone-background-color": "#FFFFFF",
} as React.CSSProperties;

function dobBounds() {
  const now = new Date();
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const max = fmt(new Date(now.getFullYear() - 13, now.getMonth(), now.getDate()));
  const min = fmt(new Date(now.getFullYear() - 19, now.getMonth(), now.getDate() + 1));
  return { min, max };
}

export function PersonalDetailsStep({ values, errors, onChange, t }: StepProps) {
  const { min, max } = dobBounds();
  const age = values.dob ? ageFromDob(values.dob) : null;
  const track = age !== null ? trackForAge(age) : null;

  return (
    <div>
      <h2 className="mb-6 text-lg font-bold text-brand-navy">{t("s1Title")}</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Input
            label={t("firstName")}
            placeholder={t("firstNamePh")}
            value={values.firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("firstName", e.target.value)}
            variant={errors.firstName ? "error" : "primary"}
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>
        <div>
          <Input
            label={t("lastName")}
            placeholder={t("lastNamePh")}
            value={values.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("lastName", e.target.value)}
            variant={errors.lastName ? "error" : "primary"}
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>
      </div>

      <div className="mt-4">
        <Input
          type="email"
          label={t("email")}
          placeholder={t("emailPh")}
          value={values.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("email", e.target.value)}
          variant={errors.email ? "error" : "primary"}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div className="mt-4">
        <label className={`mb-1 block text-sm font-medium text-gray-900 ${errors.phone ? "text-red-600" : ""}`}>
          {t("phone")}
        </label>
        {/* react-international-phone isn't RTL-aware — its flag button and
            border-radii assume LTR flex order, so under the page's Arabic
            dir="rtl" the flag detaches from the input. Phone numbers read
            LTR everywhere regardless of page language, so force this field
            to LTR to keep the flag flush against the input. */}
        <div dir="ltr">
          <PhoneInput
            defaultCountry="ae"
            countries={UAE_ONLY}
            hideDropdown
            forceDialCode
            value={values.phone}
            onChange={(phone) => onChange("phone", phone)}
            inputProps={{ name: "phone" }}
            className="w-full"
            style={{
              ...PHONE_INPUT_VARS,
              ["--react-international-phone-border-color" as string]: errors.phone ? "#F87171" : "#9AA8E2",
            }}
            inputClassName="w-full flex-1 !text-base text-gray-900 placeholder:text-gray-400"
          />
        </div>
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div className="mt-4">
        <Input
          type="date"
          label={t("dob")}
          placeholder={t("dobPh")}
          min={min}
          max={max}
          value={values.dob}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("dob", e.target.value)}
          variant={errors.dob ? "error" : "primary"}
          helperText={!errors.dob ? t("dobHint") : undefined}
        />
        {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
        {track && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-1.5 text-sm text-success-dark">
            {track === "A" ? t("trackA") : t("trackB")}
          </div>
        )}
      </div>
    </div>
  );
}
