"use client";

import { useState, useMemo, useCallback } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { SiSolana } from "react-icons/si";
import { toast } from "react-hot-toast";
import React from "react";
import { useTokenData } from "@/hooks/useTokenData";
import { CopyIcon } from "lucide-react";
import { GalleryProgress } from "../ui/gallery-progress";

export function HeroSection() {
  const [usdAmount, setUsdAmount] = useState("100");
  const { data: tokenData, loading: tokenLoading } = useTokenData();

  const goal = 10000000;

  const progress = useMemo(
    () => (tokenData?.market_cap ? (tokenData.market_cap / goal) * 100 : 0),
    [tokenData?.market_cap, goal]
  );

  const tokenAmount = useMemo(() => {
    if (!tokenData?.price || !usdAmount || isNaN(Number(usdAmount))) {
      return "0.00";
    }

    const usdValue = Number(usdAmount);
    const tokensReceived = usdValue / tokenData.price;

    return tokensReceived.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [tokenData?.price, usdAmount]);

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        id="home"
        className="relative py-4 sm:py-6 lg:py-8 min-h-[70vh] sm:min-h-[75vh] lg:min-h-screen flex flex-col items-center justify-center mt-20"
      >
        {/* Desktop Layout */}
        <div className="hidden md:block items-center justify-center gap-4 sm:gap-6 max-w-screen-sm mx-auto px-4 sm:px-0 w-full">
          <m.div
            className="relative z-20 w-full"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BuyCard
              totalRaised={tokenData?.market_cap || 0}
              progress={progress}
              currentPrice={tokenData?.price || 0}
              marketCap={tokenData?.market_cap || 0}
              usdAmount={usdAmount}
              setUsdAmount={setUsdAmount}
              tokenAmount={tokenAmount}
              tokenLoading={tokenLoading}
              tokenData={tokenData}
            />

            <GalleryProgress />
          </m.div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden w-full max-w-7xl mx-auto mt-20 px-4 sm:px-6 flex flex-col items-center space-y-6">
          <m.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BuyCard
              totalRaised={tokenData?.market_cap || 0}
              progress={progress}
              currentPrice={tokenData?.price || 0}
              marketCap={tokenData?.market_cap || 0}
              usdAmount={usdAmount}
              setUsdAmount={setUsdAmount}
              tokenAmount={tokenAmount}
              tokenLoading={tokenLoading}
              tokenData={tokenData}
            />

            {/* Gallery Progress */}
            <GalleryProgress />
          </m.div>
        </div>

        {/* Bottom Large Text - Desktop Only */}
        <div className="absolute bottom-[40%] left-1/2 transform -translate-x-1/2 hidden lg:flex w-full justify-center items-center">
          <h1 className="text-6xl lg:text-8xl text-center font-black tracking-wider text-gray-900 dark:text-white opacity-90 select-none transition-colors duration-300 font-arcade text-arcade-shadow">
            תקלה בכסף יהודי אינסופי
          </h1>
        </div>

        {/* Mobile Bottom Text */}
        <div className="lg:hidden text-center mt-6 sm:mt-8">
          <h1 className="text-6xl sm:text-4xl font-black tracking-wider text-gray-900 dark:text-white opacity-90 transition-colors duration-300 font-arcade text-arcade-shadow">
            תקלה בכסף יהודי אינסופי
          </h1>
        </div>
      </section>
    </LazyMotion>
  );
}

interface BuyCardProps {
  totalRaised: number;
  progress: number;
  currentPrice: number;
  marketCap: number;
  usdAmount: string;
  setUsdAmount: (value: string) => void;
  tokenAmount: string;
  tokenLoading: boolean;
  tokenData: any;
}

