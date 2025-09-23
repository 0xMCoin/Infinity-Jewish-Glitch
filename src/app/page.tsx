"use client";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Header } from "@/components/layout";
import { HeroSection, InfoSection, GallerySection } from "@/components/sections";
import { CallToAction } from "@/components/ui/call-to-action";
import { Footer } from "@/components/ui/floating-dock";
import { LazySection } from "@/components/ui/lazy-section";

export default function Home() {
  return (
    <BackgroundLines
      className="w-full text-gray-900 dark:text-gray-100 relative min-h-screen bg-gray-50"
      lineColor="rgb(0, 102, 204)"
      lineCount={15}
      animationDuration={15}
      interactive={false}
    >
      <div className="relative z-10 pt-10">
        <Header />

        <HeroSection />

        <LazySection>
          <InfoSection />
        </LazySection>

        <LazySection>
          <GallerySection />
        </LazySection>

        <LazySection>
          <CallToAction />
        </LazySection>
        <Footer />
      </div>
    </BackgroundLines>
  );
}
