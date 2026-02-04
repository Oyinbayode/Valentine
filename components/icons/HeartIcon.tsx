"use client";

interface HeartIconProps {
  size?: number;
  className?: string;
  filled?: boolean;
  animated?: boolean;
}

export default function HeartIcon({
  size = 24,
  className = "",
  filled = true,
  animated = false,
}: HeartIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 2}
      className={`${className} ${animated ? "pulse-soft" : ""}`}
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoubleHeart({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
    >
      {/* Back heart */}
      <path
        d="M22 18.35l-0.97-0.88C17.6 14.24 15 12.19 15 9.67c0-2.05 1.61-3.67 3.67-3.67 1.16 0 2.27.54 3 1.39.73-.85 1.84-1.39 3-1.39 2.06 0 3.67 1.62 3.67 3.67 0 2.52-2.6 4.57-6.03 7.69L22 18.35z"
        opacity="0.5"
      />
      {/* Front heart */}
      <path d="M12 25.35l-1.45-1.32C5.4 19.36 2 16.28 2 12.5 2 9.42 4.42 7 7.5 7c1.74 0 3.41.81 4.5 2.09C13.09 7.81 14.76 7 16.5 7 19.58 7 22 9.42 22 12.5c0 3.78-3.4 6.86-8.55 11.54L12 25.35z" />
    </svg>
  );
}

export function SparkleHeart({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Main heart */}
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      {/* Sparkles */}
      <circle cx="19" cy="5" r="1" opacity="0.6" />
      <circle cx="21" cy="8" r="0.5" opacity="0.4" />
      <circle cx="4" cy="6" r="0.7" opacity="0.5" />
    </svg>
  );
}
