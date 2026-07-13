import type { Metadata } from "next";
import { LenisProvider } from "../components/landing/v2/LenisProvider";
import { NavV2 } from "../components/landing/v2/NavV2";
import { HeroV2 } from "../components/landing/v2/HeroV2";
import { MissionV2 } from "../components/landing/v2/MissionV2";
import { JourneyV2 } from "../components/landing/v2/JourneyV2";
import { PillarsV2 } from "../components/landing/v2/PillarsV2";
import { ImpactV2 } from "../components/landing/v2/ImpactV2";
import { FinalCtaV2 } from "../components/landing/v2/FinalCtaV2";
import { FooterV2 } from "../components/landing/v2/FooterV2";

export const metadata: Metadata = {
  title: "Youth Leaders Path — Preview",
  description: "Cinematic immersive landing preview.",
};

/**
 * Phase-2 full page preview. Temporary route (`/landing-preview`) hosting the
 * complete cinematic landing for sign-off while the live `/` stays intact.
 * Swaps into `/` once approved.
 */
export default function LandingPreviewPage() {
  return (
    <LenisProvider>
      <NavV2 />
      <main className="bg-white">
        <HeroV2 />
        <MissionV2 />
        <JourneyV2 />
        <PillarsV2 />
        <ImpactV2 />
        <FinalCtaV2 />
        <FooterV2 />
      </main>
    </LenisProvider>
  );
}
