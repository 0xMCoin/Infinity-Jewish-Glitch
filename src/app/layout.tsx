import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/contexts/theme-context";
import { ScrollRestoration } from "@/components/ui/scroll-restoration";
import { ForceScrollTop } from "@/components/ui/force-scroll-top";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
  display: "swap",
  preload: true,
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "Phonk Rat - Meme Coin",
  description:
    "The next big thing in crypto - Phonk Rat is here to rule the meme world!",
  keywords: ["meme coin", "crypto", "solana", "rat", "rodolfo"],
  authors: [{ name: "Phonk Rat Team" }],
  creator: "PHONK RAT",
  publisher: "PHONK RAT",
  robots: "index, follow",
  openGraph: {
    title: "Phonk Rat - Meme Coin",
    description:
      "The next big thing in crypto - PHONK RAT is here to rule the meme world!",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PHONK RAT - Meme Coin",
    description:
      "The next big thing in crypto - PHONK RAT is here to rule the meme world!",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#10b981",
  icons: {
    icon: [
      { url: "/images/logo.png", sizes: "64x64", type: "image/png" },
      { url: "/images/logo.png", sizes: "192x192", type: "image/png" },
      { url: "/images/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/images/logo.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    "msapplication-TileColor": "#10b981",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload de recursos críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Preload de vídeos críticos */}
        <link rel="preload" as="video" href="/videos/rat_meme1.mp4" />
        <link rel="preload" as="video" href="/videos/rat_meme2.mp4" />

        {/* Preload de imagens críticas */}
        <link rel="preload" as="image" href="/images/logo.png" />

        {/* Meta tags de performance */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PHONK RAT" />

        {/* Favicon e ícones */}
        <link rel="icon" href="/images/logo.png" sizes="64x64" />
        <link rel="apple-touch-icon" href="/images/logo-180.png" />

        {/* Preload de CSS crítico */}
        <link rel="preload" href="/globals.css" as="style" />
      </head>
      <body className={`${inter.className} ${pressStart2P.variable}`}>
        <ThemeProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#000",
                color: "#fff",
                border: "2px solid rgb(16, 185, 129)",
              },
            }}
          />
          <ScrollRestoration />
          <ForceScrollTop />
        </ThemeProvider>

        {/* Script de otimizações de performance */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Otimizações de performance inline
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
              
              // Preload de recursos críticos
              const preloadResources = () => {
                const resources = [
                  { href: '/videos/rat_meme1.mp4', as: 'video' },
                  { href: '/videos/rat_meme2.mp4', as: 'video' },
                  { href: '/images/logo.png', as: 'image' }
                ];
                
                resources.forEach(resource => {
                  const link = document.createElement('link');
                  link.rel = 'preload';
                  link.as = resource.as;
                  link.href = resource.href;
                  document.head.appendChild(link);
                });
              };
              
              // Controle de scroll para prevenir scroll automático
              const controlScroll = () => {
                // Salvar posição do scroll
                let scrollPosition = 0;
                
                window.addEventListener('beforeunload', () => {
                  scrollPosition = window.scrollY;
                  sessionStorage.setItem('scrollPosition', scrollPosition.toString());
                });
                
                // Prevenir scroll automático de forma mais agressiva
                const preventAutoScroll = () => {
                  // Sempre forçar scroll para o topo no carregamento inicial
                  window.scrollTo(0, 0);
                  
                  // Verificar se há posição salva
                  const saved = sessionStorage.getItem('scrollPosition');
                  if (saved) {
                    const position = parseInt(saved, 10);
                    // Só restaurar se a posição for maior que 100px (não no topo)
                    if (position > 100) {
                      setTimeout(() => {
                        window.scrollTo(0, position);
                        sessionStorage.removeItem('scrollPosition');
                      }, 50);
                    } else {
                      // Se estava no topo, forçar para o topo
                      window.scrollTo(0, 0);
                      sessionStorage.removeItem('scrollPosition');
                    }
                  }
                };
                
                // Executar quando a página carregar
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', preventAutoScroll);
                } else {
                  preventAutoScroll();
                }
                
                // Executar após um delay para garantir que tudo carregou
                setTimeout(preventAutoScroll, 100);
                setTimeout(preventAutoScroll, 500);
                
                // Forçar scroll para o topo em vários momentos
                window.addEventListener('focus', () => window.scrollTo(0, 0));
                window.addEventListener('blur', () => window.scrollTo(0, 0));
              };
              
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                  preloadResources();
                  controlScroll();
                });
              } else {
                preloadResources();
                controlScroll();
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
