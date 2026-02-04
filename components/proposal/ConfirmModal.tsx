"use client";

import { motion, AnimatePresence } from "framer-motion";
import HeartIcon from "@/components/icons/HeartIcon";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ isOpen, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 8px 32px rgba(114, 47, 55, 0.2)",
            }}
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-[#f8e8e8] flex items-center justify-center">
                <HeartIcon size={32} className="text-[#dc143c]" />
              </div>
            </div>

            {/* Title */}
            <h3 className="font-display text-xl sm:text-2xl text-[#722f37] text-center mb-2">
              Wait, already?
            </h3>

            {/* Message */}
            <p className="font-body text-[#722f37]/70 text-center mb-6">
              You haven&apos;t seen what happens when you click &quot;No&quot; yet!
              Are you sure you want to say yes right away?
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={onConfirm}
                className="w-full py-3 bg-[#dc143c] hover:bg-[#c41e3a] text-white font-body font-semibold rounded-full transition-colors flex items-center justify-center gap-2"
              >
                Yes, I&apos;m sure!
                <HeartIcon size={18} className="text-white" />
              </button>
              <button
                onClick={onCancel}
                className="w-full py-3 bg-[#f8e8e8] hover:bg-[#f0d8d8] text-[#722f37] font-body font-semibold rounded-full transition-colors"
              >
                Let me explore first
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
