"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { Input, Button, Alert, Toggle } from "@aegov/design-system-react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useLanguage } from "../../context/LanguageContext";
import { isValidEmail } from "../../lib/validators";

export function LoginForm() {
  const { t } = useTranslation("translation", { keyPrefix: "login" });
  const { t: tc } = useTranslation("translation", { keyPrefix: "common" });
  const { lang, toggleLang } = useLanguage();
  const isArabic = lang === "ar";
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shakeKey, setShakeKey] = useState(0);

  const fail = (message: string) => {
    setError(message);
    setShakeKey((k) => k + 1);
  };

  const submit = () => {
    if (!isValidEmail(email)) return fail(t("errEmail"));
    if (!password) return fail(t("errPass"));
    setError("");
    // No backend in this phase — just return to the landing page.
    router.push("/");
  };

  return (
    <div className="relative overflow-hidden flex flex-1 flex-col px-6 py-7 md:h-full md:overflow-y-auto md:px-14">
      {/* Big, faint brand wave bleeding off the top edge, clipped by the
          container so it reads as a peeking span rather than a full graphic. */}
      <Image
        src="/images/branding-motifs/wave-blue.png"
        alt=""
        aria-hidden
        width={1600}
        height={790}
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-auto w-[48rem] max-w-none -translate-x-1/2 select-none opacity-10 md:w-[64rem]"
      />

      <div className="flex items-center justify-between gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition hover:text-brand"
        >
          <ArrowLeft size={16} weight="bold" className="rtl:-scale-x-100" />
          {tc("backToHome")}
        </Link>
        <Toggle
          checked={isArabic}
          onCheckedChange={toggleLang}
          variant="secondary"
          label={tc("langBtn")}
          aria-label="Toggle language"
        />
      </div>

      <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-10">
        <h1 className="mb-2.5 text-3xl font-bold text-brand-navy md:text-[34px]">{t("title")}</h1>
        <p className="mb-8 text-[15.5px] leading-relaxed text-ink-soft">{t("sub")}</p>

        <div className="flex flex-col gap-4">
          <Input
            type="email"
            label={t("emailLabel")}
            placeholder={t("emailPh")}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              setError("");
            }}
            dir="auto"
          />

          <div>
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-sm font-medium text-ink">{t("passLabel")}</span>
              <Button variant="link" style="primary" size="xs">
                {t("forgot")}
              </Button>
            </div>
            <Input
              type="password"
              placeholder={t("passPh")}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setError("");
              }}
              dir="auto"
            />
          </div>
        </div>

        {error && (
          <motion.div
            key={shakeKey}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: [0, -8, 8, -6, 6, 0] }}
            transition={{ duration: 0.4 }}
            className="mt-4"
          >
            <Alert variant="error" style="soft" size="sm">
              {error}
            </Alert>
          </motion.div>
        )}

        <Button variant="solid" style="primary" size="lg" block className="mt-6" onClick={submit}>
          {t("loginBtn")}
        </Button>

        <div className="mt-6 text-center text-sm text-ink-soft">
          {t("noAccount")}{" "}
          <Link href="/sign-up" className="font-bold text-brand-dark hover:underline">
            {t("registerLink")}
          </Link>
        </div>
      </div>

      <div className="text-center text-xs text-muted">{t("footer")}</div>
    </div>
  );
}
