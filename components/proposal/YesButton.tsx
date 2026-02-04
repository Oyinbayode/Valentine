"use client";

import { motion } from "framer-motion";
import { buttonHoverVariants } from "@/lib/animations";
import HeartIcon from "@/components/icons/HeartIcon";

interface YesButtonProps {
  onClick: () => void;
  scale: number;
}

export default function YesButton({ onClick, scale }: YesButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="px-6 py-3 sm:px-8 sm:py-4 bg-[#dc143c] hover:bg-[#c41e3a] text-white font-body font-semibold text-base sm:text-lg rounded-full button-glow transition-colors flex items-center gap-2"
      variants={buttonHoverVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      animate={{
        scale,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
    >
      Yes
      <HeartIcon size={18} className="text-white" />
    </motion.button>
  );
}
