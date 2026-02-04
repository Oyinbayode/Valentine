"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { domToPng } from "modern-screenshot";
import { LOVE_LETTER, CONFIG } from "@/lib/constants";
import { celebrationVariants } from "@/lib/animations";
import FloatingPhotos from "@/components/photos/FloatingPhotos";
import PhotoCarousel from "@/components/photos/PhotoCarousel";
import TypingAnimation from "@/components/effects/TypingAnimation";
import HeartIcon from "@/components/icons/HeartIcon";

export default function LetterPage() {
  const router = useRouter();
  const [letterComplete, setLetterComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const letterTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const accepted = localStorage.getItem("valentine-accepted");
    if (accepted !== "true") {
      router.replace("/");
    }
  }, [router]);

  const handleSaveAsImage = useCallback(async () => {
    if (!letterTextRef.current) return;

    setIsSaving(true);
    try {
      const dataUrl = await domToPng(letterTextRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `love-letter-to-${CONFIG.valentineName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error saving image:", error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{
        background: "linear-gradient(135deg, #722f37 0%, #c41e3a 50%, #dc143c 100%)",
      }}
      initial="hidden"
      animate="visible"
      variants={celebrationVariants}
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 35l-1-1C25 30 23 28 23 25c0-2 2-4 4-4 1 0 2 .5 3 1.3.8-.8 1.8-1.3 3-1.3 2 0 4 2 4 4 0 3-2 5-6 9l-1 1z' fill='%23fff' fill-opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <FloatingPhotos />

      <div className="min-h-full flex items-center justify-center py-8 px-3 sm:px-4">
        <div className="max-w-2xl w-full text-center relative z-10">
          <div
            className="bg-white rounded-2xl p-6 sm:p-8 max-h-[80vh] overflow-y-auto celebration-scroll"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
          >
            <div ref={letterTextRef} className="bg-white p-4 rounded-xl">
              <TypingAnimation
                text={LOVE_LETTER}
                speed={50}
                className="font-handwritten text-lg sm:text-xl md:text-2xl text-[#722f37] text-left leading-relaxed"
                onComplete={() => setLetterComplete(true)}
              />
            </div>

            {letterComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-6 border-t border-[#dc143c]/20"
              >
                <p className="font-handwritten text-xl text-[#dc143c] text-center mb-6">
                  See us looking cute 🥰
                </p>
                <PhotoCarousel />

                <div className="flex flex-col sm:flex-row justify-center mt-6 gap-3">
                  <button
                    onClick={handleSaveAsImage}
                    disabled={isSaving}
                    className="px-6 py-3 bg-[#722f37] text-white font-body font-semibold rounded-full hover:bg-[#5a252c] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? (
                      "Saving..."
                    ) : (
                      <>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Save Letter
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => router.push("/todo")}
                    className="px-6 py-3 bg-[#dc143c] text-white font-body font-semibold rounded-full hover:bg-[#c41e3a] transition-colors flex items-center justify-center gap-2"
                  >
                    <HeartIcon size={18} className="text-white" />
                    Continue
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
