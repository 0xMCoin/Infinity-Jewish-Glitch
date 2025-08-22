"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { m } from "framer-motion";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = useCallback(() => {
    console.log("Video loaded successfully:", videoSrc);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      setIsLoading(false);
      videoRef.current
        .play()
        .then(() => {
          console.log("Video started playing successfully");
          setIsPlaying(true);
        })
        .catch((error) => {
          console.warn("Auto-play failed:", error);
          console.warn("Video element state:", {
            readyState: videoRef.current?.readyState,
            networkState: videoRef.current?.networkState,
            error: videoRef.current?.error,
          });
          setIsPlaying(false);
        });
    }
  }, [videoSrc]);

  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current
          .play()
          .then(() => {
            console.log("Manual play successful");
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Failed to play video:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    console.log("VideoPlayer useEffect triggered with videoSrc:", videoSrc);
    if (videoRef.current) {
      setIsLoading(true);
      setHasError(false);
      setIsPlaying(false);

      // Configurar vídeo
      videoRef.current.muted = true;
      videoRef.current.volume = 0;

      // Tentar reproduzir automaticamente
      videoRef.current
        .play()
        .then(() => {
          console.log("Initial auto-play successful");
          setIsPlaying(true);
        })
        .catch((error) => {
          console.warn("Initial auto-play failed:", error);
          console.warn(
            "This is normal in some browsers due to autoplay policies"
          );
          setIsPlaying(false);
        });
    }
  }, [videoSrc]);

  const handleVolumeChange = useCallback(
    (newVolume: number) => {
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
    },
    [isMuted]
  );

  const handleMuteToggle = useCallback(() => {
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
  }, [isMuted, volume]);

  const handleVideoError = useCallback(
    (error: any) => {
      console.error("Video error:", error);
      console.error("Failed to load video:", videoSrc);
      console.error("Video element error details:", {
        error: videoRef.current?.error,
        readyState: videoRef.current?.readyState,
        networkState: videoRef.current?.networkState,
        src: videoRef.current?.src,
        currentSrc: videoRef.current?.currentSrc,
      });
      setHasError(true);
      setIsLoading(false);
      setIsPlaying(false);
    },
    [videoSrc]
  );

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] group">
      <m.video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
        className="w-full h-full object-cover rounded-lg shadow-2xl border-2 sm:border-4 border-emerald-500 dark:border-emerald-400 group-hover:scale-105 transition-transform duration-300"
        whileHover={{
          scale: 1.02,
          rotateY: 5,
          transition: { duration: 0.2 },
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedData={handleVideoLoad}
        onLoadStart={() => {
          console.log("Video load started for:", videoSrc);
          setIsLoading(true);
        }}
        onCanPlay={() => {
          console.log("Video can play for:", videoSrc);
          setIsLoading(false);
        }}
        onError={handleVideoError}
        onAbort={() => console.warn("Video loading aborted")}
        onSuspend={() => console.log("Video loading suspended")}
        onProgress={() => console.log("Video loading progress for:", videoSrc)}
      />

      {/* Label */}
      <m.div
        className={`absolute ${
          labelPosition === "bottom-left"
            ? "bottom-2 left-2"
            : "bottom-2 right-2"
        } bg-black/80 text-white px-2 py-1 rounded text-xs font-bold backdrop-blur-sm`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        {label}
      </m.div>

      {/* Loading indicator */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      )}

      {/* Error indicator */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-lg text-white">
          <div className="text-red-400 mb-2">⚠️</div>
          <div className="text-sm text-center px-4">Error to load video</div>
          <button
            onClick={() => {
              setHasError(false);
              setIsLoading(true);
              if (videoRef.current) {
                videoRef.current.load();
              }
            }}
            className="mt-2 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 rounded text-xs transition-colors"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !hasError && (
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <div className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
            {isPlaying ? (
              <Pause size={24} className="text-white" />
            ) : (
              <Play size={24} className="text-white ml-1" />
            )}
          </div>
        </button>
      )}

      {/* Controls overlay */}
      <div className="absolute top-2 left-2 flex items-center bg-black/50 backdrop-blur-sm rounded-full px-2 pr-4 z-20">
        <button
          onClick={handleMuteToggle}
          className="w-8 h-8 flex items-center justify-center text-white hover:text-emerald-400 transition-colors duration-200"
          title={isMuted ? "Unmute Video" : "Mute Video"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <div className="w-24 h-1 bg-black/50 rounded-full relative">
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
  );
}
