"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/theme-context";

interface BackgroundLinesProps {
  className?: string;
  children?: React.ReactNode;
  lineColor?: string;
  lineWidth?: number;
  lineCount?: number;
  animationDuration?: number;
  interactive?: boolean;
}

export const BackgroundLines = ({
  className = "",
  children,
  lineColor = "rgb(251, 191, 36)",
  lineWidth = 1,
  lineCount = 20,
  animationDuration = 20,
  interactive = true,
}: BackgroundLinesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!interactive || !containerRef.current || !isClient) return;

    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const lines = container.querySelectorAll(".background-line");
      const horizontalLines = container.querySelectorAll(".horizontal-line");
      const circles = container.querySelectorAll(".floating-circle");

      lines.forEach((line, index) => {
        const lineElement = line as HTMLElement;
        const speed = (index + 1) * 0.1;
        const offsetX = (x - rect.width / 2) * speed * 0.01;
        const offsetY = (y - rect.height / 2) * speed * 0.01;

        lineElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });

      horizontalLines.forEach((line, index) => {
        const lineElement = line as HTMLElement;
        const speed = (index + 1) * 0.08;
        const offsetX = (x - rect.width / 2) * speed * 0.008;
        const offsetY = (y - rect.height / 2) * speed * 0.008;

        lineElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });

      circles.forEach((circle, index) => {
        const circleElement = circle as HTMLElement;
        const speed = (index + 1) * 0.05;
        const offsetX = (x - rect.width / 2) * speed * 0.005;
        const offsetY = (y - rect.height / 2) * speed * 0.005;

        circleElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [interactive, isClient]);

  // Não renderizar nada até estar no cliente
  if (!isClient) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  const generateLines = () => {
    const lines = [];
    for (let i = 0; i < lineCount; i++) {
      const delay = (i / lineCount) * animationDuration;
      const opacity = 0.1 + (i / lineCount) * 0.3;
      const scale = 0.5 + (i / lineCount) * 0.5;

      lines.push(
        <motion.div
          key={`vertical-${i}`}
          className="background-line absolute"
          style={{
            left: `${(i / lineCount) * 100}%`,
            top: "0",
            width: `${lineWidth}px`,
            height: "100%",
            backgroundColor: lineColor,
            opacity,
            transform: `scaleY(${scale})`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [opacity, opacity * 1.5, opacity],
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        />
      );
    }
    return lines;
  };

  const generateHorizontalLines = () => {
    const lines = [];
    for (let i = 0; i < lineCount / 2; i++) {
      const delay = (i / (lineCount / 2)) * animationDuration;
      const opacity = 0.05 + (i / (lineCount / 2)) * 0.2;
      const scale = 0.3 + (i / (lineCount / 2)) * 0.7;

      lines.push(
        <motion.div
          key={`horizontal-${i}`}
          className="horizontal-line absolute"
          style={{
            top: `${(i / (lineCount / 2)) * 100}%`,
            left: "0",
            height: `${lineWidth}px`,
            width: "100%",
            backgroundColor: lineColor,
            opacity,
            transform: `scaleX(${scale})`,
          }}
          animate={{
            x: [0, 15, 0],
            opacity: [opacity, opacity * 1.3, opacity],
          }}
          transition={{
            duration: animationDuration * 1.5,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        />
      );
    }
    return lines;
  };

  const generateFloatingCircles = () => {
    const circles = [];
    // Usando valores fixos para evitar problemas de hidratação
    const circleData = [
      { left: 3.14, top: 10.66, size: 7.53, opacity: 0.20 },
      { left: 76.20, top: 51.26, size: 3.07, opacity: 0.38 },
      { left: 9.59, top: 67.92, size: 3.87, opacity: 0.32 },
      { left: 70.27, top: 67.26, size: 5.34, opacity: 0.15 },
      { left: 61.61, top: 95.15, size: 3.50, opacity: 0.31 },
      { left: 16.70, top: 44.23, size: 3.57, opacity: 0.13 },
      { left: 86.40, top: 50.11, size: 6.97, opacity: 0.26 },
      { left: 64.55, top: 86.27, size: 2.45, opacity: 0.17 },
      { left: 59.36, top: 3.02, size: 4.99, opacity: 0.12 },
      { left: 10.04, top: 76.23, size: 5.70, opacity: 0.15 },
      { left: 88.49, top: 4.26, size: 6.74, opacity: 0.16 },
      { left: 26.94, top: 0.57, size: 3.35, opacity: 0.25 },
      { left: 73.70, top: 64.27, size: 7.65, opacity: 0.35 },
      { left: 14.82, top: 45.20, size: 4.15, opacity: 0.23 },
      { left: 94.99, top: 61.61, size: 4.11, opacity: 0.33 },
    ];

    for (let i = 0; i < circleData.length; i++) {
      const data = circleData[i];
      const delay = (i / circleData.length) * animationDuration;

      circles.push(
        <motion.div
          key={`circle-${i}`}
          className="floating-circle absolute rounded-full"
          style={{
            left: `${data.left}%`,
            top: `${data.top}%`,
            width: `${data.size}px`,
            height: `${data.size}px`,
            backgroundColor: lineColor,
            opacity: data.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            opacity: [data.opacity, data.opacity * 1.8, data.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: animationDuration * 0.8,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        />
      );
    }
    return circles;
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: theme === 'dark' 
          ? `linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)`
          : `linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)`,
      }}
    >
      {/* Background Lines Verticais */}
      <div className="absolute inset-0 pointer-events-none">
        {generateLines()}
      </div>

      {/* Background Lines Horizontais */}
      <div className="absolute inset-0 pointer-events-none">
        {generateHorizontalLines()}
      </div>

      {/* Círculos Flutuantes */}
      <div className="absolute inset-0 pointer-events-none">
        {generateFloatingCircles()}
      </div>

      {/* Linhas Diagonais */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 15px,
              ${lineColor}15 15px,
              ${lineColor}15 30px
            )`,
          }}
          animate={{
            x: [0, -30, 0],
          }}
          transition={{
            duration: animationDuration * 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Linhas Diagonais Inversas */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 20px,
              ${lineColor}10 20px,
              ${lineColor}10 40px
            )`,
          }}
          animate={{
            x: [0, 25, 0],
          }}
          transition={{
            duration: animationDuration * 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Overlay de tema dark */}
      <div className="absolute inset-0 pointer-events-none bg-transparent dark:bg-black/10 transition-colors duration-300"></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}; 