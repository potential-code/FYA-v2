import type { SignupFormValues, FieldErrors } from "../SignupWizard";
import type { Lang } from "../../../context/LanguageContext";

export interface StepProps {
  values: SignupFormValues;
  errors: FieldErrors;
  onChange: (field: keyof SignupFormValues, value: string) => void;
  t: (key: string) => string;
  lang: Lang;
}
