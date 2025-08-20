"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEthereum,
  FaCoins,
  FaRocket,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import { SiSolana } from "react-icons/si";

interface CallToActionProps {
  className?: string;
}

export function CallToAction({ className }: CallToActionProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleBuy = () => {
    // Handle buy action
  };

  const handleConnectWallet = () => {
    // Handle wallet connection
  };

  return (
    <section className={`py-20 relative overflow-hidden ${className}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#ace4bb] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#98c8ac] rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#ace4bb] rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header - Consistent with site style */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-6xl md:text-8xl font-black text-[#3c885c] mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 30px rgba(152, 200, 172, 0.8)",
              transition: { duration: 0.3 },
            }}
          >
            SQUEAKO MODE
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Switch flips, bass drops, chart pops. Degen rats only.
          </motion.p>
        </div>

        {/* CTA Buttons - Consistent with site button style */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={handleBuy}
            className="relative group px-8 py-4 bg-gradient-to-r from-[#ace4bb] to-[#98c8ac] text-black font-bold text-lg rounded-xl shadow-2xl overflow-hidden"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {/* Glowing Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ace4bb] via-[#98c8ac] to-[#8caca4] rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Button Content */}
            <div className="relative flex items-center space-x-3">
              <FaCoins className="w-5 h-5" />
              <span>BUY $RAT NOW</span>
            </div>
          </motion.button>

          <motion.button
            onClick={handleConnectWallet}
            className="relative group px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-[#ace4bb] font-bold text-lg rounded-xl shadow-2xl border border-[#ace4bb]/50 overflow-hidden"
            whileHover={{ scale: 1.05, rotateY: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button Content */}
            <div className="relative flex items-center space-x-3">
              <SiSolana className="w-5 h-5" />
              <span>CONNECT WALLET</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Additional CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative backdrop-blur-sm bg-black/80 dark:bg-gray-900/80 text-white dark:text-gray-100 p-8 rounded-2xl shadow-2xl border border-[#ace4bb]/20">
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-[#ace4bb] mb-4">
                  If you wanna pump my coin, you gotta give me cheese.
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  Moonin' lasts forever, rats are all we need!
                </p>
                <motion.button
                  onClick={handleBuy}
                  className="px-8 py-4 bg-gradient-to-r from-[#ace4bb] to-[#98c8ac] text-black font-bold text-lg rounded-xl shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  START DANCING NOW!
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
