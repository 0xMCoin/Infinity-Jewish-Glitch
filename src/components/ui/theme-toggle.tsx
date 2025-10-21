"use client";

import { useTheme } from "@/contexts/theme-context";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={`עבור למצב ${theme === "light" ? "כהה" : "בהיר"}`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative w-5 h-5"
      >
        {theme === "light" ? (
          <FaSun className="w-5 h-5" />
        ) : (
          <FaMoon className="w-5 h-5" />
        )}
      </motion.div>

      {/* Efeito de brilho */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-500 opacity-0"
        animate={{
          opacity: theme === "light" ? [0, 0.3, 0] : 0,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
};
