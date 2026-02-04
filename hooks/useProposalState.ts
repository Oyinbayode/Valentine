"use client";

import { useState, useCallback, useMemo } from "react";
import {
  PERSUASION_MESSAGES,
  PERSUASION_GIFS,
  CELEBRATION_GIF,
  NO_BUTTON_TEXTS,
  YES_BUTTON_CONFIG,
  NO_BUTTON_CONFIG,
} from "@/lib/constants";

export interface ProposalState {
  noClickCount: number;
  isAccepted: boolean;
  currentMessage: string;
  currentGif: string;
  yesButtonScale: number;
  noButtonScale: number;
  noButtonText: string;
  shouldEscape: boolean;
  isShaking: boolean;
}

export function useProposalState() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const currentMessage = useMemo(() => {
    const index = Math.min(noClickCount, PERSUASION_MESSAGES.length - 1);
    return PERSUASION_MESSAGES[index];
  }, [noClickCount]);

  const currentGif = useMemo(() => {
    if (isAccepted) return CELEBRATION_GIF;
    const index = Math.min(noClickCount, PERSUASION_GIFS.length - 1);
    return PERSUASION_GIFS[index];
  }, [noClickCount, isAccepted]);

  const yesButtonScale = useMemo(() => {
    const scale = YES_BUTTON_CONFIG.initialScale + noClickCount * YES_BUTTON_CONFIG.growthPerClick;
    return Math.min(scale, YES_BUTTON_CONFIG.maxScale);
  }, [noClickCount]);

  const noButtonScale = useMemo(() => {
    if (noClickCount < NO_BUTTON_CONFIG.shrinkStartClick) {
      return NO_BUTTON_CONFIG.initialScale;
    }
    const shrinkClicks = noClickCount - NO_BUTTON_CONFIG.shrinkStartClick;
    const scale = NO_BUTTON_CONFIG.initialScale - shrinkClicks * NO_BUTTON_CONFIG.shrinkPerClick;
    return Math.max(scale, NO_BUTTON_CONFIG.minScale);
  }, [noClickCount]);

  const noButtonText = useMemo(() => {
    const index = Math.min(noClickCount, NO_BUTTON_TEXTS.length - 1);
    return NO_BUTTON_TEXTS[index];
  }, [noClickCount]);

  const shouldEscape = useMemo(() => {
    return noClickCount >= NO_BUTTON_CONFIG.escapeStartClick;
  }, [noClickCount]);

  const handleNoClick = useCallback(() => {
    setNoClickCount((prev) => prev + 1);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  }, []);

  const handleYesClick = useCallback(() => {
    setIsAccepted(true);
  }, []);

  const reset = useCallback(() => {
    setNoClickCount(0);
    setIsAccepted(false);
    setIsShaking(false);
  }, []);

  return {
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
    reset,
  };
}
