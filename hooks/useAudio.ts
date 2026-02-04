"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface UseAudioReturn {
  isBackgroundPlaying: boolean;
  isCelebrationPlaying: boolean;
  hasInteracted: boolean;
  startBackgroundMusic: () => void;
  playCelebrationMusic: () => void;
  stopAllMusic: () => void;
  toggleMute: () => void;
  isMuted: boolean;
}

export function useAudio(): UseAudioReturn {
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const celebrationAudioRef = useRef<HTMLAudioElement | null>(null);

  const [isBackgroundPlaying, setIsBackgroundPlaying] = useState(false);
  const [isCelebrationPlaying, setIsCelebrationPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      backgroundAudioRef.current = new Audio("/audio/background.mp3");
      backgroundAudioRef.current.loop = true;
      backgroundAudioRef.current.volume = 0.3;

      celebrationAudioRef.current = new Audio("/audio/celebration.mp3");
      celebrationAudioRef.current.loop = true;
      celebrationAudioRef.current.volume = 0.5;
    }

    return () => {
      backgroundAudioRef.current?.pause();
      celebrationAudioRef.current?.pause();
    };
  }, []);

  const startBackgroundMusic = useCallback(() => {
    if (backgroundAudioRef.current && !isBackgroundPlaying) {
      backgroundAudioRef.current.play()
        .then(() => {
          setIsBackgroundPlaying(true);
          setHasInteracted(true);
        })
        .catch((err) => {
          console.log("Audio autoplay prevented:", err);
        });
    }
  }, [isBackgroundPlaying]);

  const playCelebrationMusic = useCallback(() => {
    if (backgroundAudioRef.current && isBackgroundPlaying) {
      const fadeOut = setInterval(() => {
        if (backgroundAudioRef.current && backgroundAudioRef.current.volume > 0.05) {
          backgroundAudioRef.current.volume -= 0.05;
        } else {
          backgroundAudioRef.current?.pause();
          setIsBackgroundPlaying(false);
          clearInterval(fadeOut);
        }
      }, 100);
    }

    if (celebrationAudioRef.current) {
      celebrationAudioRef.current.currentTime = 0;
      celebrationAudioRef.current.volume = isMuted ? 0 : 0.5;
      celebrationAudioRef.current.play()
        .then(() => {
          setIsCelebrationPlaying(true);
        })
        .catch((err) => {
          console.log("Celebration audio prevented:", err);
        });
    }
  }, [isBackgroundPlaying, isMuted]);

  const stopAllMusic = useCallback(() => {
    backgroundAudioRef.current?.pause();
    celebrationAudioRef.current?.pause();
    setIsBackgroundPlaying(false);
    setIsCelebrationPlaying(false);
  }, []);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.volume = newMuted ? 0 : 0.3;
    }
    if (celebrationAudioRef.current) {
      celebrationAudioRef.current.volume = newMuted ? 0 : 0.5;
    }
  }, [isMuted]);

  return {
    isBackgroundPlaying,
    isCelebrationPlaying,
    hasInteracted,
    startBackgroundMusic,
    playCelebrationMusic,
    stopAllMusic,
    toggleMute,
    isMuted,
  };
}
