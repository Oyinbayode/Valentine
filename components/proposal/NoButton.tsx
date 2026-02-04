"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const MIN_OPACITY = 0.4;
const ESCAPE_PADDING = 20;
const MAX_ESCAPE_Y = 100;

interface NoButtonProps {
  onClick: () => void;
  scale: number;
  text: string;
  shouldEscape: boolean;
}

export default function NoButton({ onClick, scale, text, shouldEscape }: NoButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getRandomPosition = useCallback(() => {
    if (!containerRef.current || !buttonRef.current) return { x: 0, y: 0 };

    const container = containerRef.current.parentElement;
    if (!container) return { x: 0, y: 0 };

    const containerRect = container.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();

    const maxX = (containerRect.width / 2) - (buttonRect.width / 2) - ESCAPE_PADDING;
    const maxY = MAX_ESCAPE_Y;

    const newX = (Math.random() - 0.5) * 2 * maxX;
    const newY = (Math.random() - 0.5) * 2 * maxY;

    return { x: newX, y: newY };
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (shouldEscape) {
      setPosition(getRandomPosition());
    }
  }, [shouldEscape, getRandomPosition]);

  const handleClick = useCallback(() => {
    onClick();
    if (shouldEscape) {
      setPosition(getRandomPosition());
    }
  }, [onClick, shouldEscape, getRandomPosition]);

  useEffect(() => {
    if (scale < 0.5) {
      setPosition({ x: 0, y: 0 });
    }
  }, [scale]);

  return (
    <div ref={containerRef} className="relative">
      <motion.button
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className="px-6 py-3 sm:px-8 sm:py-4 bg-[#f8e8e8] hover:bg-[#f0d8d8] text-[#722f37] font-body font-semibold text-base sm:text-lg rounded-full transition-colors border border-[#722f37]/10"
        style={{
          boxShadow: "0 2px 8px rgba(114, 47, 55, 0.08)",
        }}
        animate={{
          x: position.x,
          y: position.y,
          scale,
          opacity: Math.max(scale, MIN_OPACITY),
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        whileHover={{
          scale: shouldEscape ? scale : scale * 1.05,
        }}
        whileTap={{
          scale: scale * 0.95,
        }}
      >
        {text}
      </motion.button>
    </div>
  );
}
