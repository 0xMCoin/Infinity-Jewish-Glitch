"use client";

import { useState } from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Header } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  GallerySection,
} from "@/components/sections";
import { CallToAction } from "@/components/ui/call-to-action";
import { Footer } from "@/components/ui/floating-dock";

export default function Home() {
  const totalRaised = 100000;
  const goal = 1000000;
  const currentPrice = 0.0003;
  const nextPrice = 0.0004;

  return (
    <BackgroundLines
      className="w-full text-gray-900 dark:text-gray-100 relative min-h-screen bg-gray-50"
      lineColor="rgb(34, 197, 94)"
      lineWidth={1}
      lineCount={30}
      animationDuration={12}
      interactive={true}
    >
      {/* Content Overlay */}
      <div className="relative z-10">
        <Header />

        <HeroSection
          totalRaised={totalRaised}
          goal={goal}
          currentPrice={currentPrice}
          nextPrice={nextPrice}
        />

        <AboutSection />
        <GallerySection />
        <CallToAction />
        <Footer />
      </div>
    </BackgroundLines>
  );
}
