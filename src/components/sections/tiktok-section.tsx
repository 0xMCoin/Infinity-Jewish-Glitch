"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Declaração de tipos para o TikTok
declare global {
  interface Window {
    TikTok?: {
      reloadEmbeds: () => void;
    };
  }
}

export function TikTokSection() {
  const initialized = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  const tiktokVideos = [
    {
      id: 1,
      user: "rodolfoorato",
      videoId: "7523818431678926136",
      title: "Montagem Xonada",
      description: "Watch this amazing dance compilation!",
      hashtags: [
        "#rodolfoorato",
        "#musica",
        "#dança",
        "#montagemxonada",
        "#rat",
        "#foryoupage",
      ],
    },
    {
      id: 2,
      user: "rodolfoorato",
      videoId: "7527362994620189958",
      title: "Montagem Mandela",
      description: "Amazing Mandela dance compilation!",
      hashtags: ["#rodolfoorato", "#musica", "#dança", "#foryoupage", "#phonk"],
    },
    {
      id: 3,
      user: "rodolfoorato",
      videoId: "7528110592046026040",
      title: "Montagem Mandela 2",
      description: "Another incredible Mandela dance video!",
      hashtags: ["#rodolfoorato", "#musica", "#dança", "#foryoupage", "#phonk"],
    },
  ];

  // Carregar script do TikTok apenas quando a seção estiver visível
  useEffect(() => {
    if (initialized.current || !isVisible) return;
    initialized.current = true;

    const loadTikTokEmbeds = () => {
      // Aguarda um pouco para garantir que o DOM esteja pronto
      setTimeout(() => {
        if (window.TikTok?.reloadEmbeds) {
          try {
            window.TikTok.reloadEmbeds();
          } catch (error) {
            console.log("TikTok embeds reloaded");
          }
        }
      }, 1000);
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.tiktok.com/embed.js"]'
    );

    if (existing) {
      loadTikTokEmbeds();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    script.onload = loadTikTokEmbeds;
    script.onerror = () => {
      console.warn("Failed to load TikTok embed script");
    };
    document.head.appendChild(script);
  }, [isVisible]);

  return (
    <section className="py-8 relative">
      {" "}
      {/* Reduzido de py-12 para py-8 */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          {" "}
          {/* Reduzido de mb-10 para mb-8 */}
          <motion.h2
            className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 font-arcade text-arcade-shadow"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onViewportEnter={() => setIsVisible(true)}
          >
            RODOLFO&apos;S TIKTOK
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Watch the latest viral videos from Rodolfo directly here on the site
            — official TikTok embeds.
          </motion.p>
        </div>

        {/* Header do perfil */}
        <div className="flex items-center justify-center mb-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-arcade text-arcade-shadow">
              @RODOLFOORATO
            </h3>
          </div>
        </div>

        <motion.div
          className="flex justify-center px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="border-2 border-emerald-500 dark:border-emerald-400 rounded-2xl shadow-xl overflow-hidden w-full max-w-[720px]">
            <blockquote
              cite="https://www.tiktok.com/@rodolfoorato"
              data-unique-id="rodolfoorato"
              data-embed-type="creator"
              className="tiktok-embed"
              style={{
                maxWidth: "100%",
                width: "100%",
                height: "100%",
                margin: "0",
                padding: "0",
              }}
            >
              <section>
                <a
                  target="_blank"
                  href="https://www.tiktok.com/@rodolfoorato?refer=creator_embed"
                >
                  @rodolfoorato
                </a>
              </section>
            </blockquote>
          </div>
        </motion.div>

        {/* Grid de vídeos individuais */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6 px-4 mx-auto mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {tiktokVideos.map((vid) => (
            <div
              key={vid.id}
              className="border-2 w-full max-w-[320px] sm:w-[320px] border-emerald-500 dark:border-emerald-400 rounded-2xl shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 overflow-hidden"
            >
              <blockquote
                className="tiktok-embed"
                cite={`https://www.tiktok.com/@${vid.user}/video/${vid.videoId}`}
                data-video-id={vid.videoId}
                style={{
                  width: "100%",
                  height: "600px",
                  backgroundColor: "black",
                  margin: "0",
                  padding: "0",
                }}
              >
                <section>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    title={`@${vid.user}`}
                    href={`https://www.tiktok.com/@${vid.user}?refer=embed`}
                  >
                    @{vid.user}
                  </a>{" "}
                  {vid.title}{" "}
                  {vid.hashtags.map((tag, i) => (
                    <a
                      key={i}
                      title={tag.replace("#", "")}
                      target="_blank"
                      rel="noreferrer"
                      href={`https://www.tiktok.com/tag/${tag.replace(
                        "#",
                        ""
                      )}?refer=embed`}
                    >
                      {tag}
                    </a>
                  ))}
                </section>
              </blockquote>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
