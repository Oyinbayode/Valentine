"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { celebrationVariants } from "@/lib/animations";
import FloatingPhotos from "@/components/photos/FloatingPhotos";
import HeartIcon, { DoubleHeart, SparkleHeart } from "@/components/icons/HeartIcon";

export default function FinalePage() {
  const router = useRouter();

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
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 35l-1-1C25 30 23 28 23 25c0-2 2-4 4-4 1 0 2 .5 3 1.3.8-.8 1.8-1.3 3-1.3 2 0 4 2 4 4 0 3-2 5-6 9l-1 1z' fill='%23fff' fill-opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <FloatingPhotos />

      <div className="min-h-full flex items-center justify-center py-8 px-3 sm:px-4">
        <div className="max-w-2xl w-full text-center relative z-10 flex flex-col items-center px-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
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

          <h1
            className="font-handwritten text-3xl sm:text-5xl md:text-6xl text-white mb-4"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.2)" }}
          >
            I love you, my dear
          </h1>

          <p className="font-handwritten text-2xl sm:text-3xl text-white/90 mb-8">
            See you on the 14th
          </p>

          <div className="flex justify-center items-center gap-4">
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
          </div>
        </div>
      </div>
    </motion.div>
  );
}
