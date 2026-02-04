"use client";

import { motion } from "framer-motion";

const PHOTOS = [
  { src: "/photos/photo_1.jpeg", rotation: -6 },
  { src: "/photos/photo_2.jpeg", rotation: 4 },
  { src: "/photos/photo_3.jpeg", rotation: -3 },
  { src: "/photos/photo_4.jpeg", rotation: 5 },
  { src: "/photos/photo_5.jpeg", rotation: -4 },
  { src: "/photos/photo_6.jpeg", rotation: 3 },
];

// Desktop positions - scattered around center
const DESKTOP_POSITIONS = [
  { x: -280, y: -100 },
  { x: 280, y: -80 },
  { x: -300, y: 100 },
  { x: 300, y: 120 },
  { x: -260, y: 280 },
  { x: 260, y: 300 },
];

export default function MediaGallery() {
  return (
    <>
      {/* Desktop: Floating polaroids around the card */}
      <div className="hidden lg:block fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="relative w-full h-full">
          {PHOTOS.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 0.9,
                scale: 1,
                y: [0, -8, 0],
              }}
              transition={{
                delay: 1 + index * 0.15,
                duration: 0.5,
                y: {
                  duration: 3 + index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute"
              style={{
                left: `calc(50% + ${DESKTOP_POSITIONS[index].x}px)`,
                top: `calc(50% + ${DESKTOP_POSITIONS[index].y}px)`,
                transform: `rotate(${photo.rotation}deg)`,
              }}
            >
              {/* Polaroid frame */}
              <div
                className="bg-white p-1.5 pb-6 rounded-sm"
                style={{
                  boxShadow:
                    "0 4px 20px rgba(114, 47, 55, 0.15), 0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={photo.src}
                  alt={`Memory ${index + 1}`}
                  className="w-20 h-20 object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: Subtle hint - two polaroids peeking from corners */}
      <div className="lg:hidden fixed bottom-4 right-4 pointer-events-none z-0">
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 12 }}
          animate={{
            opacity: 0.85,
            y: 0,
            rotate: 12,
          }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white p-1 pb-4 rounded-sm"
            style={{
              boxShadow: "0 4px 15px rgba(114, 47, 55, 0.2)",
            }}
          >
            <img
              src="/photos/photo_1.jpeg"
              alt="Memory"
              className="w-14 h-14 object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="lg:hidden fixed bottom-6 left-4 pointer-events-none z-0">
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -8 }}
          animate={{
            opacity: 0.85,
            y: 0,
            rotate: -8,
          }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="bg-white p-1 pb-4 rounded-sm"
            style={{
              boxShadow: "0 4px 15px rgba(114, 47, 55, 0.2)",
            }}
          >
            <img
              src="/photos/photo_2.jpeg"
              alt="Memory"
              className="w-12 h-12 object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
