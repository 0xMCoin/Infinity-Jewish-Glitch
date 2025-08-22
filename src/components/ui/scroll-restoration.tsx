"use client";

import { useScrollRestoration } from "@/hooks/use-scroll-restoration";

export function ScrollRestoration() {
  useScrollRestoration();
  
  // Componente invisível que apenas executa o hook
  return null;
} 