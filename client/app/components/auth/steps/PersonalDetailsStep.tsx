"use client";

import { Input } from "@aegov/design-system-react";
import { ageFromDob, trackForAge } from "../../../lib/validators";
import type { StepProps } from "./types";

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
        <Input
          label={t("firstName")}
          value={values.firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("firstName", e.target.value)}
          variant={errors.firstName ? "error" : "primary"}
        />
        <Input
          label={t("lastName")}
          value={values.lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("lastName", e.target.value)}
          variant={errors.lastName ? "error" : "primary"}
        />
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
      </div>

      <div className="mt-4">
        <Input
          type="tel"
          label={t("phone")}
          placeholder={t("phonePh")}
          value={values.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("phone", e.target.value)}
          variant={errors.phone ? "error" : "primary"}
        />
      </div>

      <div className="mt-4">
        <Input
          type="date"
          label={t("dob")}
          min={min}
          max={max}
          value={values.dob}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("dob", e.target.value)}
          variant={errors.dob ? "error" : "primary"}
          helperText={!errors.dob ? t("dobHint") : undefined}
        />
        {track && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-1.5 text-sm text-success-dark">
            {track === "A" ? t("trackA") : t("trackB")}
          </div>
        )}
      </div>
    </div>
  );
}
