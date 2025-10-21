"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ParallaxScrollProps = {
  videos: string[];
  className?: string;
};

export const ParallaxScroll = ({ videos, className }: ParallaxScrollProps) => {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const translateYFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotateXFirst = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const translateYThird = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXThird = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotateXThird = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const third = Math.ceil(videos.length / 3);

  const firstPart = videos.slice(0, third);
  const secondPart = videos.slice(third, 2 * third);
  const thirdPart = videos.slice(2 * third);

  return (
    <div className={cn("w-full py-20", className)} ref={containerRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-7xl mx-auto gap-8 px-4">
        {/* First Column - Moves up and rotates right */}
        <div className="grid gap-8">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{
                y: translateYFirst,
                x: translateXFirst,
                rotateX: rotateXFirst,
              }}
              key={"grid-1" + idx}
              className="relative group"
              whileHover={{
                scale: 1.05,
                rotateZ: 0,
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl border-2 border-black">
                <video
                  src={el}
                  className="w-full h-[400px] object-cover"
                  autoPlay
                  muted
                  loop
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                  עכבר #{idx + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second Column - Moves down and rotates left */}
        <div className="grid gap-8">
          {secondPart.map((el, idx) => (
            <motion.div
              key={"grid-2" + idx}
              className="relative group"
              whileHover={{
                scale: 1.05,
                rotateZ: 0,
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl border-2 border-black">
                <video
                  src={el}
                  className="w-full h-[400px] object-cover"
                  autoPlay
                  muted
                  loop
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                  עכבר #{idx + third + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Third Column - Moves up and rotates slightly */}
        <div className="grid gap-8">
          {thirdPart.map((el, idx) => (
            <motion.div
              style={{
                y: translateYThird,
                x: translateXThird,
                rotateX: rotateXThird,
              }}
              key={"grid-3" + idx}
              className="relative group"
              whileHover={{
                scale: 1.05,
                rotateZ: 0,
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl border-2 border-black">
                <video
                  src={el}
                  className="w-full h-[400px] object-cover"
                  autoPlay
                  muted
                  loop
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                  עכבר #{idx + 2 * third + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
