"use client";

import { motion } from "framer-motion";
import { LockedGallery } from "../ui/locked-gallery";

export function GallerySection() {
  return (
    <section id="gallery" className="py-20">
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
            אבולוציית יְהוּדִי
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            שחרר אומנות בלעדית של ג'ואיש גליטץ ככל ששווי השוק שלנו גדל! כל ציון דרך חושף שלבים חדשים של אבולוציה אינסופית.
          </motion.p>
          
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/50 rounded-lg text-green-400 text-sm font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            תמונות חדשות נפתחות כל $25K שווי שוק
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <LockedGallery />
        </motion.div>
      </div>
    </section>
  );
} 