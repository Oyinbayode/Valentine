"use client";

import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

interface ConfettiProps {
  isActive: boolean;
}

export default function Confetti({ isActive }: ConfettiProps) {
  const fireConfetti = useCallback(() => {
    // Heart-shaped confetti configuration
    const heartShape = confetti.shapeFromPath({
      path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    });

    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.5,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#f43f5e", "#fda4af", "#881337", "#facc15", "#fb7185"],
    };

    // Initial explosion
    confetti({
      ...defaults,
      particleCount: 100,
      origin: { x: 0.5, y: 0.5 },
      shapes: [heartShape, "circle"],
      scalar: 1.2,
    });

    // Left side burst
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 50,
        origin: { x: 0.2, y: 0.6 },
        shapes: [heartShape],
        scalar: 1,
      });
    }, 200);

    // Right side burst
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 50,
        origin: { x: 0.8, y: 0.6 },
        shapes: [heartShape],
        scalar: 1,
      });
    }, 400);

    // Center top burst
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 75,
        origin: { x: 0.5, y: 0.3 },
        shapes: ["circle", heartShape],
        scalar: 0.8,
      });
    }, 600);

    // Continuous smaller bursts
    const interval = setInterval(() => {
      confetti({
        ...defaults,
        particleCount: 30,
        origin: {
          x: 0.3 + Math.random() * 0.4,
          y: 0.4 + Math.random() * 0.3
        },
        shapes: [heartShape],
        scalar: 0.6,
        startVelocity: 20,
      });
    }, 800);

    // Stop continuous bursts after 4 seconds
    setTimeout(() => {
      clearInterval(interval);
    }, 4000);
  }, []);

  useEffect(() => {
    if (isActive) {
      fireConfetti();
    }
  }, [isActive, fireConfetti]);

  return null;
}
