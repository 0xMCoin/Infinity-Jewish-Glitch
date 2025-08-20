"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans"
      ref={containerRef}
    >
      {/* Container principal com linha à esquerda e conteúdo centralizado */}
      <div className="relative max-w-7xl mx-auto pb-20">
        {/* Linha da timeline com altura limitada */}
        <div className="absolute left-4 top-0 w-[2px] h-[600px] z-30">
          <div className="w-full h-full bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]">
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#ace4bb] via-[#98c8ac] to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </div>

        {/* Conteúdo centralizado */}
        <div ref={ref} className="ml-16 md:ml-20 lg:ml-24">
          {data.map((item, index) => (
            <div
              key={index}
              className="pt-10 md:pt-40"
            >
              {/* Título da seção com indicador visual */}
              <div className="mb-8 md:mb-16 relative">
                {/* Indicador circular na linha da timeline */}
                <div className="absolute -left-12 md:-left-16 lg:-left-20 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-[#ace4bb] dark:bg-[#98c8ac] border-2 border-white dark:border-gray-800 shadow-lg z-40"></div>
                
                <h3 className="text-2xl md:text-5xl font-bold text-[#ace4bb] dark:text-[#3c885c] text-center">
                  {item.title}
                </h3>
              </div>

              {/* Conteúdo da seção */}
              <div className="w-full">
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
