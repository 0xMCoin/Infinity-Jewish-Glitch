"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  animation?: {
    initial: any;
    animate: any;
    transition?: any;
  };
}

export function LazySection({
  children,
  className = "",
  threshold = 0.1,
  rootMargin = "50px",
  animation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Carregar conteúdo com delay para melhor performance
          setTimeout(() => setIsLoaded(true), 100);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Renderizar sempre o mesmo conteúdo no servidor e cliente
  if (!isVisible) {
    return (
      <div
        ref={sectionRef}
        className={`min-h-[200px] ${className}`}
        style={{ opacity: 0 }}
      />
    );
  }

  if (!isLoaded) {
    return (
      <div className={`min-h-[200px] ${className}`}>
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
    >
      {children}
    </motion.div>
  );
} 