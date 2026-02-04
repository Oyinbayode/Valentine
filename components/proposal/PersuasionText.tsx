"use client";

import { motion, AnimatePresence } from "framer-motion";
import { textVariants } from "@/lib/animations";

interface PersuasionTextProps {
  message: string;
}

export default function PersuasionText({ message }: PersuasionTextProps) {
  return (
    <div className="h-16 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.h2
          key={message}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="font-display text-xl sm:text-2xl md:text-3xl text-[#722f37] text-center px-2 sm:px-4"
        >
          {message}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
}
