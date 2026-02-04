"use client";

import { useState, useEffect } from "react";

interface HeartData {
  id: number;
  left: string;
  top: string;
  size: number;
  animationDelay: string;
  animationDuration: string;
  opacity: number;
  rotation: number;
}

interface HeartProps {
  style: React.CSSProperties;
  size: number;
  animationDelay: string;
  animationDuration: string;
  rotation: number;
}

function Heart({ style, size, animationDelay, animationDuration, rotation }: HeartProps) {
  return (
    <div
      className="floating-heart absolute pointer-events-none"
      style={{
        ...style,
        animationDelay,
        animationDuration,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-[#dc143c]"
        style={{ opacity: 0.15 }}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartData[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const generatedHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 14 + Math.random() * 20,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${8 + Math.random() * 6}s`,
      opacity: 0.1 + Math.random() * 0.15,
      rotation: Math.random() * 30 - 15,
    }));
    setHearts(generatedHearts);
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          style={{
            left: heart.left,
            top: heart.top,
          }}
          size={heart.size}
          animationDelay={heart.animationDelay}
          animationDuration={heart.animationDuration}
          rotation={heart.rotation}
        />
      ))}
    </div>
  );
}
