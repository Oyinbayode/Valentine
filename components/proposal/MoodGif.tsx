"use client";

import { motion, AnimatePresence } from "framer-motion";
import { gifVariants } from "@/lib/animations";

interface MoodGifProps {
  gifUrl: string;
}

export default function MoodGif({ gifUrl }: MoodGifProps) {
  return (
    <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto relative">
      {/* Decorative frame */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(145deg, #f8e8e8 0%, #fef9f3 100%)",
          boxShadow: "inset 0 2px 4px rgba(114, 47, 55, 0.05), 0 4px 16px rgba(114, 47, 55, 0.08)",
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={gifUrl}
          variants={gifVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-2 rounded-xl overflow-hidden bg-white"
          style={{
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          <img
            src={gifUrl}
            alt="Cute cat"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
