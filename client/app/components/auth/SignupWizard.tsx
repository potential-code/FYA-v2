"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Steps, Button, Card } from "@aegov/design-system-react";
import { useLanguage } from "../../context/LanguageContext";
import { isValidEmail, isValidUaePhone, ageFromDob } from "../../lib/validators";
import { fmtNum } from "../../lib/utils";
import { PersonalDetailsStep } from "./steps/PersonalDetailsStep";
import { SchoolDetailsStep } from "./steps/SchoolDetailsStep";
import { GuardianDetailsStep } from "./steps/GuardianDetailsStep";
import { SignupSuccess } from "./steps/SignupSuccess";
import ar from "../../i18n/locales/signup.ar.json";
import en from "../../i18n/locales/signup.en.json";
import i18n from "../../i18n/i18n";

let bundlesAdded = false;
function ensureSignupBundles() {
  if (bundlesAdded) return;
  i18n.addResourceBundle("ar", "translation", { signup: ar }, true, true);
  i18n.addResourceBundle("en", "translation", { signup: en }, true, true);
  bundlesAdded = true;
}

export interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  emirate: string;
  school: string;
  grade: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
}

const EMPTY_VALUES: SignupFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  emirate: "",
  school: "",
  grade: "",
  parentName: "",
  parentEmail: "",
  parentPhone: "",
};

// Per-field validation: each entry holds the message to show under that field.
type FieldErrors = Partial<Record<keyof SignupFormValues, string>>;

export function SignupWizard() {
  ensureSignupBundles();
  const { t } = useTranslation("translation", { keyPrefix: "signup" });
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [values, setValues] = useState<SignupFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});

  const onChange = (field: keyof SignupFormValues, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  // Per-field validation — each field carries its own document-specified message.
  function validate(currentStep: number): FieldErrors {
    const errs: FieldErrors = {};

    if (currentStep === 1) {
      if (!values.firstName.trim()) errs.firstName = t("errFirstName");
      if (!values.lastName.trim()) errs.lastName = t("errLastName");
      if (!values.email.trim() || !isValidEmail(values.email)) errs.email = t("errEmail");
      if (!values.phone.trim() || !isValidUaePhone(values.phone)) errs.phone = t("errPhone");
      if (!values.dob) errs.dob = t("errDob");
      else {
        const age = ageFromDob(values.dob);
        if (age === null || age < 13 || age > 18) errs.dob = t("errAge");
      }
    }
    if (currentStep === 2) {
      if (!values.emirate) errs.emirate = t("errEmirate");
      if (!values.school.trim()) errs.school = t("errSchool");
      if (!values.grade) errs.grade = t("errRequired");
    }
    if (currentStep === 3) {
      // The document provides a single guardian-data message for all guardian fields.
      if (!values.parentName.trim()) errs.parentName = t("errGuardian");
      if (!values.parentEmail.trim() || !isValidEmail(values.parentEmail)) errs.parentEmail = t("errGuardian");
      if (!values.parentPhone.trim() || !isValidUaePhone(values.parentPhone)) errs.parentPhone = t("errGuardian");
    }
    return errs;
  }

  const handleNext = () => {
    const errs = validate(step);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    if (step < 3) {
      setStep(step + 1);
      setErrors({});
      return;
    }
    setDone(true);
  };

  const handleBack = () => {
    setStep((s) => Math.max(1, s - 1));
    setErrors({});
  };

  if (done) {
    return <SignupSuccess firstName={values.firstName} parentEmail={values.parentEmail} />;
  }

  const stepLabels = [t("st1"), t("st2"), t("st3")];

  return (
    <div className="w-full max-w-xl">
      <h1 className="text-center text-xl font-bold text-brand-navy sm:text-2xl lg:text-3xl">{t("pageTitle")}</h1>
      <p className="mx-auto mt-2 max-w-md text-center text-sm leading-relaxed text-ink-soft">{t("pageSub")}</p>

      <div className="mt-6 pb-0 sm:mt-8 sm:pb-6">
        {/* AEGov Steps has no compact mode: its <ol> uses a fixed gap-24 and puts
            each label in an absolutely-positioned span (sibling of the <a>), so
            below sm we shrink the gap, hide the labels, and show a "step x of y"
            line instead. Bare [&_span] would also hide the step numbers. */}
        <Steps
          steps={stepLabels.map((label) => ({ label }))}
          currentStep={step - 1}
          showLabels
          className="[&_ol]:gap-12 sm:[&_ol]:gap-20 md:[&_ol]:gap-24 [&_a+span]:hidden sm:[&_a+span]:block sm:[&_a+span]:whitespace-nowrap sm:[&_a+span]:text-xs md:[&_a+span]:text-sm"
        />
        <p className="mt-4 text-center text-sm font-medium text-brand-navy sm:hidden">
          {t("stepOf", { current: fmtNum(step, lang), total: fmtNum(3, lang) })} · {stepLabels[step - 1]}
        </p>
      </div>

      <Card
        variant="news"
        bordered
        className="mt-6 rounded-2xl border-stroke bg-white p-5 shadow-sm sm:mt-10 sm:p-8 lg:p-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: lang === "ar" ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: lang === "ar" ? 16 : -16 }}
            transition={{ duration: 0.25 }}
          >
            {step === 1 && <PersonalDetailsStep values={values} errors={errors} onChange={onChange} t={t} lang={lang} />}
            {step === 2 && <SchoolDetailsStep values={values} errors={errors} onChange={onChange} t={t} lang={lang} />}
            {step === 3 && <GuardianDetailsStep values={values} errors={errors} onChange={onChange} t={t} />}
          </motion.div>
        </AnimatePresence>

        {/* Stacked + full-width on mobile — the step-3 submit label is long
            enough in Arabic ("إرسال طلب المشاركة") that the previous
            side-by-side lg-sized row overflowed the panel on narrow screens.
            flex-col-reverse puts the primary action on top even though the
            back button is first in DOM order (needed for the sm+ row, where
            the empty placeholder span has to stay first for justify-between
            to anchor the submit button to the end). */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 ? (
            // AEGov Button validates props with a zod schema that strips unknown
            // props (incl. onClick), so the handler never reaches the DOM button.
            // Render a native button via asChild so onClick stays on the element.
            <Button
              asChild
              variant="outline"
              style="secondary"
              className="h-11 w-full px-5 text-sm sm:h-12 sm:w-auto sm:px-6 sm:text-base"
            >
              <button type="button" onClick={handleBack}>
                {t("back")}
              </button>
            </Button>
          ) : (
            <span className="hidden sm:block" />
          )}
          <Button
            asChild
            variant="solid"
            style="primary"
            size="lg"
            className="h-11 w-full px-5 text-sm sm:h-13 sm:w-auto sm:px-7 sm:text-lg"
          >
            <button type="button" onClick={handleNext}>
              {step === 3 ? t("submit") : t("next")}
            </button>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export type { FieldErrors };
