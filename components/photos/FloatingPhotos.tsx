"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PHOTOS = [
  "/photos/photo_1.jpeg",
  "/photos/photo_2.jpeg",
  "/photos/photo_3.jpeg",
  "/photos/photo_4.jpeg",
  "/photos/photo_5.jpeg",
  "/photos/photo_6.jpeg",
];

interface FloatingPhoto {
  id: number;
  src: string;
  x: number;
  y: number;
  rotation: number;
  size: number;
  delay: number;
  duration: number;
}

export default function FloatingPhotos() {
  const [photos, setPhotos] = useState<FloatingPhoto[]>([]);

  useEffect(() => {
    const generated: FloatingPhoto[] = PHOTOS.map((src, i) => ({
      id: i,
      src,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 30 - 15,
      size: 60 + Math.random() * 40,
      delay: Math.random() * 2,
      duration: 15 + Math.random() * 10,
    }));
    setPhotos(generated);
  }, []);

  if (photos.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {photos.map((photo) => (
        <motion.div
          key={photo.id}
          className="absolute opacity-20"
          style={{
            left: `${photo.x}%`,
            top: `${photo.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.15, 0.2, 0.15, 0],
            scale: [0.8, 1, 1, 1, 0.8],
            x: [0, 20, -10, 15, 0],
            y: [0, -30, -60, -90, -120],
            rotate: [photo.rotation, photo.rotation + 5, photo.rotation - 3, photo.rotation],
          }}
          transition={{
            duration: photo.duration,
            delay: photo.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="bg-white/80 p-1 rounded-sm shadow-lg"
            style={{
              transform: `rotate(${photo.rotation}deg)`,
            }}
          >
            <img
              src={photo.src}
              alt=""
              className="object-cover rounded-sm"
              style={{
                width: photo.size,
                height: photo.size,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
