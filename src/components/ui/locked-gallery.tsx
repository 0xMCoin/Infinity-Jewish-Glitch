"use client";

import { useState, useMemo } from "react";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { Lock, Unlock, Eye, EyeOff } from "lucide-react";
import { useTokenData } from "@/hooks/useTokenData";

interface GalleryStage {
  id: number;
  image: string;
  title: string;
  description: string;
  unlockThreshold: number; // Market cap needed to unlock
  isSpecial?: boolean;
}

const galleryStages: GalleryStage[] = [
  {
    id: 1,
    image: "/images/stage_1.jpg",
    title: "Genesis Pack",
    description: "The first wolves emerge from the digital realm",
    unlockThreshold: 25000,
  },
  {
    id: 2,
    image: "/images/stage_2.jpg", 
    title: "Alpha Formation",
    description: "The pack begins to form under cyber leadership",
    unlockThreshold: 50000,
  },
  {
    id: 3,
    image: "/images/stage_3.jpg",
    title: "Digital Hunt",
    description: "Wolves master the art of cyber hunting",
    unlockThreshold: 75000,
  },
  {
    id: 4,
    image: "/images/stage_4.jpg",
    title: "Tech Evolution",
    description: "Advanced cybernetic enhancements activated",
    unlockThreshold: 100000,
    isSpecial: true,
  },
  {
    id: 5,
    image: "/images/stage_5.jpg",
    title: "Pack Dominance",
    description: "The cyber wolves rule the digital landscape",
    unlockThreshold: 125000,
  },
  {
    id: 6,
    image: "/images/stage_6.jpg",
    title: "Ultimate Form",
    description: "The ultimate infinite Jewish glitch form",
    unlockThreshold: 150000,
    isSpecial: true,
  },
];

export function LockedGallery() {
  const { data: tokenData, loading } = useTokenData();
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [showUnlocked, setShowUnlocked] = useState(false);

  const currentMarketCap = tokenData?.market_cap || 0;

  const stageStatus = useMemo(() => {
    return galleryStages.map(stage => ({
      ...stage,
      isUnlocked: currentMarketCap >= stage.unlockThreshold,
      progress: Math.min((currentMarketCap / stage.unlockThreshold) * 100, 100)
    }));
  }, [currentMarketCap]);

  const unlockedCount = stageStatus.filter(stage => stage.isUnlocked).length;
  const nextUnlock = stageStatus.find(stage => !stage.isUnlocked);

  const formatNumber = (num: number): string => {
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + "M";
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "K";
    }
    return num.toFixed(0);
  };

  const filteredStages = showUnlocked 
    ? stageStatus.filter(stage => stage.isUnlocked)
    : stageStatus;

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="w-full max-w-7xl mx-auto px-4">
      {/* Header Stats */}
      <div className="text-center mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <m.div 
          className="bg-gradient-to-br from-blue-500/10 to-green-500/10 border border-blue-500/30 rounded-xl p-4"
          whileHover={{ scale: 1.02 }}
        >
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {loading ? "..." : `$${formatNumber(currentMarketCap)}`}
            </div>
            <div className="text-sm text-gray-400">Current Market Cap</div>
          </m.div>

          <m.div 
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-2xl font-bold text-green-400 mb-1">
              {unlockedCount}/6
            </div>
            <div className="text-sm text-gray-400">Images Unlocked</div>
          </m.div>

          <m.div 
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {nextUnlock ? `$${formatNumber(nextUnlock.unlockThreshold)}` : "MAX"}
            </div>
            <div className="text-sm text-gray-400">Next Unlock</div>
          </m.div>
        </div>

        {/* Filter Toggle */}
        <m.button
          onClick={() => setShowUnlocked(!showUnlocked)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 rounded-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showUnlocked ? <Eye size={16} /> : <EyeOff size={16} />}
          {showUnlocked ? "Show All" : "Show Unlocked Only"}
        </m.button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredStages.map((stage, index) => (
            <m.div
              key={stage.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`relative group cursor-pointer ${
                stage.isUnlocked 
                  ? "hover:scale-105" 
                  : "cursor-not-allowed"
              } transition-all duration-300`}
              onClick={() => stage.isUnlocked && setSelectedStage(stage.id)}
            >
              <div className={`relative overflow-hidden rounded-xl border-2 ${
                stage.isUnlocked
                  ? stage.isSpecial
                    ? "border-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
                    : "border-green-500/50 shadow-lg shadow-green-500/25"
                  : "border-gray-600/50 shadow-lg shadow-gray-500/10"
              }`}>
                {/* Image */}
                <div className="aspect-square relative">
                  {stage.isUnlocked ? (
                    <img
                      src={stage.image}
                      alt={stage.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <Lock size={48} className="text-gray-500 mx-auto mb-4" />
                        <div className="text-gray-400 text-sm mb-2">Locked</div>
                        <div className="text-green-400 font-bold">
                          ${formatNumber(stage.unlockThreshold)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Unlock Status Badge */}
                  <div className={`absolute top-3 right-3 p-2 rounded-full ${
                    stage.isUnlocked
                      ? "bg-green-500/80 text-white"
                      : "bg-red-500/80 text-white"
                  }`}>
                    {stage.isUnlocked ? <Unlock size={16} /> : <Lock size={16} />}
                  </div>

                  {/* Special Badge */}
                  {stage.isSpecial && stage.isUnlocked && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                      RARE
                    </div>
                  )}

                  {/* Progress Bar for Locked Items */}
                  {!stage.isUnlocked && stage.progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-800">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-1000"
                        style={{ width: `${stage.progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white w-full">
                    <h3 className="font-bold text-lg mb-1">{stage.title}</h3>
                    <p className="text-sm text-gray-300">{stage.description}</p>
                    {!stage.isUnlocked && (
                      <div className="mt-2 text-xs text-green-400">
                        ${formatNumber(stage.unlockThreshold - currentMarketCap)} to unlock
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal for Full Image View */}
      <AnimatePresence>
        {selectedStage && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStage(null)}
          >
            <m.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-gray-900 rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const stage = stageStatus.find(s => s.id === selectedStage);
                return stage ? (
                  <>
                    <img
                      src={stage.image}
                      alt={stage.title}
                      className="w-full h-auto max-h-[70vh] object-contain"
                    />
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-white mb-2">{stage.title}</h2>
                      <p className="text-gray-300">{stage.description}</p>
                      <div className="mt-4 text-green-400">
                        Unlocked at ${formatNumber(stage.unlockThreshold)} market cap
                      </div>
                    </div>
                  </>
                ) : null;
              })()}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
    </LazyMotion>
  );
}
