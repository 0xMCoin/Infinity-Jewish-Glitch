import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Verificar tema salvo ou preferência do sistema
    const getInitialTheme = (): Theme => {
      try {
        const saved = localStorage.getItem('theme') as Theme;
        if (saved && (saved === 'light' || saved === 'dark')) {
          return saved;
        }
      } catch {
        // localStorage não disponível
      }
      
      // Verificar preferência do sistema
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      return 'light';
    };

    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Aplicar tema ao documento
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Salvar no localStorage
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // localStorage não disponível
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    toggleTheme,
    mounted
  };
} 