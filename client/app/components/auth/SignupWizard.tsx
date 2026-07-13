"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Steps, Alert, Button, Card } from "@aegov/design-system-react";
import { useLanguage } from "../../context/LanguageContext";
import { isValidEmail, isValidUaePhone, ageFromDob } from "../../lib/validators";
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
  parentEmail: "",
  parentPhone: "",
};

type FieldErrors = Partial<Record<keyof SignupFormValues, boolean>>;

export function SignupWizard() {
  ensureSignupBundles();
  const { t } = useTranslation("translation", { keyPrefix: "signup" });
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [values, setValues] = useState<SignupFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setFormError("");
  }, [step]);

  const onChange = (field: keyof SignupFormValues, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: false }));
    setFormError("");
  };

  function validate(currentStep: number): { errs: FieldErrors; msg: string } {
    const errs: FieldErrors = {};
    let msg = "";

    if (currentStep === 1) {
      if (!values.firstName.trim()) errs.firstName = true;
      if (!values.lastName.trim()) errs.lastName = true;
      if (!values.email.trim()) errs.email = true;
      else if (!isValidEmail(values.email)) {
        errs.email = true;
        msg = t("errEmail");
      }
      if (!values.phone.trim()) errs.phone = true;
      else if (!isValidUaePhone(values.phone)) {
        errs.phone = true;
        msg = msg || t("errPhone");
      }
      if (!values.dob) errs.dob = true;
      else {
        const age = ageFromDob(values.dob);
        if (age === null || age < 13 || age > 18) {
          errs.dob = true;
          msg = msg || t("errAge");
        }
      }
    }
    if (currentStep === 2) {
      if (!values.emirate) errs.emirate = true;
      if (!values.school.trim()) errs.school = true;
      if (!values.grade) errs.grade = true;
    }
    if (currentStep === 3) {
      if (!values.parentEmail.trim()) errs.parentEmail = true;
      else if (!isValidEmail(values.parentEmail)) {
        errs.parentEmail = true;
        msg = t("errEmail");
      }
      if (!values.parentPhone.trim()) errs.parentPhone = true;
      else if (!isValidUaePhone(values.parentPhone)) {
        errs.parentPhone = true;
        msg = msg || t("errPhone");
      }
    }
    if (Object.keys(errs).length && !msg) msg = t("errRequired");
    return { errs, msg };
  }

  const handleNext = () => {
    const { errs, msg } = validate(step);
    if (msg) {
      setErrors(errs);
      setFormError(msg);
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
    setFormError("");
  };

  if (done) {
    return <SignupSuccess firstName={values.firstName} parentEmail={values.parentEmail} />;
  }

  const stepLabels = [t("st1"), t("st2"), t("st3")];

  return (
    <div className="w-full max-w-xl">
      <h1 className="text-center text-2xl font-bold text-brand-navy md:text-3xl">{t("pageTitle")}</h1>
      <p className="mx-auto mt-2 max-w-md text-center text-sm leading-relaxed text-ink-soft">{t("pageSub")}</p>

      <div className="mt-8 pb-6">
        <Steps
          steps={stepLabels.map((label) => ({ label }))}
          currentStep={step - 1}
          showLabels
        />
      </div>

      <Card
        variant="news"
        bordered
        className="mt-10 rounded-2xl border-stroke bg-white p-8 shadow-sm md:p-10"
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

        {formError && (
          <div className="mt-5">
            <Alert variant="error" style="soft" size="sm">
              {formError}
            </Alert>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <Button variant="outline" style="secondary" onClick={handleBack}>
              {t("back")}
            </Button>
          ) : (
            <span />
          )}
          <Button variant="solid" style="primary" size="lg" onClick={handleNext}>
            {step === 3 ? t("submit") : t("next")}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export type { FieldErrors };
