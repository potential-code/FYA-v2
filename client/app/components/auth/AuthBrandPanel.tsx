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
  // Curved corner (top-left in Arabic, top-right in English) is a desktop
  // split-layout detail — stacked mobile/tablet keeps square corners.
  const curveClass = lang === "ar" ? "lg:rounded-tl-[120px]" : "lg:rounded-tr-[120px]";

  return (
    <div className={`relative flex min-h-[240px] items-end overflow-hidden sm:min-h-[280px] lg:h-full lg:min-h-0 ${curveClass}`}>
      <Image src={image} alt={imageAlt} fill priority className="object-cover [object-position:center_25%]" />
      {/* Darker on the mobile/tablet stacked band (shorter, less room for the
          gradient to build contrast before hitting the tagline text) so the
          tagline stays legible; reverts to the original lighter gradient once
          the layout splits into columns at lg. */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/55 via-brand-navy/45 to-brand-navy/90 lg:from-brand-navy/35 lg:via-brand/25 lg:to-brand-navy/85" />

      <Image
        src="/images/branding-motifs/logo-motif-image.png"
        alt=""
        aria-hidden
        width={560}
        height={490}
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-auto w-64 select-none drop-shadow-md sm:w-80 lg:w-96"
      />

      <Link href="/" className="absolute start-6 top-5 z-10 sm:start-8 sm:top-7">
        <Image
          src="/images/logo-white.png"
          alt="Youth Leaders Path"
          width={140}
          height={78}
          className="h-12 w-auto object-contain drop-shadow-lg md:h-14 lg:h-[78px]"
        />
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative z-10 p-6 text-white sm:p-8 lg:p-13"
      >
        <div className="mb-3 max-w-[18ch] text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">{tagline}</div>
        <div className="max-w-[44ch] text-sm leading-relaxed text-white/80 lg:text-base">{subtext}</div>
        {children}
      </motion.div>
    </div>
  );
}
