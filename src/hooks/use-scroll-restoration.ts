import { useEffect, useRef } from 'react';

export function useScrollRestoration() {
  const scrollPosition = useRef(0);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Salvar posição do scroll antes de sair da página
    const handleBeforeUnload = () => {
      scrollPosition.current = window.scrollY;
      sessionStorage.setItem('scrollPosition', scrollPosition.current.toString());
    };

    // Prevenir scroll automático de forma mais agressiva
    const preventAutoScroll = () => {
      // Sempre forçar scroll para o topo no carregamento inicial
      if (isInitialLoad.current) {
        window.scrollTo(0, 0);
        isInitialLoad.current = false;
        return;
      }

      // Verificar se há posição salva
      const savedPosition = sessionStorage.getItem('scrollPosition');
      if (savedPosition) {
        const position = parseInt(savedPosition, 10);
        // Só restaurar se a posição for maior que 100px (não no topo)
        if (position > 100) {
          requestAnimationFrame(() => {
            window.scrollTo(0, position);
            sessionStorage.removeItem('scrollPosition');
          });
        } else {
          // Se estava no topo, forçar para o topo
          window.scrollTo(0, 0);
          sessionStorage.removeItem('scrollPosition');
        }
      } else {
        // Sem posição salva, forçar para o topo
        window.scrollTo(0, 0);
      }
    };

    // Função para forçar scroll para o topo
    const forceScrollToTop = () => {
      window.scrollTo(0, 0);
    };

    // Event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Usar múltiplos eventos para garantir que execute
    window.addEventListener('load', preventAutoScroll);
    document.addEventListener('DOMContentLoaded', preventAutoScroll);
    
    // Forçar scroll para o topo em vários momentos
    window.addEventListener('focus', forceScrollToTop);
    
    // Executar imediatamente se já estiver carregado
    if (document.readyState === 'complete') {
      preventAutoScroll();
    } else if (document.readyState === 'interactive') {
      preventAutoScroll();
    }

    // Executar após um pequeno delay para garantir que tudo carregou
    const timeoutId = setTimeout(preventAutoScroll, 100);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', preventAutoScroll);
      document.removeEventListener('DOMContentLoaded', preventAutoScroll);
      window.removeEventListener('focus', forceScrollToTop);
      clearTimeout(timeoutId);
    };
  }, []);

  // Função para scroll suave programático
  const scrollTo = (y: number, behavior: ScrollBehavior = 'auto') => {
    window.scrollTo({
      top: y,
      behavior: behavior as ScrollBehavior
    });
  };

  // Função para scroll para o topo
  const scrollToTop = () => {
    scrollTo(0, 'smooth');
  };

  return {
    scrollTo,
    scrollToTop,
    currentPosition: scrollPosition.current
  };
} 