"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaInstagram,
  FaTwitter,
  FaDiscord,
  FaEthereum,
  FaCreditCard,
  FaWallet,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Lens } from "@/components/ui/lens";
import { BackgroundLines } from "@/components/ui/background-lines";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { GalleryShowcase } from "@/components/ui/gallery-showcase";
import { placeholderVideos } from "@/data/gallery-data";
import { CallToAction } from "@/components/ui/call-to-action";
import { Footer } from "@/components/ui/floating-dock";
import { SiSolana } from "react-icons/si";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ethAmount, setEthAmount] = useState("0.003");
  const [tokenAmount, setTokenAmount] = useState("66,420.00");
  const [leftVideoPlaying, setLeftVideoPlaying] = useState(false);
  const [rightVideoPlaying, setRightVideoPlaying] = useState(false);
  const [leftVideoVolume, setLeftVideoVolume] = useState(0.7);
  const [rightVideoVolume, setRightVideoVolume] = useState(0.7);
  const [leftVideoMuted, setLeftVideoMuted] = useState(true);
  const [rightVideoMuted, setRightVideoMuted] = useState(true);
  const [showAudioModal, setShowAudioModal] = useState(true);
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);

  const videos = [
    "/videos/rat_meme1.mp4",
    "/videos/rat_meme2.mp4",
    "/videos/rat_meme3.mp4",
    "/videos/rat_meme4.mp4",
    "/videos/rat_meme5.mp4",
    "/videos/rat_meme6.mp4",
    "/videos/rat_meme7.mp4",
    "/videos/rat_meme8.mp4",
    "/videos/rat_meme9.mp4",
  ];

  const totalRaised = 100000;
  const goal = 1000000;
  const progress = (totalRaised / goal) * 100;
  const currentPrice = 0.0003;
  const nextPrice = 0.0004;

  const handleBuy = () => {
    toast.success("🐀 Rat tokens purchased! Welcome to the party!");
  };

  const toggleLeftVideoPlay = () => {
    if (leftVideoRef.current) {
      if (leftVideoPlaying) {
        leftVideoRef.current.pause();
      } else {
        leftVideoRef.current.play();
      }
      setLeftVideoPlaying(!leftVideoPlaying);
    }
  };

  const toggleRightVideoPlay = () => {
    if (rightVideoRef.current) {
      if (rightVideoPlaying) {
        rightVideoRef.current.pause();
      } else {
        rightVideoRef.current.play();
      }
      setRightVideoPlaying(!rightVideoPlaying);
    }
  };

  const handleLeftVideoVolumeChange = (newVolume: number) => {
    setLeftVideoVolume(newVolume);
    if (leftVideoRef.current) {
      leftVideoRef.current.volume = newVolume;
      if (newVolume === 0) {
        setLeftVideoMuted(true);
        leftVideoRef.current.muted = true;
      } else {
        if (leftVideoMuted) {
          setLeftVideoMuted(false);
          leftVideoRef.current.muted = false;
        }
      }
    }
  };

  const handleRightVideoVolumeChange = (newVolume: number) => {
    setRightVideoVolume(newVolume);
    if (rightVideoRef.current) {
      rightVideoRef.current.volume = newVolume;
      if (newVolume === 0) {
        setRightVideoMuted(true);
        rightVideoRef.current.muted = true;
      } else {
        if (rightVideoMuted) {
          setRightVideoMuted(false);
          rightVideoRef.current.muted = false;
        }
      }
    }
  };

  const handleLeftVideoMuteToggle = () => {
    if (leftVideoRef.current) {
      const newMutedState = !leftVideoMuted;
      setLeftVideoMuted(newMutedState);
      leftVideoRef.current.muted = newMutedState;

      if (!newMutedState && leftVideoVolume === 0) {
        const newVolume = 0.5;
        setLeftVideoVolume(newVolume);
        leftVideoRef.current.volume = newVolume;
      }
    }
  };

  const handleRightVideoMuteToggle = () => {
    if (rightVideoRef.current) {
      const newMutedState = !rightVideoMuted;
      setRightVideoMuted(newMutedState);
      rightVideoRef.current.muted = newMutedState;

      if (!newMutedState && rightVideoVolume === 0) {
        const newVolume = 0.5;
        setRightVideoVolume(newVolume);
        rightVideoRef.current.volume = newVolume;
      }
    }
  };

  const enableAudio = () => {
    if (leftVideoRef.current) {
      leftVideoRef.current
        .play()
        .then(() => {
          setLeftVideoPlaying(true);
          leftVideoRef.current!.muted = true;
          leftVideoRef.current!.volume = 0;
        })
        .catch(console.log);
    }

    if (rightVideoRef.current) {
      rightVideoRef.current
        .play()
        .then(() => {
          setRightVideoPlaying(true);
          rightVideoRef.current!.muted = false;
          rightVideoRef.current!.volume = 0.7;
          setRightVideoVolume(0.7);
          setRightVideoMuted(false);
          setShowAudioModal(false);
        })
        .catch(console.log);
    }
  };

  return (
    <BackgroundLines
      className="w-full text-gray-900 dark:text-gray-100 relative min-h-screen bg-gray-50"
      lineColor="rgb(34, 197, 94)"
      lineWidth={1}
      lineCount={30}
      animationDuration={12}
      interactive={true}
    >
      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Scrolling Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-2 overflow-hidden relative z-20 shadow-lg">
          <div className="animate-marquee whitespace-nowrap text-sm font-bold font-arcade">
            <span className="mx-8">
              RODOLFO THE RAT IS THE NEXT BIG THING IN CRYPTO
            </span>
            <span className="mx-8">
              RODOLFO THE RAT IS HERE TO RULE THE MEME WORLD
            </span>
            <span className="mx-8">DON'T MISS OUT ON THE FUN AND REWARDS</span>
            <span className="mx-8">GET READY FOR THE RODOLFO REVOLUTION</span>
          </div>
        </div>

        {/* Main Header */}
        <header className="bg-gradient-to-r from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600 px-4 py-3 flex items-center justify-between shadow-xl relative z-20 transition-all duration-300">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-emerald-200 dark:hover:text-emerald-200 transition-colors hover:scale-110 transform duration-200"
          >
            <FaBars size={24} />
          </button>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <a
              href="#"
              className="text-white hover:text-emerald-200 dark:hover:text-emerald-200 transition-colors hover:scale-110 transform duration-200"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-white hover:text-emerald-200 dark:hover:text-emerald-200 transition-colors hover:scale-110 transform duration-200"
            >
              <FaDiscord size={20} />
            </a>
            <a
              href="#"
              className="text-white hover:text-emerald-200 dark:hover:text-emerald-200 transition-colors hover:scale-110 transform duration-200"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-24 left-0 w-64 bg-gray-900 dark:bg-gray-800 text-white p-4 z-50 rounded-br-lg shadow-2xl animate-pulse border border-emerald-500/30">
            <nav className="space-y-4">
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-emerald-400 transition-colors hover:translate-x-2 transform duration-200"
              >
                About
              </a>
              <a
                href="#tokenomics"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-emerald-400 transition-colors hover:translate-x-2 transform duration-200"
              >
                Tokenomics
              </a>
              <a
                href="#roadmap"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-emerald-400 transition-colors hover:translate-x-2 transform duration-200"
              >
                Roadmap
              </a>
              <a
                href="#community"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-emerald-400 transition-colors hover:translate-x-2 transform duration-200"
              >
                Community
              </a>
            </nav>
          </div>
        )}

        {/* Main Content - Hero Section */}
        <section className="relative py-4 sm:py-6 lg:py-8 min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh] flex items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4 sm:gap-6 items-center max-w-7xl mx-auto px-4 sm:px-6">
            {/* Left Side - Dancing Rat Video */}
            <motion.div
              className="hidden md:block md:col-span-4 lg:col-span-3 order-2 md:order-1"
              initial={{ opacity: 0, x: -100, rotateY: -90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
            >
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] group">
                <motion.video
                  ref={leftVideoRef}
                  muted={true}
                  loop
                  playsInline
                  className="w-full h-full object-cover rounded-lg shadow-2xl border-2 sm:border-4 border-emerald-500 dark:border-emerald-400 group-hover:scale-105 transition-transform duration-300"
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    transition: { duration: 0.3 },
                  }}
                  onPlay={() => setLeftVideoPlaying(true)}
                  onPause={() => setLeftVideoPlaying(false)}
                  onLoadedData={() => {
                    if (leftVideoRef.current) {
                      leftVideoRef.current.muted = true;
                      leftVideoRef.current.volume = 0;
                      setLeftVideoPlaying(false);
                    }
                  }}
                >
                  <source src={videos[0]} type="video/mp4" />
                </motion.video>

                {/* Video Controls */}
                <div className="absolute top-2 left-2 flex items-center space-x-2">
                  {/* Play/Pause Button */}
                  <button
                    onClick={toggleLeftVideoPlay}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    {leftVideoPlaying ? (
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
                    ) : (
                      <div className="w-0 h-0 border-l-[4px] sm:border-l-[6px] border-l-white border-t-[3px] sm:border-t-[4px] border-t-transparent border-b-[3px] sm:border-b-[4px] border-b-transparent ml-0.5"></div>
                    )}
                  </button>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-2 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1">
                    <button
                      onClick={handleLeftVideoMuteToggle}
                      className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-white hover:text-emerald-400 transition-colors duration-200"
                    >
                      {leftVideoMuted ? (
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
                      ) : (
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
                      )}
                    </button>
                    <div className="w-12 sm:w-16 h-1 sm:h-1.5 bg-white/30 rounded-full relative">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={leftVideoMuted ? 0 : leftVideoVolume}
                        onChange={(e) =>
                          handleLeftVideoVolumeChange(
                            parseFloat(e.target.value)
                          )
                        }
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div
                        className="h-full bg-emerald-400 rounded-full transition-all duration-200"
                        style={{
                          width: `${
                            (leftVideoMuted ? 0 : leftVideoVolume) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Video Label */}
                <div className="absolute -bottom-2 -right-2 bg-emerald-600 dark:bg-emerald-700 text-white px-2 py-1 rounded text-xs font-bold shadow-lg">
                  LIVE DANCE
                </div>
              </div>
            </motion.div>

            {/* Center - Buy Section */}
            <motion.div
              className="md:col-span-8 lg:col-span-6 relative z-20 order-1 md:order-2"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Compact Buy Card */}
              <div className="relative group">
                <div className="relative backdrop-blur-sm bg-gradient-to-br from-gray-900/95 to-gray-800/95 dark:from-gray-800/95 dark:to-gray-900/95 text-white p-4 sm:p-6 rounded-xl shadow-2xl border border-emerald-500/30">
                  {/* Header */}
                  <div className="text-center mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-black text-emerald-400 mb-2 font-arcade text-arcade-shadow">
                      BUY $RAT NOW!
                    </h2>
                  </div>

                  {/* Progress */}
                  <div className="mb-4 sm:mb-6">
                    <div className="text-center mb-3">
                      <p className="text-2xl sm:text-3xl font-black text-emerald-400">
                        ${totalRaised.toLocaleString()}
                      </p>
                      <p className="text-gray-300 text-xs sm:text-sm">
                        Goal: ${goal.toLocaleString()}
                      </p>
                    </div>

                    <div className="w-full bg-gray-700 dark:bg-gray-600 rounded-full h-2 mb-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-center text-emerald-400 font-bold text-xs sm:text-sm">
                      {progress.toFixed(1)}%
                    </p>
                  </div>

                  {/* Price Info */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="text-center p-2 sm:p-3 bg-gray-800/70 rounded-lg border border-gray-700">
                      <p className="text-gray-300 text-xs mb-1">
                        CURRENT PRICE
                      </p>
                      <p className="text-emerald-400 font-bold text-sm sm:text-base">
                        ${currentPrice}
                      </p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-gray-800/70 rounded-lg border border-gray-700">
                      <p className="text-gray-300 text-xs mb-1">
                        CURRENT MARKET CAP
                      </p>
                      <p className="text-emerald-400 font-bold text-sm sm:text-base">
                        ${nextPrice}
                      </p>
                    </div>
                  </div>

                  {/* Network Selection */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button className="flex-1 p-2 sm:p-3 bg-emerald-600/20 border border-emerald-500/50 rounded-lg text-emerald-400 text-xs sm:text-sm font-medium hover:bg-emerald-600/30 transition-colors">
                        <SiSolana className="inline mr-2" />
                        SOLANA
                      </button>
                    </div>
                  </div>

                  {/* Transaction Inputs */}
                  <div className="space-y-3 mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 bg-gray-800/70 rounded-lg border border-gray-700">
                      <label className="text-gray-300 text-xs block mb-1">
                        YOU PAY
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="0.003"
                          value={ethAmount}
                          onChange={(e) => setEthAmount(e.target.value)}
                          className="flex-1 bg-transparent text-white text-base sm:text-lg font-bold outline-none"
                        />
                        <span className="text-emerald-400 text-xs sm:text-sm">
                          SOL
                        </span>
                      </div>
                    </div>

                    <div className="p-2 sm:p-3 bg-gray-800/70 rounded-lg border border-gray-700">
                      <label className="text-gray-300 text-xs block mb-1">
                        YOU RECEIVE
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className="flex-1 text-white text-base sm:text-lg font-bold">
                          {tokenAmount}
                        </span>
                        <span className="text-emerald-400 text-xs sm:text-sm">
                          RAT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      onClick={handleBuy}
                      className="w-full p-2 sm:p-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-lg shadow-lg text-sm sm:text-base hover:from-emerald-600 hover:to-green-700 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaWallet className="inline mr-2" />
                      BUY NOW!
                    </motion.button>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Dancing Rat Video */}
            <motion.div
              className="hidden md:block md:col-span-4 lg:col-span-3 order-3"
              initial={{ opacity: 0, x: 100, rotateY: 90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
            >
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] group">
                <motion.video
                  ref={rightVideoRef}
                  muted={true}
                  loop
                  playsInline
                  className="w-full h-full object-cover rounded-lg shadow-2xl border-2 sm:border-4 border-emerald-500 dark:border-emerald-400 group-hover:scale-105 transition-transform duration-300"
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    transition: { duration: 0.3 },
                  }}
                  onPlay={() => setRightVideoPlaying(true)}
                  onPause={() => setRightVideoPlaying(false)}
                  onLoadedData={() => {
                    if (rightVideoRef.current) {
                      rightVideoRef.current.muted = true;
                      rightVideoRef.current.volume = 0;
                      setRightVideoPlaying(false);
                    }
                  }}
                >
                  <source src={videos[2]} type="video/mp4" />
                </motion.video>

                {/* Video Controls */}
                <div className="absolute top-2 left-2 flex items-center space-x-2">
                  {/* Play/Pause Button */}
                  <button
                    onClick={toggleRightVideoPlay}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    {rightVideoPlaying ? (
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
                    ) : (
                      <div className="w-0 h-0 border-l-[4px] sm:border-l-[6px] border-l-white border-t-[3px] sm:border-t-[4px] border-t-transparent border-b-[3px] sm:border-b-[4px] border-b-transparent ml-0.5"></div>
                    )}
                  </button>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-2 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1">
                    <button
                      onClick={handleRightVideoMuteToggle}
                      className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-white hover:text-emerald-400 transition-colors duration-200"
                    >
                      {rightVideoMuted ? (
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
                      ) : (
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
                      )}
                    </button>
                    <div className="w-12 sm:w-16 h-1 sm:h-1.5 bg-white/30 rounded-full relative">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={rightVideoMuted ? 0 : rightVideoVolume}
                        onChange={(e) =>
                          handleRightVideoVolumeChange(
                            parseFloat(e.target.value)
                          )
                        }
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div
                        className="h-full bg-emerald-400 rounded-full transition-all duration-200"
                        style={{
                          width: `${
                            (rightVideoMuted ? 0 : rightVideoVolume) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Video Label */}
                <div className="absolute -bottom-2 -left-2 bg-emerald-600 dark:bg-emerald-700 text-white px-2 py-1 rounded text-xs font-bold shadow-lg">
                  PARTY TIME
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Large Text */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 hidden lg:flex w-full justify-center items-center">
            <h1 className="text-6xl lg:text-8xl font-black tracking-wider text-gray-900 dark:text-white opacity-90 select-none transition-colors duration-300 font-arcade text-arcade-shadow">
              RODOLFO THE RAT
            </h1>
          </div>

          {/* Mobile Bottom Text */}
          <div className="lg:hidden text-center mt-6 sm:mt-8">
            <h1 className="text-3xl sm:text-4xl font-black tracking-wider text-gray-900 dark:text-white opacity-90 transition-colors duration-300 font-arcade text-arcade-shadow">
              RODOLFO THE RAT
            </h1>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen py-8 px-4 relative mt-40">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-6xl md:text-8xl font-black text-emerald-600 dark:text-emerald-500 mb-8 font-arcade text-arcade-shadow"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 30px rgba(16, 185, 129, 0.8)",
                  transition: { duration: 0.3 },
                }}
              >
                ABOUT RODOLFO
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                TikTok was too small! <br /> Now the king of dance rules
                memecoins!
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
                    className="text-3xl font-bold text-emerald-600 dark:text-emerald-500 mb-4 font-arcade text-arcade-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    WANNA SEE THE MOVES?
                  </motion.h3>
                  <motion.p
                    className="text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Hover like a degen and watch the dance pop!
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
                  className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 mb-8 font-arcade text-arcade-shadow"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Why $RAT?
                </motion.h3>

                <div className="space-y-8">
                  {[
                    {
                      title: "Community Driven",
                      description:
                        "Built by the community, for the community. Every rat has a voice!",
                      features: [
                        "CTO Governance",
                        "Community Voting",
                        "Transparent Development",
                      ],
                    },
                    {
                      title: "Entertainment First",
                      description:
                        "Forget boring memes. We're pumping vibes, & dance moves!",
                      features: [
                        "Community Airdrops",
                        "Dance Challenges",
                        "Viral Marketing",
                      ],
                    },
                    {
                      title: "Moon Mission",
                      description:
                        "One tiny step for a rat, one giant dance move for memecoins!",
                      features: [
                        "Strategic Partnerships",
                        "Exchange Listings",
                        "Mass Adoption",
                      ],
                    },
                  ].map((item, index) => (
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
                            className="font-bold text-gray-900 dark:text-white text-xl mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors duration-300"
                            whileHover={{
                              textShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
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
                                className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-500"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.4,
                                  delay: 0.6 + index * 0.1 + idx * 0.05,
                                }}
                                viewport={{ once: true }}
                              >
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
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

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <motion.h2
                className="text-6xl font-black text-gray-900 dark:text-white mb-6 font-arcade text-arcade-shadow"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                RODOLFO VIDEO GALLERY
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Explore our amazing collection of dancing rat videos! Each video
                comes to life with stunning 3D effects and interactive
                animations.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <GalleryShowcase videos={placeholderVideos} />
            </motion.div>
          </div>
        </section>

        <CallToAction />
        <Footer />

        {showAudioModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-gradient-to-br from-emerald-500 to-green-600 p-8 rounded-2xl shadow-2xl text-center max-w-md mx-auto"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              <h3 className="text-2xl font-black text-white mb-4 font-arcade text-arcade-shadow">
                START VIDEO WITH AUDIO!
              </h3>
              <p className="text-white/90 mb-6 text-lg">
                Click here to start the dance and enjoy the music!
              </p>
              <motion.button
                onClick={enableAudio}
                className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                LET'S DANCE!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </BackgroundLines>
  );
}
