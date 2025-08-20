"use client";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const Lens: React.FC<{
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
  position?: { x: number; y: number };
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
}> = ({
  children,
  zoomFactor = 1.5,
  lensSize = 170,
  isStatic = false,
  position = { x: 200, y: 150 },
}) => {
  const mouseX = useMotionValue(isStatic ? position.x : 0);
  const mouseY = useMotionValue(isStatic ? position.y : 0);

  const [hovering, setHovering] = useState(isStatic ? true : false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    if (isStatic) {
      mouseX.set(position.x);
      mouseY.set(position.y);
      setHovering(true);
    }
  }, [isStatic, position, mouseX, mouseY]);

  return (
    <div
      className="relative z-20 rounded-3xl overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <AnimatedLensOverlay
        hovering={hovering}
        mouseX={mouseX}
        mouseY={mouseY}
        lensSize={lensSize}
        zoomFactor={zoomFactor}
      >
        {children}
      </AnimatedLensOverlay>
      {children}
    </div>
  );
};

const AnimatedLensOverlay = ({
  children,
  mouseX,
  mouseY,
  zoomFactor,
  lensSize,
  hovering,
}: {
  children: React.ReactNode;
  mouseX: any;
  mouseY: any;
  zoomFactor: number;
  lensSize: number;
  hovering: boolean;
}) => {
  const maskImage = useMotionTemplate`radial-gradient(${lensSize}px at ${mouseX}px ${mouseY}px, white, transparent)`;
  
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute inset-0 z-50 overflow-hidden rounded-3xl",
      )}
      style={{
        maskImage,
        WebkitMaskImage: maskImage,
      }}
      animate={{
        opacity: hovering ? 1 : 0,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0 z-50"
        style={{
          transformOrigin: `${mouseX}px ${mouseY}px`,
        }}
        animate={{
          scale: hovering ? zoomFactor : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}; 