"use client";

import { motion } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "../ui/3d-card";
import { Lens } from "../ui/lens";

export function AboutSection() {
  const features = [
    {
      title: "Pack Leader",
      description:
        "Leading the digital pack with strength and unity. Every wolf matters!",
      features: [
        "Alpha Leadership",
        "Pack Consensus",
        "Open Source Evolution",
      ],
    },
    {
      title: "Technology First",
      description: "Cutting-edge blockchain tech meets fierce determination!",
      features: ["Smart Contracts", "DeFi Integration", "AI-Powered Features"],
    },
    {
      title: "Digital Dominance",
      description:
        "One howl from the pack, one giant leap for crypto evolution!",
      features: [
        "Tech Alliances",
        "Global Exchanges",
        "Worldwide Adoption",
      ],
    },
  ];

  return (
    <section id="about" className="min-h-screen py-8 px-4 relative mt-20 md:mt-40">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-8xl font-black text-blue-600 dark:text-blue-500 mb-8 font-arcade text-arcade-shadow"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 30px rgba(34, 197, 94, 0.8)",
              transition: { duration: 0.3 },
            }}
          >
            ABOUT IJG
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Innovation without limits! <br /> Jewish wisdom meets infinite possibilities!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <motion.h3
                className="text-3xl font-bold text-green-600 dark:text-green-500 mb-4 font-arcade text-arcade-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                READY FOR THE INFINITE GLITCH?
              </motion.h3>
              <motion.p
                className="text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Hover and witness the infinite glitch power!
              </motion.p>
            </div>

            {/* 3D Card Effect */}
            <div className="w-full max-w-md mx-auto">
              <CardContainer className="inter-var">
                <CardBody className="relative group/card p-4">
                  <CardItem translateZ="100" className="w-full">
                    <div className="relative w-full max-w-[360px] mx-auto h-[640px] rounded-lg overflow-hidden">
                      <Lens zoomFactor={2} lensSize={200}>
                        <video
                          autoPlay
                          muted
                          loop
                          className="w-full h-full object-cover"
                        >
                          <source
                            src="/videos/rat_meme3.mp4"
                            type="video/mp4"
                          />
                        </video>
                      </Lens>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          </motion.div>

          <motion.div
            className="text-left space-y-8"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-4xl font-bold text-green-600 dark:text-green-500 mb-8 font-arcade text-arcade-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Why $IJG?
            </motion.h3>

            <div className="space-y-8">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    x: 10,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <motion.h4
                        className="font-bold text-gray-900 dark:text-white text-xl mb-2 group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors duration-300"
                        whileHover={{
                          textShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
                          transition: { duration: 0.3 },
                        }}
                      >
                        {item.title}
                      </motion.h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="space-y-1">
                        {item.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-400"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.6 + index * 0.1 + idx * 0.05,
                            }}
                            viewport={{ once: true }}
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
