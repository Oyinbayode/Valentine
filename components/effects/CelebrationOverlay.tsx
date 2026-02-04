"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { domToPng } from "modern-screenshot";
import {
  getCelebrationMessage,
  LOVE_LETTER,
  CELEBRATION_GIF,
  CONFIG,
} from "@/lib/constants";
import {
  celebrationVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";
import PhotoCarousel from "@/components/photos/PhotoCarousel";
import FloatingPhotos from "@/components/photos/FloatingPhotos";
import TypingAnimation from "./TypingAnimation";
import ValentineTodo from "./ValentineTodo";
import HeartIcon, {
  DoubleHeart,
  SparkleHeart,
} from "@/components/icons/HeartIcon";

interface CelebrationOverlayProps {
  isVisible: boolean;
}

type ViewState = "celebration" | "letter" | "todo" | "finale";

export default function CelebrationOverlay({
  isVisible,
}: CelebrationOverlayProps) {
  const celebrationMessage = getCelebrationMessage();
  const [currentView, setCurrentView] = useState<ViewState>("celebration");
  const [letterComplete, setLetterComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const letterTextRef = useRef<HTMLDivElement>(null);

  const handleSaveAsImage = useCallback(async () => {
    if (!letterTextRef.current) return;

    setIsSaving(true);
    try {
      const dataUrl = await domToPng(letterTextRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `love-letter-to-${CONFIG.valentineName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error saving image:", error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const goToView = (view: ViewState) => {
    if (view === "celebration") {
      setLetterComplete(false);
    }
    setCurrentView(view);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{
        background:
          "linear-gradient(135deg, #722f37 0%, #c41e3a 50%, #dc143c 100%)",
      }}
      initial="hidden"
      animate="visible"
      variants={celebrationVariants}
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 35l-1-1C25 30 23 28 23 25c0-2 2-4 4-4 1 0 2 .5 3 1.3.8-.8 1.8-1.3 3-1.3 2 0 4 2 4 4 0 3-2 5-6 9l-1 1z' fill='%23fff' fill-opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <FloatingPhotos />

      <div className="min-h-full flex items-center justify-center py-8 px-3 sm:px-4">
        <motion.div
          className="max-w-2xl w-full text-center relative z-10"
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {currentView === "celebration" && (
              <motion.div
                key="celebration"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
              <motion.div
                className="mb-4 sm:mb-6 flex justify-center"
                variants={staggerItemVariants}
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              >
                <DoubleHeart size={64} className="text-white/90 sm:hidden" />
                <DoubleHeart
                  size={96}
                  className="text-white/90 hidden sm:block"
                />
              </motion.div>

              <motion.h1
                className="font-display text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-3 sm:mb-4 px-2"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.2)" }}
                variants={staggerItemVariants}
              >
                {celebrationMessage.title}
              </motion.h1>

              <motion.p
                className="font-handwritten text-2xl sm:text-3xl md:text-4xl text-white/90 mb-4 sm:mb-6"
                variants={staggerItemVariants}
              >
                {celebrationMessage.subtitle}
              </motion.p>

              <motion.div
                className="mb-6 sm:mb-8"
                variants={staggerItemVariants}
              >
                <div
                  className="inline-block rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-white/20"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
                >
                  <img
                    src={CELEBRATION_GIF}
                    alt="Celebrating cat"
                    className="w-36 h-36 sm:w-48 sm:h-48 object-cover"
                  />
                </div>
              </motion.div>

              <motion.button
                variants={staggerItemVariants}
                onClick={() => goToView("letter")}
                className="px-8 py-4 bg-white text-[#dc143c] font-body font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 mx-auto"
              >
                Read my letter to you
                <HeartIcon size={20} className="text-[#dc143c]" />
              </motion.button>

              <motion.div
                className="flex justify-center items-center gap-3 sm:gap-5 mt-6 sm:mt-8"
                variants={staggerItemVariants}
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -8, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.15,
                      repeat: Infinity,
                    }}
                  >
                    {i % 2 === 0 ? (
                      <HeartIcon
                        size={i === 2 ? 28 : 20}
                        className="text-white/80"
                      />
                    ) : (
                      <SparkleHeart size={24} className="text-[#d4af37]" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
              </motion.div>
            )}

            {currentView === "letter" && (
              <motion.div
                key="letter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 sm:p-8 max-h-[80vh] overflow-y-auto celebration-scroll"
                style={{
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                }}
              >
                {/* Letter text - this is what gets saved as image */}
                <div ref={letterTextRef} className="bg-white p-4 rounded-xl">
                  <TypingAnimation
                    text={LOVE_LETTER}
                    speed={50}
                    className="font-handwritten text-lg sm:text-xl md:text-2xl text-[#722f37] text-left leading-relaxed"
                    onComplete={() => setLetterComplete(true)}
                  />
                </div>

                {letterComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 pt-6 border-t border-[#dc143c]/20"
                  >
                    <p className="font-handwritten text-xl text-[#dc143c] text-center mb-6">
                      See us looking cute 🥰
                    </p>
                    <PhotoCarousel />

                    <div className="flex flex-col sm:flex-row justify-center mt-6 gap-3">
                      <button
                        onClick={handleSaveAsImage}
                        disabled={isSaving}
                        className="px-6 py-3 bg-[#722f37] text-white font-body font-semibold rounded-full hover:bg-[#5a252c] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isSaving ? (
                          "Saving..."
                        ) : (
                          <>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Save Letter
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => goToView("todo")}
                        className="px-6 py-3 bg-[#dc143c] text-white font-body font-semibold rounded-full hover:bg-[#c41e3a] transition-colors flex items-center justify-center gap-2"
                      >
                        <HeartIcon size={18} className="text-white" />
                        Continue
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
              </motion.div>
            )}

            {currentView === "todo" && (
              <motion.div
                key="todo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
              <ValentineTodo />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center mt-6 gap-3"
              >
                <button
                  onClick={() => goToView("finale")}
                  className="px-8 py-3 bg-white text-[#dc143c] font-body font-semibold rounded-full hover:bg-white/90 transition-colors flex items-center gap-2"
                >
                  <HeartIcon size={18} className="text-[#dc143c]" />
                  Continue
                </button>
                <button
                  onClick={() => goToView("letter")}
                  className="px-4 py-2 bg-white/20 text-white font-body font-medium rounded-full hover:bg-white/30 transition-colors text-sm"
                >
                  Re-read letter
                </button>
              </motion.div>
              </motion.div>
            )}

            {currentView === "finale" && (
              <motion.div
                key="finale"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center px-4"
              >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-6"
              >
                <DoubleHeart size={80} className="text-white sm:hidden" />
                <DoubleHeart size={120} className="text-white hidden sm:block" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-handwritten text-3xl sm:text-5xl md:text-6xl text-white mb-4"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.2)" }}
              >
                I love you, my dear
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-handwritten text-2xl sm:text-3xl text-white/90 mb-8"
              >
                See you on the 14th
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex justify-center items-center gap-4"
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  >
                    {i % 2 === 0 ? (
                      <HeartIcon size={i === 2 ? 32 : 24} className="text-white/80" />
                    ) : (
                      <SparkleHeart size={28} className="text-[#d4af37]" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
