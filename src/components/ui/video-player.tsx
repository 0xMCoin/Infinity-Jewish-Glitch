"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface VideoPlayerProps {
  videoSrc: string;
  label: string;
  labelPosition: "bottom-left" | "bottom-right";
}

export function VideoPlayer({
  videoSrc,
  label,
  labelPosition,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else {
        if (isMuted) {
          setIsMuted(false);
          videoRef.current.muted = false;
        }
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      videoRef.current.muted = newMutedState;

      if (!newMutedState && volume === 0) {
        const newVolume = 0.5;
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
      }
    }
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] group">
      <motion.video
        ref={videoRef}
        muted
        loop
        autoPlay
        playsInline
        className="w-full h-full object-cover rounded-lg shadow-2xl border-2 sm:border-4 border-emerald-500 dark:border-emerald-400 group-hover:scale-105 transition-transform duration-300"
        whileHover={{
          scale: 1.05,
          rotateY: 10,
          transition: { duration: 0.3 },
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedData={() => {
          if (videoRef.current) {
            // Ensure video is muted and playing when data is loaded
            videoRef.current.muted = true;
            videoRef.current.volume = 0;
            if (!isPlaying) {
              videoRef.current.play().catch(() => {
                setIsPlaying(false);
              });
            }
          }
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </motion.video>

      {/* Video Controls */}
      <div className="absolute top-2 left-2 flex items-center space-x-2">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-8 h-8 sm:w-10 sm:h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition-all duration-200 hover:scale-110 active:scale-95"
        >
          {isPlaying ? (
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
          ) : (
            <div className="w-0 h-0 border-l-[4px] sm:border-l-[6px] border-l-white border-t-[3px] sm:border-t-[4px] border-t-transparent border-b-[3px] sm:border-b-[4px] border-b-transparent ml-0.5"></div>
          )}
        </button>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1">
          <button
            onClick={handleMuteToggle}
            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-white hover:text-emerald-400 transition-colors duration-200"
          >
            {isMuted ? (
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
            ) : (
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
            )}
          </button>
          <div className="w-12 sm:w-16 h-1 sm:h-1.5 bg-white/30 rounded-full relative">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="h-full bg-emerald-400 rounded-full transition-all duration-200"
              style={{
                width: `${(isMuted ? 0 : volume) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Video Label */}
      <div
        className={`absolute -bottom-2 ${
          labelPosition === "bottom-right" ? "-right-2" : "-left-2"
        } bg-emerald-600 dark:bg-emerald-700 text-white px-2 py-1 rounded text-xs font-bold shadow-lg`}
      >
        {label}
      </div>
    </div>
  );
}
