"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AppleCardsCarousel } from "./apple-cards-carousel";
import { GalleryGrid } from "./gallery-grid";
import { GalleryVideo } from "@/data/gallery-data";

interface GalleryShowcaseProps {
  videos: GalleryVideo[];
  className?: string;
}

export function GalleryShowcase({ videos, className }: GalleryShowcaseProps) {
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-center mb-8">
        <div className="bg-black/10 backdrop-blur-md dark:bg-black/20 rounded-full p-1">
          <button
            onClick={() => setViewMode("carousel")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              viewMode === "carousel"
                ? "bg-emerald-500 text-white shadow-lg"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            תצוגת קרוסלה
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              viewMode === "grid"
                ? "bg-emerald-500 text-white shadow-lg"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            תצוגת רשת
          </button>
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {viewMode === "carousel" ? (
          <div className="mb-8">
            <AppleCardsCarousel videos={videos} />
          </div>
        ) : (
          <GalleryGrid videos={videos} />
        )}
      </motion.div>
    </div>
  );
}
