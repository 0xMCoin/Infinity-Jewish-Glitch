"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  rx?: number;
  ry?: number;
  className?: string;
  borderRadius?: string;
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx = 0,
  ry = 0,
  className,
  borderRadius,
}: MovingBorderProps) => {
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!borderRef.current) return;

    const border = borderRef.current;
    const animate = () => {
      border.style.setProperty("--border-radius", borderRadius || "0px");
      border.style.setProperty("--rx", rx.toString());
      border.style.setProperty("--ry", ry.toString());
    };

    animate();
  }, [borderRadius, rx, ry]);

  return (
    <div
      ref={borderRef}
      className={cn(
        "relative [--border-radius:0px] [--rx:0] [--ry:0]",
        className
      )}
      style={{
        borderRadius: "var(--border-radius)",
      }}
    >
      <div
        className="absolute inset-0 rounded-[var(--border-radius)]"
        style={{
          background: `conic-gradient(from 0deg at var(--rx) var(--ry), transparent 0deg, currentColor 90deg, transparent 180deg)`,
          animation: `rotate ${duration}ms linear infinite`,
        }}
      />
      <div className="absolute inset-[1px] rounded-[calc(var(--border-radius)-1px)] bg-background" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}; 