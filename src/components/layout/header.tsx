"use client";

import { useState } from "react";
import {
  FaBars,
  FaHome,
  FaInfoCircle,
  FaImages,
  FaRocket,
  FaTwitter,
} from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const dockItems = [
  {
    title: "Twitter",
    icon: <FaTwitter />,
    href: "https://x.com/",
  },
  {
    title: "Contract",
    icon: <SiSolana />,
    href: "https://pump.fun/coin/",
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 z-50 w-full">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 overflow-hidden relative z-20 shadow-lg">
        <div className="relative">
          <div className="animate-marquee whitespace-nowrap text-sm font-bold font-arcade">
            <span className="mx-8">
              INFINITY JEWISH GLITCH IS THE NEXT BIG THING IN CRYPTO
            </span>
            <span className="mx-8">
              INFINITY JEWISH GLITCH BRINGS INFINITE INNOVATION
            </span>
            <span className="mx-8">
              DON'T MISS OUT ON THE JEWISH TECH REVOLUTION
            </span>
            <span className="mx-8">
              GET READY FOR THE INFINITE GLITCH EVOLUTION
            </span>
          </div>
        </div>
      </div>

      <header className="relative bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600 px-4 py-3 shadow-xl z-20 transition-all duration-300 overflow-hidden">
        <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Logo Section */}
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-white/10 backdrop-blur-sm p-1 rounded-xl border border-white/20 hover:border-blue-300/50 transition-all duration-300">
              <Image
                src="/images/logo.png"
                alt="Infinity Jewish Glitch Logo"
                width={48}
                height={48}
                className="rounded-lg"
              />
            </div>

            <div className="hidden md:block">
              <motion.h1
                className="text-xl lg:text-2xl font-black text-white font-arcade"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  INFINITY JEWISH GLITCH
                </span>
              </motion.h1>
              <motion.p
                className="text-xs text-blue-100 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Next-Gen Auto-Buyback Token
              </motion.p>
            </div>
          </motion.div>

          <nav className="hidden lg:flex items-center space-x-6">
            {[
              { href: "#home", label: "Home", icon: <FaHome size={16} /> },
              {
                href: "#info",
                label: "Info",
                icon: <FaInfoCircle size={16} />,
              },
              {
                href: "#gallery",
                label: "Gallery",
                icon: <FaImages size={16} />,
              },
              {
                href: "#buy",
                label: "Buy $IJG",
                icon: <FaRocket size={16} />,
                special: true,
              },
            ].map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className={`relative group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  item.special
                    ? "bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold hover:from-green-500 hover:to-blue-500 shadow-lg"
                    : "text-white hover:text-blue-200 hover:bg-white/10"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
                {!item.special && (
                  <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </motion.a>
            ))}
          </nav>

          {/* Right Section - Social Links & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-2">
              {dockItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative bg-black/20 backdrop-blur-sm p-2 rounded-lg border border-white/20 text-white hover:text-blue-200 transition-all duration-300 hover:border-blue-300/50 hover:bg-white/10">
                    {item.icon}
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white hover:text-blue-200 transition-colors relative group"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-white/20 hover:border-blue-300/50 transition-all duration-300">
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaBars size={20} />
                </motion.div>
              </div>
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 z-50 lg:hidden"
          >
            <div className="relative bg-gray-900/95 dark:bg-gray-800/95 text-white mx-4 mt-2 rounded-xl shadow-2xl border border-blue-500/30 backdrop-blur-md overflow-hidden">
              {/* Mobile Header */}
              <div className="p-4 border-b border-blue-500/20">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/images/logo.png"
                    alt="IJG Logo"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-blue-400">
                      Infinity Jewish Glitch
                    </h3>
                    <p className="text-xs text-gray-400">Auto-Buyback Token</p>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="relative z-10 p-4 space-y-3">
                {[
                  {
                    href: "#home",
                    label: "Home",
                    icon: <FaHome size={18} />,
                    description: "Back to top",
                  },
                  {
                    href: "#info",
                    label: "Token Info",
                    icon: <FaInfoCircle size={18} />,
                    description: "Learn about IJG",
                  },
                  {
                    href: "#gallery",
                    label: "Evolution Gallery",
                    icon: <FaImages size={18} />,
                    description: "View milestone art",
                  },
                  {
                    href: "#buy",
                    label: "Buy $IJG Now",
                    icon: <FaRocket size={18} />,
                    description: "Get tokens",
                    special: true,
                  },
                ].map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 group ${
                      item.special
                        ? "bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 hover:from-green-500/30 hover:to-blue-500/30"
                        : "hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        item.special
                          ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                          : "bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-medium ${
                          item.special ? "text-green-400" : "text-white"
                        }`}
                      >
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-400">
                        {item.description}
                      </div>
                    </div>
                    <div
                      className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity ${
                        item.special ? "text-green-400" : "text-blue-400"
                      }`}
                    >
                      →
                    </div>
                  </motion.a>
                ))}
              </nav>

              {/* Mobile Social Links */}
              <div className="p-4 border-t border-blue-500/20">
                <div className="text-xs text-gray-400 mb-3 font-medium">
                  Connect with us
                </div>
                <div className="flex justify-center space-x-4">
                  {dockItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-blue-500/10 transition-colors group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-blue-400 group-hover:text-blue-300">
                        {item.icon}
                      </div>
                      <span className="text-xs text-gray-400 group-hover:text-gray-300">
                        {item.title}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
