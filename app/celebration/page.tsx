"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getCelebrationMessage, CELEBRATION_GIF } from "@/lib/constants";
import { celebrationVariants } from "@/lib/animations";
import FloatingPhotos from "@/components/photos/FloatingPhotos";
import Confetti from "@/components/effects/Confetti";
import HeartIcon, { DoubleHeart, SparkleHeart } from "@/components/icons/HeartIcon";

export default function CelebrationPage() {
  const router = useRouter();
  const celebrationMessage = getCelebrationMessage();

  useEffect(() => {
    const accepted = localStorage.getItem("valentine-accepted");
    if (accepted !== "true") {
      router.replace("/");
    }
  }, [router]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{
        background: "linear-gradient(135deg, #722f37 0%, #c41e3a 50%, #dc143c 100%)",
      }}
      initial="hidden"
      animate="visible"
      variants={celebrationVariants}
    >
      <Confetti isActive />

      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 35l-1-1C25 30 23 28 23 25c0-2 2-4 4-4 1 0 2 .5 3 1.3.8-.8 1.8-1.3 3-1.3 2 0 4 2 4 4 0 3-2 5-6 9l-1 1z' fill='%23fff' fill-opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <FloatingPhotos />

      <div className="min-h-full flex items-center justify-center py-8 px-3 sm:px-4">
        <div className="max-w-2xl w-full text-center relative z-10">
          <motion.div
            className="mb-4 sm:mb-6 flex justify-center"
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
            <DoubleHeart size={96} className="text-white/90 hidden sm:block" />
          </motion.div>

          <h1
            className="font-display text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-3 sm:mb-4 px-2"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.2)" }}
          >
            {celebrationMessage.title}
          </h1>

          <p className="font-handwritten text-2xl sm:text-3xl md:text-4xl text-white/90 mb-4 sm:mb-6">
            {celebrationMessage.subtitle}
          </p>

          <div className="mb-6 sm:mb-8">
            <div
              className="inline-block rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-white/20"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
            >
              <img
                src={CELEBRATION_GIF}
                alt="Celebrating"
                className="w-36 h-36 sm:w-48 sm:h-48 object-cover"
              />
            </div>
          </div>

          <button
            onClick={() => router.push("/letter")}
            className="px-8 py-4 bg-white text-[#dc143c] font-body font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 mx-auto"
          >
            Read my letter to you
            <HeartIcon size={20} className="text-[#dc143c]" />
          </button>

          <div className="flex justify-center items-center gap-3 sm:gap-5 mt-6 sm:mt-8">
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
                  <HeartIcon size={i === 2 ? 28 : 20} className="text-white/80" />
                ) : (
                  <SparkleHeart size={24} className="text-[#d4af37]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
