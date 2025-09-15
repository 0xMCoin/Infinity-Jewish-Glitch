"use client";

import { useState } from "react";
import { FaBars, FaInstagram, FaTiktok } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { ThemeToggle } from "../ui/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

const dockItems = [
  /*  {
    title: "Twitter",
    icon: <FaTwitter />,
    href: "https://x.com/rodolfotherat",
  },
  {
    title: "Telegram",
    icon: <FaTelegram />,
    href: "https://t.me/rodolfotherat",
  }, 
  */
  {
    title: "Instagram",
    icon: <FaInstagram />,
    href: "https://www.instagram.com/ratmemecoin",
  },
  {
    title: "Tiktok",
    icon: <FaTiktok />,
    href: "https://www.tiktok.com/@rodolfoorato",
  },
  {
    title: "Contract",
    icon: <SiSolana />,
    href: "https://pump.fun/coin",
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 z-50 w-full">
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-2 overflow-hidden relative z-20 shadow-lg">
        <div className="relative">
          <div className="animate-marquee whitespace-nowrap text-sm font-bold font-arcade">
            <span className="mx-8">
              PHONK RAT IS THE NEXT BIG THING IN CRYPTO
            </span>
            <span className="mx-8">
              PHONK RAT IS HERE TO RULE THE MEME WORLD
            </span>
            <span className="mx-8">DON'T MISS OUT ON THE FUN AND REWARDS</span>
            <span className="mx-8">GET READY FOR THE RODOLFO REVOLUTION</span>
          </div>
        </div>
      </div>

      <header className="relative bg-gradient-to-r from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600 px-4 py-1 flex items-center justify-between shadow-xl z-20 transition-all duration-300 overflow-hidden">
        <div className="relative z-10 flex items-center justify-between w-full">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-emerald-200 dark:hover:text-emerald-200 transition-colors hover:scale-110 transform duration-200 relative group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative bg-black/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/20 hover:border-emerald-400/50 transition-all duration-300">
              <FaBars size={24} />
            </div>
          </motion.button>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Social Links with Enhanced Hover Effects */}
            <div className="flex items-center space-x-3">
              {dockItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative bg-black/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/20 text-white hover:text-emerald-200 dark:hover:text-emerald-200 transition-all duration-300 hover:border-emerald-400/50 hover:bg-black/30">
                    {item.icon}
                  </div>
                </motion.a>
              ))}
            </div>
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
            className="absolute top-24 left-0 w-64 z-50"
          >
            <div className="relative bg-gray-900/95 dark:bg-gray-800/95 text-white p-4 rounded-br-lg shadow-2xl border border-emerald-500/30 backdrop-blur-md overflow-hidden">
              <nav className="relative z-10 space-y-4">
                {[
                  { href: "#about", label: "About Rodolfo" },
                  { href: "#gallery", label: "Video Gallery" },
                  { href: "#buy", label: "Buy Now" },
                ].map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block relative group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="relative px-3 py-1 rounded-lg border border-transparent group-hover:border-emerald-500/50 transition-all duration-300 hover:text-emerald-400 hover:bg-emerald-500/10">
                      {item.label}
                    </div>
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
