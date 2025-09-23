"use client";

import React, { createContext, useContext } from "react";
import { useTheme as useThemeHook } from "@/hooks/use-theme";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme, mounted } = useThemeHook();

  // Renderizar um fallback simples durante a hidratação
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{ theme: "dark", toggleTheme: () => {}, mounted: false }}
      >
        <div className="min-h-screen bg-gray-50">{children}</div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
