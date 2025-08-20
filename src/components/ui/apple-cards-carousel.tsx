"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

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
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
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

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection > 0) {
        return prevIndex === videos.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? videos.length - 1 : prevIndex - 1;
      }
    });
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        paginate(1);
      }, 8000); // Increased time for videos
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex, paginate]);

  // Set initial volume when video loads
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  // Sync playing state when video changes
  useEffect(() => {
    if (videoRef.current) {
      // Small delay to ensure video element is updated
      const timer = setTimeout(() => {
        if (videoRef.current) {
          // Reset playing state when video changes
          setIsPlaying(false);
          
          // Set volume for new video
          videoRef.current.volume = volume;
          
          // Ensure mute state is consistent
          videoRef.current.muted = isMuted;
          
          console.log("Video changed, state reset:", { 
            isPlaying: false, 
            isMuted, 
            volume 
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, volume, isMuted]);

  const togglePlay = async () => {
    if (!videoRef.current) return;
    
    try {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        console.log("Video paused");
      } else {
        // Ensure video is ready before playing
        if (videoRef.current.readyState >= 2) {
          await videoRef.current.play();
          setIsPlaying(true);
          console.log("Video playing successfully");
        } else {
          console.log("Video not ready, waiting...");
          // Wait for video to be ready
          const playWhenReady = () => {
            if (videoRef.current) {
              videoRef.current.play().then(() => {
                setIsPlaying(true);
                console.log("Video playing after ready");
              }).catch((error) => {
                console.log("Playback failed:", error);
                setIsPlaying(false);
              });
            }
          };
          
          videoRef.current.addEventListener('canplay', playWhenReady, { once: true });
        }
      }
    } catch (error) {
      console.log("Error in togglePlay:", error);
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      // If volume is set to 0, mute the video
      if (newVolume === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else {
        // If volume is increased from 0, unmute
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
      
      // If unmuting and volume was 0, set it to a reasonable level
      if (!newMutedState && volume === 0) {
        const newVolume = 0.5;
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
      }
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    // Auto advance to next video
    paginate(1);
  };

  return (
    <div className={`relative w-full max-w-6xl mx-auto ${className}`}>
      {/* Main Carousel */}
      <div className="relative h-[600px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
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
                onEnded={handleVideoEnd}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onLoadedData={() => {
                  console.log("Video loaded, current state:", { 
                    paused: videoRef.current?.paused, 
                    ended: videoRef.current?.ended,
                    readyState: videoRef.current?.readyState 
                  });
                  if (videoRef.current) {
                    videoRef.current.volume = volume;
                    // Ensure mute state is consistent
                    videoRef.current.muted = isMuted;
                    // Start paused
                    setIsPlaying(false);
                  }
                }}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    videoRef.current.volume = volume;
                  }
                }}
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

        {/* Navigation Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 z-10"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          title="Previous Video"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 z-10"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          title="Next Video"
        >
          <ChevronRight size={24} />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 z-20"
          title={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Volume Control */}
        <div className="absolute top-4 left-20 flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 z-20">
          <button
            onClick={handleMuteToggle}
            className="w-8 h-8 flex items-center justify-center text-white hover:text-yellow-400 transition-colors duration-200"
            title={isMuted ? "Unmute Video" : "Mute Video"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <div className="w-20 h-2 bg-white/30 rounded-full relative">
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
              className="h-full bg-yellow-400 rounded-full transition-all duration-200"
              style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="mt-6 flex justify-center space-x-3">
        {videos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => goToSlide(index)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ${
              index === currentIndex
                ? "ring-4 ring-yellow-400 scale-110"
                : "hover:scale-105"
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
                className="absolute inset-0 bg-yellow-400/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
        <motion.div
          className="bg-yellow-400 h-1 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / videos.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
