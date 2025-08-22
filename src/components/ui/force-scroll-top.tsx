"use client";

import { useEffect } from 'react';

export function ForceScrollTop() {
  useEffect(() => {
    // Forçar scroll para o topo imediatamente
    window.scrollTo(0, 0);
    
    // Forçar scroll para o topo após um delay
    const timeout1 = setTimeout(() => window.scrollTo(0, 0), 50);
    const timeout2 = setTimeout(() => window.scrollTo(0, 0), 100);
    const timeout3 = setTimeout(() => window.scrollTo(0, 0), 200);
    const timeout4 = setTimeout(() => window.scrollTo(0, 0), 500);
    
    // Forçar scroll para o topo quando a janela ganhar foco
    const handleFocus = () => window.scrollTo(0, 0);
    const handleBlur = () => window.scrollTo(0, 0);
    
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return null;
} 