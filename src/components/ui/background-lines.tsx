"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
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
  lineColor = "rgb(16, 185, 129)",
  lineWidth = 1,
  lineCount = 15,
  animationDuration = 20,
  interactive = false,
}: BackgroundLinesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Otimização: usar useCallback para evitar recriação da função
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!interactive || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Usar requestAnimationFrame para melhor performance
    requestAnimationFrame(() => {
      const lines = container.querySelectorAll(".background-line");
      const horizontalLines = container.querySelectorAll(".horizontal-line");
      const circles = container.querySelectorAll(".floating-circle");

      lines.forEach((line, index) => {
        const lineElement = line as HTMLElement;
        const speed = (index + 1) * 0.05;
        const offsetX = (x - rect.width / 2) * speed * 0.005;
        const offsetY = (y - rect.height / 2) * speed * 0.005;

        lineElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });

      horizontalLines.forEach((line, index) => {
        const lineElement = line as HTMLElement;
        const speed = (index + 1) * 0.04;
        const offsetX = (x - rect.width / 2) * speed * 0.004;
        const offsetY = (y - rect.height / 2) * speed * 0.004;

        lineElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });

      circles.forEach((circle, index) => {
        const circleElement = circle as HTMLElement;
        const speed = (index + 1) * 0.025;
        const offsetX = (x - rect.width / 2) * speed * 0.0025;
        const offsetY = (y - rect.height / 2) * speed * 0.0025;

        circleElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    });
  }, [interactive]);

  useEffect(() => {
    if (!interactive || !containerRef.current || !mounted) return;

    const container = containerRef.current;
    container.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [interactive, mounted, handleMouseMove]);

  // Renderizar sempre o mesmo conteúdo no servidor e cliente
  const lines = useMemo(() => {
    const linesArray = [];
    for (let i = 0; i < lineCount; i++) {
      const delay = (i / lineCount) * animationDuration;
      const opacity = 0.08 + (i / lineCount) * 0.25;
      const scale = 0.4 + (i / lineCount) * 0.4;

      linesArray.push(
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
            y: [0, -15, 0],
            opacity: [opacity, opacity * 1.3, opacity],
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
    return linesArray;
  }, [lineCount, animationDuration, lineWidth, lineColor]);

  const horizontalLines = useMemo(() => {
    const linesArray = [];
    for (let i = 0; i < lineCount / 3; i++) {
      const delay = (i / (lineCount / 3)) * animationDuration;
      const opacity = 0.04 + (i / (lineCount / 3)) * 0.15;
      const scale = 0.2 + (i / (lineCount / 3)) * 0.5;

      linesArray.push(
        <motion.div
          key={`horizontal-${i}`}
          className="horizontal-line absolute"
          style={{
            top: `${(i / (lineCount / 3)) * 100}%`,
            left: "0",
            height: `${lineWidth}px`,
            width: "100%",
            backgroundColor: lineColor,
            opacity,
            transform: `scaleX(${scale})`,
          }}
          animate={{
            x: [0, 10, 0],
            opacity: [opacity, opacity * 1.2, opacity],
          }}
          transition={{
            duration: animationDuration * 1.2,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        />
      );
    }
    return linesArray;
  }, [lineCount, animationDuration, lineWidth, lineColor]);

  const floatingCircles = useMemo(() => {
    const circles = [];
    const circleData = [
      { left: 3.14, top: 10.66, size: 6, opacity: 0.15 },
      { left: 76.2, top: 51.26, size: 2.5, opacity: 0.25 },
      { left: 9.59, top: 67.92, size: 3, opacity: 0.2 },
      { left: 70.27, top: 67.26, size: 4, opacity: 0.12 },
      { left: 61.61, top: 95.15, size: 2.8, opacity: 0.2 },
      { left: 16.7, top: 44.23, size: 2.8, opacity: 0.1 },
      { left: 86.4, top: 50.11, size: 5.5, opacity: 0.18 },
      { left: 64.55, top: 86.27, size: 2, opacity: 0.14 },
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
            y: [0, -20, 0],
            x: [0, 8, 0],
            opacity: [data.opacity, data.opacity * 1.5, data.opacity],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: animationDuration * 0.6,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        />
      );
    }
    return circles;
  }, [animationDuration, lineColor]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        background:
          theme === "dark"
            ? `linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)`
            : `linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(34, 197, 94, 0.04) 100%)`,
      }}
    >
      {/* Background Lines Verticais */}
      <div className="absolute inset-0 pointer-events-none">
        {lines}
      </div>

      {/* Background Lines Horizontais */}
      <div className="absolute inset-0 pointer-events-none">
        {horizontalLines}
      </div>

      {/* Círculos Flutuantes */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingCircles}
      </div>

      {/* Linhas Diagonais - Simplificadas */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              ${lineColor}10 20px,
              ${lineColor}10 40px
            )`,
          }}
          animate={{
            x: [0, -20, 0],
          }}
          transition={{
            duration: animationDuration * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Linhas Diagonais Inversas - Simplificadas */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 25px,
              ${lineColor}08 25px,
              ${lineColor}08 50px
            )`,
          }}
          animate={{
            x: [0, 20, 0],
          }}
          transition={{
            duration: animationDuration * 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Overlay de tema dark */}
      <div className="absolute inset-0 pointer-events-none bg-black/15 dark:bg-black/8 transition-colors duration-300"></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
