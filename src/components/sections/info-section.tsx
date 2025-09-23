"use client";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaLock,
  FaChartLine,
  FaCog,
  FaInfinity,
  FaStar,
} from "react-icons/fa";
import { MdAutorenew } from "react-icons/md";

export function InfoSection() {
  const levels = [
    {
      level: 1,
      range: "$0 – $25k",
      color: "from-blue-400 to-green-400",
      icon: FaRocket,
    },
    {
      level: 2,
      range: "$25k – $50k",
      color: "from-green-400 to-blue-500",
      icon: FaChartLine,
    },
    {
      level: 3,
      range: "$50k – $75k",
      color: "from-blue-500 to-green-500",
      icon: FaCog,
    },
    {
      level: 4,
      range: "$75k – $100k",
      color: "from-green-500 to-blue-600",
      icon: FaInfinity,
    },
    {
      level: 5,
      range: "$100k+",
      color: "from-blue-600 to-purple-500",
      icon: FaStar,
    },
    {
      level: 6,
      range: "$500k+",
      color: "from-purple-500 to-pink-500",
      icon: FaStar,
      special: true,
    },
  ];

  const features = [
    {
      icon: <MdAutorenew className="w-8 h-8" />,
      title: "Auto-Buyback Mechanism",
      description: "All creator fees automatically reinvested into the token",
      color: "text-green-500",
    },
    {
      icon: <FaLock className="w-8 h-8" />,
      title: "Lock System",
      description: "Ensures constant buy pressure and long-term sustainability",
      color: "text-blue-500",
    },
    {
      icon: <FaInfinity className="w-8 h-8" />,
      title: "Self-Sustaining",
      description: "Token strength increases the longer it exists",
      color: "text-purple-500",
    },
  ];

  return (
    <section id="info" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-green-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-purple-400 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 font-arcade text-arcade-shadow"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 bg-clip-text text-transparent">
              THE INFINITE REVOLUTION
            </span>
          </motion.h2>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-green-500/30 rounded-full text-green-600 dark:text-green-400 text-sm font-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FaInfinity className="w-4 h-4 animate-spin" />
            Next-Generation Auto-Buyback Token
          </motion.div>
        </motion.div>

        {/* Main Description */}
        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-black/10 backdrop-blur-md dark:bg-black/20 rounded-2xl p-8 border border-blue-500/20 shadow-2xl">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
              <strong className="text-blue-600 dark:text-blue-400">
                Infinity Jewish Glitch (IJG)
              </strong>{" "}
              is a next-generation token designed with an innovative
              <span className="text-green-600 dark:text-green-400 font-semibold">
                {" "}
                auto-buyback and lock mechanism
              </span>
              . Unlike traditional tokens, all creator fees are automatically
              collected and reinvested into the token itself, ensuring{" "}
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                constant buy pressure and long-term sustainability
              </span>
              .
            </p>

            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
              The project is built around the journey of{" "}
              <strong className="text-blue-600 dark:text-blue-400">Alon</strong>
              , its founder, who began his career in blockchain development and
              now channels his vision into IJG. As the market cap grows, Alon
              and the token advance through{" "}
              <span className="text-green-600 dark:text-green-400 font-semibold">
                six milestone levels
              </span>
              .
            </p>

            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <strong className="text-purple-600 dark:text-purple-400">
                Infinity Jewish Glitch
              </strong>{" "}
              aims to create a
              <span className="text-green-600 dark:text-green-400 font-semibold">
                {" "}
                self-sustaining, community-driven asset
              </span>{" "}
              where the token's strength increases the longer it exists.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-black/10 backdrop-blur-md dark:bg-black/20 rounded-xl p-6 border border-blue-500/20 hover:border-green-500/40 transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className={`${feature.color} mb-4 gtransition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
