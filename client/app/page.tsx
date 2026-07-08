import { HeroSection } from "./components/landing/HeroSection";
import { AboutSection } from "./components/landing/AboutSection";
import { JourneySection } from "./components/landing/JourneySection";
import { PillarsSection } from "./components/landing/PillarsSection";
import { FinalCtaSection } from "./components/landing/FinalCtaSection";
import { LandingFooter } from "./components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <JourneySection />
      <PillarsSection />
      <FinalCtaSection />
      <LandingFooter />
    </main>
  );
}
