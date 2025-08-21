"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface Video {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface AppleCardsCarouselProps {
  videos: Video[];
  className?: string;
}

export function AppleCardsCarousel({
  videos,
  className,
}: AppleCardsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);

  const videoRef = useRef<HTMLVideoElement>(null);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Sync video element with state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);

    // Try to update the current video element
    if (videoRef.current) {
      videoRef.current.volume = newVolume;

      // Auto-mute when volume is 0
      if (newVolume === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        // Auto-unmute when volume increases from 0
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }

    // Also try to find the video element by selector as fallback
    const currentVideo = document.querySelector(
      `video[src="${videos[currentIndex].src}"]`
    ) as HTMLVideoElement;
    if (currentVideo) {
      currentVideo.volume = newVolume;
      if (newVolume === 0) {
        currentVideo.muted = true;
      } else if (isMuted) {
        currentVideo.muted = false;
      }
    }
  };

  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    // Try to update the current video element
    if (videoRef.current) {
      videoRef.current.muted = newMutedState;

      // If unmuting and volume was 0, set reasonable volume
      if (!newMutedState && volume === 0) {
        const newVolume = 0.5;
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
      }
    }

    const currentVideo = document.querySelector(
      `video[src="${videos[currentIndex].src}"]`
    ) as HTMLVideoElement;
    if (currentVideo) {
      currentVideo.muted = newMutedState;
      if (!newMutedState && volume === 0) {
        const newVolume = 0.5;
        setVolume(newVolume);
        currentVideo.volume = newVolume;
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [currentIndex, volume, isMuted]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.volume = volume;
        videoRef.current.muted = isMuted;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentIndex, volume, isMuted]);

  return (
    <div className={`relative w-full max-w-6xl mx-auto ${className}`}>
      {/* Main Carousel */}
      <div className="relative h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                src={videos[currentIndex].src}
                className="w-full h-full object-cover"
                muted={isMuted}
                autoPlay
                loop
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <motion.h3
                  className="text-3xl font-bold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {videos[currentIndex].title}
                </motion.h3>
                <motion.p
                  className="text-lg opacity-90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {videos[currentIndex].description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Volume Control */}
        <div className="absolute top-6 left-6 flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 z-20">
          <button
            onClick={handleMuteToggle}
            className="w-8 h-8 flex items-center justify-center text-white hover:text-emerald-400 transition-colors duration-200"
            title={isMuted ? "Unmute Video" : "Mute Video"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <div className="w-24 h-2 bg-white/30 rounded-full relative">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="h-full bg-emerald-400 rounded-full transition-all duration-200"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="mt-8 flex justify-center space-x-4">
        {videos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => goToSlide(index)}
            className={`relative w-24 h-24 rounded-2xl overflow-hidden transition-all duration-300 ${
              index === currentIndex
                ? "ring-4 ring-emerald-400 scale-110 shadow-lg"
                : "hover:scale-105 hover:shadow-md"
            }`}
          >
            <video
              src={video.src}
              className="w-full h-full object-cover"
              muted
              preload="metadata"
            />
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 bg-emerald-400/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-6 w-full bg-black/10 backdrop-blur-md dark:bg-black/20 rounded-full h-1.5">
        <motion.div
          className="bg-emerald-400 h-1.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / videos.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
