"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaCoins, FaRocket, FaUsers, FaChartLine } from "react-icons/fa";

interface CallToActionProps {
  className?: string;
}

export function CallToAction({ className }: CallToActionProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleBuy = () => {
    window.open(
      "https://pump.fun/coin/DM7DYeWfUAXMY1dwoNcXMD65n1TzgurHLNCetenJpump",
      "_blank"
    );
  };

  return (
    <section className={`py-20 relative overflow-hidden ${className}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-green-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-blue-400 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 font-arcade text-arcade-shadow"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            READY FOR INFINITE INNOVATION?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Don't miss out on the infinite Jewish glitch revolution! Join the 
            community where tradition meets innovation in the ultimate crypto adventure.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={handleBuy}
            className="relative group px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold text-lg rounded-xl shadow-2xl overflow-hidden hover:from-green-600 hover:to-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-500 to-green-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center space-x-3">
              <FaCoins className="w-5 h-5" />
              <span>BUY $IJG NOW</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
