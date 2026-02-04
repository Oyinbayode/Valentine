"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { carouselVariants } from "@/lib/animations";
import { TIMINGS } from "@/lib/constants";

const MEDIA_ITEMS = [
  { src: "/photos/photo_1.jpeg", type: "image" as const, caption: "Us" },
  { src: "/photos/photo_2.jpeg", type: "image" as const, caption: "Together" },
  { src: "/photos/photo_3.jpeg", type: "image" as const, caption: "Our joy" },
  { src: "/photos/photo_4.jpeg", type: "image" as const, caption: "Beautiful moments" },
  { src: "/photos/photo_5.jpeg", type: "image" as const, caption: "Forever us" },
  { src: "/photos/photo_6.jpeg", type: "image" as const, caption: "My heart" },
  { src: "/photos/vid_1.mp4", type: "video" as const, caption: "Our moments" },
];

export default function PhotoCarousel() {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);

  useEffect(() => {
    const currentItem = MEDIA_ITEMS[currentIndex];
    const interval = currentItem.type === "video" ? 8000 : TIMINGS.carouselInterval;

    const timer = setInterval(() => {
      setCurrentIndex(([prev]) => [(prev + 1) % MEDIA_ITEMS.length, 1]);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const currentItem = MEDIA_ITEMS[currentIndex];

  return (
    <div className="max-w-sm sm:max-w-md mx-auto px-2 sm:px-0">
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl bg-white/10 backdrop-blur-sm">
        <div className="aspect-[4/3] relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              {currentItem.type === "video" ? (
                <video
                  src={currentItem.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={currentItem.src}
                  alt={currentItem.caption}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {currentItem.caption && (
          <div className="p-3 sm:p-4 bg-gradient-to-t from-black/60 to-transparent absolute bottom-0 left-0 right-0">
            <p className="text-white font-handwritten text-lg sm:text-xl text-center">
              {currentItem.caption}
            </p>
          </div>
        )}

        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
          {MEDIA_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex([i, i > currentIndex ? 1 : -1])}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex
                  ? "bg-white w-5 sm:w-6"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
