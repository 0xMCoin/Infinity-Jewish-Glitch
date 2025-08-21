"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaWallet } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { toast } from "react-hot-toast";
import { VideoPlayer } from "../ui/video-player";

interface HeroSectionProps {
  totalRaised: number;
  goal: number;
  currentPrice: number;
  nextPrice: number;
}

export function HeroSection({
  totalRaised,
  goal,
  currentPrice,
  nextPrice,
}: HeroSectionProps) {
  const [ethAmount, setEthAmount] = useState("0.003");
  const [tokenAmount, setTokenAmount] = useState("66,420.00");

  const progress = (totalRaised / goal) * 100;

  const handleBuy = () => {
    toast.success("🐀 Rat tokens purchased! Welcome to the party!");
  };

  const videos = [
    "/videos/rat_meme1.mp4",
    "/videos/rat_meme2.mp4",
    "/videos/rat_meme3.mp4",
  ];

  return (
    <section className="relative py-4 sm:py-6 lg:py-8 min-h-[70vh] sm:min-h-[75vh] lg:min-h-screen flex flex-col items-center justify-center">
      {/* Desktop Layout */}
      <div className="hidden md:grid w-full grid-cols-12 gap-4 sm:gap-6 items-center max-w-7xl mx-auto px-4 sm:px-6">
        {/* Left Side - Dancing Rat Video */}
        <motion.div
          className="md:col-span-4 lg:col-span-3"
          initial={{ opacity: 0, x: -100, rotateY: -90 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          <VideoPlayer
            videoSrc={videos[0]}
            label="LIVE DANCE"
            labelPosition="bottom-right"
          />
        </motion.div>

        {/* Center - Buy Section */}
        <motion.div
          className="md:col-span-8 lg:col-span-6 relative z-20"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <BuyCard
            totalRaised={totalRaised}
            goal={goal}
            progress={progress}
            currentPrice={currentPrice}
            nextPrice={nextPrice}
            ethAmount={ethAmount}
            setEthAmount={setEthAmount}
            tokenAmount={tokenAmount}
            onBuy={handleBuy}
          />
        </motion.div>

        {/* Right Side - Dancing Rat Video */}
        <motion.div
          className="md:col-span-4 lg:col-span-3"
          initial={{ opacity: 0, x: 100, rotateY: 90 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          <VideoPlayer
            videoSrc={videos[2]}
            label="PARTY TIME"
            labelPosition="bottom-left"
          />
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full max-w-7xl mx-auto mt-20 px-4 sm:px-6 flex flex-col items-center space-y-6">
        {/* Mobile Video Section */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <VideoPlayer
            videoSrc={videos[1]}
            label="MOBILE PARTY"
            labelPosition="bottom-right"
          />
        </motion.div>

        {/* Mobile Buy Section */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <BuyCard
            totalRaised={totalRaised}
            goal={goal}
            progress={progress}
            currentPrice={currentPrice}
            nextPrice={nextPrice}
            ethAmount={ethAmount}
            setEthAmount={setEthAmount}
            tokenAmount={tokenAmount}
            onBuy={handleBuy}
          />
        </motion.div>
      </div>

      {/* Bottom Large Text - Desktop Only */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 hidden lg:flex w-full justify-center items-center">
        <h1 className="text-6xl lg:text-8xl font-black tracking-wider text-gray-900 dark:text-white opacity-90 select-none transition-colors duration-300 font-arcade text-arcade-shadow">
          RODOLFO THE RAT
        </h1>
      </div>

      {/* Mobile Bottom Text */}
      <div className="lg:hidden text-center mt-6 sm:mt-8">
        <h1 className="text-5xl sm:text-4xl font-black tracking-wider text-gray-900 dark:text-white opacity-90 transition-colors duration-300 font-arcade text-arcade-shadow">
          RODOLFO THE RAT
        </h1>
      </div>
    </section>
  );
}

interface BuyCardProps {
  totalRaised: number;
  goal: number;
  progress: number;
  currentPrice: number;
  nextPrice: number;
  ethAmount: string;
  setEthAmount: (value: string) => void;
  tokenAmount: string;
  onBuy: () => void;
}

function BuyCard({
  totalRaised,
  goal,
  progress,
  currentPrice,
  nextPrice,
  ethAmount,
  setEthAmount,
  tokenAmount,
  onBuy,
}: BuyCardProps) {
  return (
    <div className="relative group">
      <div className="relative bg-black/10 backdrop-blur-md dark:bg-black/20 dark:text-white p-4 sm:p-6 rounded-xl shadow-2xl border border-emerald-500/30">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mb-2 font-arcade text-arcade-shadow">
            BUY $RAT NOW!
          </h2>
        </div>

        {/* Progress */}
        <div className="mb-4 sm:mb-6">
          <div className="text-center mb-3">
            <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
              ${totalRaised.toLocaleString()}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
              Goal: ${goal.toLocaleString()}
            </p>
          </div>

          <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2 mb-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm">
            {progress.toFixed(1)}%
          </p>
        </div>

        {/* Price Info */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="text-center p-2 sm:p-3 bg-gray-100 dark:bg-gray-800/70 rounded-lg border border-gray-300 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 text-xs mb-1">
              CURRENT PRICE
            </p>
            <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm sm:text-base">
              ${currentPrice}
            </p>
          </div>
          <div className="text-center p-2 sm:p-3 bg-gray-100 dark:bg-gray-800/70 rounded-lg border border-gray-300 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 text-xs mb-1">
              CURRENT MARKET CAP
            </p>
            <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm sm:text-base">
              ${nextPrice}
            </p>
          </div>
        </div>

        {/* Network Selection */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button className="flex-1 p-2 sm:p-3 bg-emerald-100 dark:bg-emerald-600/20 border border-emerald-300 dark:border-emerald-500/50 rounded-lg text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-600/30 transition-colors">
              <SiSolana className="inline mr-2" />
              SOLANA
            </button>
          </div>
        </div>

        {/* Transaction Inputs */}
        <div className="space-y-3 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-gray-100 dark:bg-gray-800/70 rounded-lg border border-gray-300 dark:border-gray-700">
            <label className="text-gray-700 dark:text-gray-300 text-xs block mb-1">
              YOU PAY
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="0.003"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
                className="flex-1 bg-transparent text-gray-900 dark:text-white text-base sm:text-lg font-bold outline-none"
              />
              <span className="text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
                SOL
              </span>
            </div>
          </div>

          <div className="p-2 sm:p-3 bg-gray-100 dark:bg-gray-800/70 rounded-lg border border-gray-300 dark:border-gray-700">
            <label className="text-gray-700 dark:text-gray-300 text-xs block mb-1">
              YOU RECEIVE
            </label>
            <div className="flex items-center space-x-2">
              <span className="flex-1 text-gray-900 dark:text-white text-base sm:text-lg font-bold">
                {tokenAmount}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
                RAT
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <motion.button
            onClick={onBuy}
            className="w-full p-2 sm:p-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-lg shadow-lg text-sm sm:text-base hover:from-emerald-600 hover:to-green-700 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaWallet className="inline mr-2" />
            BUY NOW!
          </motion.button>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-3 right-3 w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-green-600 dark:bg-green-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
