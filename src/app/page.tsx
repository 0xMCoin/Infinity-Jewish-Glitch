"use client";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Header } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  GallerySection,
  TikTokSection,
} from "@/components/sections";
import { CallToAction } from "@/components/ui/call-to-action";
import { Footer } from "@/components/ui/floating-dock";
import { LazySection } from "@/components/ui/lazy-section";

export default function Home() {
  const totalRaised = 100000;
  const goal = 1000000;
  const currentPrice = 0.0003;
  const nextPrice = 0.0004;

  return (
    <BackgroundLines
      className="w-full text-gray-900 dark:text-gray-100 relative min-h-screen bg-gray-50"
      lineColor="rgb(34, 197, 94)"
      lineCount={15}
      animationDuration={15}
      interactive={false}
    >
      <div className="relative z-10">
        <Header />

        <HeroSection
          totalRaised={totalRaised}
          goal={goal}
          currentPrice={currentPrice}
          nextPrice={nextPrice}
        />

        <LazySection>
          <AboutSection />
        </LazySection>

        <LazySection>
          <GallerySection />
        </LazySection>

        <LazySection>
          <CallToAction />
        </LazySection>

        <LazySection>
          <TikTokSection />
        </LazySection>

        <Footer />
      </div>
    </BackgroundLines>
  );
}
