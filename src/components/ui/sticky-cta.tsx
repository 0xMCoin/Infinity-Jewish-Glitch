"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StickyBanner } from "./sticky-banner";
import { ArrowRight, X, Sparkles } from "lucide-react";

interface StickyCTAProps {
  className?: string;
}

export function StickyCTA({ className }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // Aparece após 3 segundos

    return () => clearTimeout(timer);
  }, []);

  if (isDismissed) return null;

  return (
    <StickyBanner className={className}>
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Message */}
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-white" />
                <span className="font-bold text-lg">🧀 Gangue do Queijo!</span>
              </div>
              <span className="text-white/90 font-medium">
                Junte-se à comunidade mais queijosa da internet!
              </span>
            </motion.div>

            {/* Right side - CTA Button */}
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.button
                className="px-6 py-2 bg-white text-orange-600 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Entrar Agora</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* Dismiss Button */}
              <motion.button
                onClick={() => setIsDismissed(true)}
                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </StickyBanner>
  );
} 