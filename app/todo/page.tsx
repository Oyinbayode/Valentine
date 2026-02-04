"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { celebrationVariants } from "@/lib/animations";
import FloatingPhotos from "@/components/photos/FloatingPhotos";
import ValentineTodo from "@/components/effects/ValentineTodo";
import HeartIcon from "@/components/icons/HeartIcon";

export default function TodoPage() {
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
        <div className="max-w-2xl w-full text-center relative z-10 flex flex-col items-center">
          <ValentineTodo />

          <div className="flex flex-col items-center mt-6 gap-3">
            <button
              onClick={() => router.push("/finale")}
              className="px-8 py-3 bg-white text-[#dc143c] font-body font-semibold rounded-full hover:bg-white/90 transition-colors flex items-center gap-2"
            >
              <HeartIcon size={18} className="text-[#dc143c]" />
              Continue
            </button>
            <button
              onClick={() => router.push("/letter")}
              className="px-4 py-2 bg-white/20 text-white font-body font-medium rounded-full hover:bg-white/30 transition-colors text-sm"
            >
              Re-read letter
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
