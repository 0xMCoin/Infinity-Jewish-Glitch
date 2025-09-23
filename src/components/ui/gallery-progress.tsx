"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";
import { useTokenData } from "@/hooks/useTokenData";
import { Lock, Unlock, Star } from "lucide-react";

const UNLOCK_THRESHOLDS = [25000, 50000, 75000, 100000, 125000, 150000];

export function GalleryProgress() {
  const { data: tokenData, loading } = useTokenData();
  const currentMarketCap = tokenData?.market_cap || 0;

  const unlockedCount = UNLOCK_THRESHOLDS.filter(
    (threshold) => currentMarketCap >= threshold
  ).length;
  const nextThreshold = UNLOCK_THRESHOLDS.find(
    (threshold) => currentMarketCap < threshold
  );
  const progressToNext = nextThreshold
    ? Math.min((currentMarketCap / nextThreshold) * 100, 100)
    : 100;

  const formatNumber = (num: number): string => {
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + "M";
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "K";
    }
    return num.toFixed(0);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className="bg-black/20 backdrop-blur-md border border-green-500/30 rounded-xl p-4 sm:p-6 mb-6 mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {/* Header */}
        <div className="text-center mb-4">
           <h3 className="text-lg sm:text-xl font-bold text-blue-400 mb-2 font-arcade">
            GALLERY EVOLUTION
          </h3>
          <p className="text-sm text-gray-300">
            Unlock exclusive artwork as market cap grows
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {unlockedCount}/6
            </div>
            <div className="text-xs text-gray-400">Unlocked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {nextThreshold ? `$${formatNumber(nextThreshold)}` : "MAX"}
            </div>
            <div className="text-xs text-gray-400">Next Unlock</div>
          </div>
        </div>

        {/* Progress Bar */}
        {nextThreshold && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>${formatNumber(currentMarketCap)}</span>
              <span>${formatNumber(nextThreshold)}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <m.div
                 className="h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressToNext}%` }}
                transition={{ duration: 1, delay: 1 }}
              />
            </div>
            <div className="text-center text-xs text-blue-400 mt-1">
              {progressToNext.toFixed(1)}% to next unlock
            </div>
          </div>
        )}

        {/* Mini Gallery Preview */}
        <div className="grid grid-cols-6 gap-1">
          {UNLOCK_THRESHOLDS.map((threshold, index) => {
            const isUnlocked = currentMarketCap >= threshold;
            const isSpecial = index === 3 || index === 5; // stages 4 and 6

            return (
              <m.div
                key={threshold}
                className={`aspect-square rounded-lg border-2 flex items-center justify-center ${
                  isUnlocked
                    ? isSpecial
                      ? "border-purple-500 bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                      : "border-blue-500 bg-gradient-to-br from-blue-500/20 to-green-500/20"
                    : "border-gray-600 bg-gray-800"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
              >
                {isUnlocked ? (
                  isSpecial ? (
                    <Star size={12} className="text-purple-400" />
                  ) : (
                     <Unlock size={12} className="text-blue-400" />
                  )
                ) : (
                  <Lock size={12} className="text-gray-500" />
                )}
              </m.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <m.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>View Gallery</span>
            <m.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </m.span>
          </a>
        </m.div>
      </m.div>
    </LazyMotion>
  );
}
