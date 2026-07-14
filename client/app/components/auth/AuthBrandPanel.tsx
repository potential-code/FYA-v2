"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

interface AuthBrandPanelProps {
  image: string;
  imageAlt?: string;
  tagline: string;
  subtext: string;
  children?: ReactNode;
}

/** Reusable split-screen brand panel used by the Login and Sign Up pages. */
export function AuthBrandPanel({ image, imageAlt = "", tagline, subtext, children }: AuthBrandPanelProps) {
  const { lang } = useLanguage();
  // Curved corner is top-left in Arabic, mirrored to top-right in English.
  const curveClass = lang === "ar" ? "rounded-tl-[120px]" : "rounded-tr-[120px]";

  return (
    <div className={`relative flex min-h-[280px] items-end overflow-hidden md:h-full md:min-h-0 ${curveClass}`}>
      <Image src={image} alt={imageAlt} fill priority className="object-cover [object-position:center_25%]" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/35 via-brand/25 to-brand-navy/85" />

      <Image
        src="/images/branding-motifs/logo-motif-image.png"
        alt=""
        aria-hidden
        width={560}
        height={490}
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-auto w-80 select-none drop-shadow-md md:w-96"
      />

      <Link href="/" className="absolute start-8 top-7 z-10">
        <Image
          src="/images/logo-white.png"
          alt="Youth Leaders Path"
          width={140}
          height={78}
          className="h-14 w-auto object-contain drop-shadow-lg md:h-[78px]"
        />
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative z-10 p-8 text-white md:p-13"
      >
        <div className="mb-3 max-w-[18ch] text-2xl font-bold leading-tight md:text-4xl">{tagline}</div>
        <div className="max-w-[44ch] text-sm leading-relaxed text-white/80 md:text-base">{subtext}</div>
        {children}
      </motion.div>
    </div>
  );
}
