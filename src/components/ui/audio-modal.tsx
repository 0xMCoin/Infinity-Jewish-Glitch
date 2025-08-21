"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface AudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnableAudio: () => void;
}

export function AudioModal({ isOpen, onClose, onEnableAudio }: AudioModalProps) {
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);

  const enableAudio = () => {
    if (leftVideoRef.current) {
      leftVideoRef.current
        .play()
        .then(() => {
          leftVideoRef.current!.muted = true;
          leftVideoRef.current!.volume = 0;
        })
        .catch(console.log);
    }

    if (rightVideoRef.current) {
      rightVideoRef.current
        .play()
        .then(() => {
          rightVideoRef.current!.muted = false;
          rightVideoRef.current!.volume = 0.7;
          onEnableAudio();
        })
        .catch(console.log);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-gradient-to-br from-emerald-500 to-green-600 p-8 rounded-2xl shadow-2xl text-center max-w-md mx-auto"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <h3 className="text-2xl font-black text-white mb-4 font-arcade text-arcade-shadow">
          START VIDEO WITH AUDIO!
        </h3>
        <p className="text-white/90 mb-6 text-lg">
          Click here to start the dance and enjoy the music!
        </p>
        <motion.button
          onClick={enableAudio}
          className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          LET'S DANCE!
        </motion.button>
      </motion.div>

      {/* Hidden video elements for audio control */}
      <video
        ref={leftVideoRef}
        src="/videos/rat_meme1.mp4"
        className="hidden"
        loop
        playsInline
      />
      <video
        ref={rightVideoRef}
        src="/videos/rat_meme3.mp4"
        className="hidden"
        loop
        playsInline
      />
    </motion.div>
  );
} 