"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardSpotlight } from "./card-spotlight";
import { Card3DEffect } from "./3d-card-effect";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

interface GalleryVideo {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
}

interface GalleryGridProps {
  videos: GalleryVideo[];
  className?: string;
}

export function GalleryGrid({ videos, className }: GalleryGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openModal = (video: GalleryVideo, index: number) => {
    setSelectedVideo(video);
    setSelectedIndex(index);
    setIsModalOpen(true);
    setIsPlaying(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const nextVideo = () => {
    const nextIndex = (selectedIndex + 1) % videos.length;
    setSelectedIndex(nextIndex);
    setSelectedVideo(videos[nextIndex]);
    setIsPlaying(false);
  };

  const prevVideo = () => {
    const prevIndex =
      selectedIndex === 0 ? videos.length - 1 : selectedIndex - 1;
    setSelectedIndex(prevIndex);
    setSelectedVideo(videos[prevIndex]);
    setIsPlaying(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") nextVideo();
    if (e.key === "ArrowLeft") prevVideo();
    if (e.key === " ") {
      e.preventDefault();
      togglePlay();
    }
  };

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => openModal(video, videos.indexOf(video))}
          >
            <CardSpotlight spotlightColor="rgb(251, 191, 36)">
              <Card3DEffect intensity={15}>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <video
                    src={video.src}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    muted
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play size={32} className="text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-bold text-lg mb-1">{video.title}</h3>
                    <p className="text-sm opacity-90">{video.description}</p>
                  </div>
                </div>
              </Card3DEffect>
            </CardSpotlight>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
              >
                <X size={20} />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={prevVideo}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextVideo}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
              >
                <ChevronRight size={24} />
              </button>

              {/* Video Controls */}
              <div className="absolute top-4 left-4 z-10 flex items-center space-x-3">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                {/* Volume Control */}
                <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
                  <button
                    onClick={handleMuteToggle}
                    className="w-8 h-8 flex items-center justify-center text-white hover:text-yellow-400 transition-colors duration-200"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <div className="w-20 h-2 bg-gray-600 rounded-full relative">
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

              {/* Video */}
              <div className="relative rounded-2xl overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  src={selectedVideo.src}
                  className="w-full h-auto max-h-[70vh] object-contain"
                  muted={isMuted}
                  autoPlay={true}
                  loop={true}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  onLoadedMetadata={() => {
                    if (videoRef.current) {
                      videoRef.current.volume = volume;
                    }
                  }}
                />
                <div className="p-6 backdrop-blur-sm bg-white/50 pb-14">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedVideo.title}
                  </h2>
                  <p className="text-gray-600">{selectedVideo.description}</p>
                </div>
              </div>

              {/* Video Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                {selectedIndex + 1} / {videos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