const BuyCard = React.memo(function BuyCard({
  totalRaised,
  progress,
  currentPrice,
  marketCap,
  usdAmount,
  setUsdAmount,
  tokenAmount,
  tokenLoading,
  tokenData,
}: BuyCardProps) {
  const handleUsdAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsdAmount(e.target.value);
    },
    [setUsdAmount]
  );

  const formatNumber = (num: number): string => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + "B";
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + "M";
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + "K";
    }
    return num.toFixed(2);
  };

  const formatPrice = (price: number): string => {
    if (price < 0.0001) {
      return price.toFixed(8);
    } else if (price < 0.01) {
      return price.toFixed(6);
    } else if (price < 1) {
      return price.toFixed(4);
    } else {
      return price.toFixed(2);
    }
  };

  return (
    <div className="relative group w-full">
      <div className="relative bg-black/10 backdrop-blur-md dark:bg-black/20 dark:text-white p-4 sm:p-6 rounded-xl shadow-2xl border border-blue-500/30">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 mb-2 font-arcade text-arcade-shadow">
            קנה $ יְהוּדִי עכשיו!
          </h2>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="text-center mb-3">
            <p className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-arcade text-arcade-shadow">
              ${formatNumber(totalRaised)}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-2">
              יעד שווי שוק: 10 מיליון
            </p>
          </div>

          <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2 mb-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-600 transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm">
            {progress.toFixed(4)}%
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="text-center p-2 sm:p-3 bg-gray-100 dark:bg-gray-800/70 rounded-lg border border-gray-300 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 text-xs mb-1">
              מחיר נוכחי
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-sm sm:text-base">
              $
              {tokenLoading
                ? "..."
                : currentPrice > 0
                ? formatPrice(currentPrice)
                : "0"}
            </p>
          </div>
          <div className="text-center p-2 sm:p-3 bg-gray-100 dark:bg-gray-800/70 rounded-lg border border-gray-300 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 text-xs mb-1">
              שווי שוק
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-sm sm:text-base">
              $
              {tokenLoading
                ? "..."
                : marketCap > 0
                ? formatNumber(marketCap)
                : "0"}
            </p>
          </div>
        </div>

        {/* Network Selection */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button className="flex-1 p-2 sm:p-3 bg-blue-100 dark:bg-blue-600/20 border border-blue-300 dark:border-blue-500/50 rounded-lg text-blue-700 dark:text-blue-400 text-xs sm:text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-600/30 transition-colors">
              <SiSolana className="inline mr-2" />
              סולנה
            </button>
          </div>
        </div>

        {/* Transaction Inputs */}
        <div className="space-y-3 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-gray-100 dark:bg-gray-800/70 rounded-lg border border-gray-300 dark:border-gray-700">
            <label className="text-gray-700 dark:text-gray-300 text-xs block mb-1">
              אתה משלם
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="100"
                value={usdAmount}
                onChange={handleUsdAmount}
                className="flex-1 bg-transparent text-gray-900 dark:text-white text-base sm:text-lg font-bold outline-none"
              />
              <span className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm">
                דולר
              </span>
            </div>
          </div>

          <div className="p-2 sm:p-3 bg-gray-100 dark:bg-gray-800/70 rounded-lg border border-gray-300 dark:border-gray-700">
            <label className="text-gray-700 dark:text-gray-300 text-xs block mb-1">
              אתה מקבל
            </label>
            <div className="flex items-center space-x-2">
              <span className="flex-1 text-gray-900 dark:text-white text-base sm:text-lg font-bold">
                {tokenAmount}
              </span>
              <span className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm">
                $יְהוּדִי
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              ≈ $
              {(
                Number(tokenAmount.replace(/,/g, "")) * (tokenData?.price || 0)
              ).toFixed(2)}{" "}
              דולר
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          <a
            href="https://pump.fun/coin/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex justify-center items-center p-2 sm:p-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-lg shadow-lg text-xs sm:text-base hover:from-green-600 hover:to-blue-700 transition-all duration-300"
          >
            CA: ""
          </a>

          <CopyIcon
            onClick={() => {
              navigator.clipboard.writeText("https://pump.fun/coin/");
              toast.success("Copied to clipboard");
            }}
            className="w-6 h-6 cursor-pointer"
          />
        </div>

        <div className="absolute top-3 right-3 w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-green-600 dark:bg-green-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
});

