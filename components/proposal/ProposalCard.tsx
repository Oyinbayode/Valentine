"use client";

import { motion } from "framer-motion";
import { useProposalState } from "@/hooks/useProposalState";
import { useAudioContext } from "@/components/effects/AudioProvider";
import { cardVariants, shakeVariants } from "@/lib/animations";
import YesButton from "./YesButton";
import NoButton from "./NoButton";
import PersuasionText from "./PersuasionText";
import MoodGif from "./MoodGif";
import Confetti from "@/components/effects/Confetti";
import CelebrationOverlay from "@/components/effects/CelebrationOverlay";
import MediaGallery from "@/components/photos/MediaGallery";
import HeartIcon, { DoubleHeart } from "@/components/icons/HeartIcon";

export default function ProposalCard() {
  const {
    noClickCount,
    isAccepted,
    currentMessage,
    currentGif,
    yesButtonScale,
    noButtonScale,
    noButtonText,
    shouldEscape,
    isShaking,
    handleNoClick,
    handleYesClick,
  } = useProposalState();

  const { playCelebrationMusic } = useAudioContext();

  const onYesClick = () => {
    handleYesClick();
    playCelebrationMusic();
  };

  return (
    <>
      <Confetti isActive={isAccepted} />
      <CelebrationOverlay isVisible={isAccepted} />

      <MediaGallery />

      <div className="relative flex flex-col items-center w-full px-4 sm:px-6">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-md"
        >
          <motion.div
            variants={shakeVariants}
            animate={isShaking ? "shake" : ""}
            className="card-paper rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 w-full border-ornate"
          >
            <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 flex items-end gap-1 sm:gap-2">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              >
                <HeartIcon size={20} className="text-[#dc143c]/70 sm:hidden" />
                <HeartIcon size={24} className="text-[#dc143c]/70 hidden sm:block" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              >
                <DoubleHeart size={28} className="text-[#dc143c] sm:hidden" />
                <DoubleHeart size={36} className="text-[#dc143c] hidden sm:block" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              >
                <HeartIcon size={20} className="text-[#dc143c]/70 sm:hidden" />
                <HeartIcon size={24} className="text-[#dc143c]/70 hidden sm:block" />
              </motion.div>
            </div>

            <div className="mb-6 sm:mb-8">
              <MoodGif gifUrl={currentGif} />
            </div>

            <div className="mb-6 sm:mb-8">
              <PersuasionText message={currentMessage} />
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 relative min-h-[120px] sm:min-h-[80px]">
              <YesButton onClick={onYesClick} scale={yesButtonScale} />
              <NoButton
                onClick={handleNoClick}
                scale={noButtonScale}
                text={noButtonText}
                shouldEscape={shouldEscape}
              />
            </div>

            <div className="mt-6 sm:mt-8 flex justify-center items-center gap-3">
              <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#dc143c]/20" />
              <HeartIcon size={12} className="text-[#dc143c]/40" />
              <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#dc143c]/20" />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </>
  );
}
