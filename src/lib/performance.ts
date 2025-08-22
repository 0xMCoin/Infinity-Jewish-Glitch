// Utilitários de performance para otimizar o carregamento

// Preload de recursos críticos
export const preloadCriticalResources = () => {
  // Preload de fontes críticas
  const fontLinks = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'
  ];

  fontLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
  });

  // Preload de vídeos críticos
  const videoUrls = ['/videos/rat_meme1.mp4', '/videos/rat_meme2.mp4'];
  videoUrls.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Lazy loading de imagens
export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Debounce para otimizar eventos
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle para otimizar eventos
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Otimização de animações
export const optimizeAnimations = () => {
  // Força hardware acceleration para animações
  const style = document.createElement('style');
  style.textContent = `
    .optimize-animation {
      will-change: transform;
      transform: translateZ(0);
      backface-visibility: hidden;
    }
  `;
  document.head.appendChild(style);
};

// Prefetch de rotas
export const prefetchRoutes = () => {
  const routes = ['/about', '/tokenomics', '/roadmap'];
  
  routes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
};

// Otimização de scroll
export const optimizeScroll = () => {
  let ticking = false;
  
  const updateScroll = () => {
    // Lógica de scroll otimizada
    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestTick, { passive: true });
};

// Inicialização de todas as otimizações
export const initializePerformanceOptimizations = () => {
  if (typeof window !== 'undefined') {
    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        preloadCriticalResources();
        lazyLoadImages();
        optimizeAnimations();
        prefetchRoutes();
        optimizeScroll();
      });
    } else {
      preloadCriticalResources();
      lazyLoadImages();
      optimizeAnimations();
      prefetchRoutes();
      optimizeScroll();
    }
  }
}; 