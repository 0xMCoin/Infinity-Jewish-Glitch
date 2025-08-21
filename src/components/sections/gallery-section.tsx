"use client";

import { motion } from "framer-motion";
import { GalleryShowcase } from "../ui/gallery-showcase";
import { placeholderVideos } from "../../data/gallery-data";

export function GallerySection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 font-arcade text-arcade-shadow"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            RODOLFO VIDEO GALLERY
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Explore our amazing collection of dancing rat videos! Each video
            comes to life with stunning 3D effects and interactive animations.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <GalleryShowcase videos={placeholderVideos} />
        </motion.div>
      </div>
    </section>
  );
} 