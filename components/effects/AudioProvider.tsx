"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { useAudio } from "@/hooks/useAudio";
import MuteButton from "./MuteButton";

interface AudioContextType {
  startBackgroundMusic: () => void;
  playCelebrationMusic: () => void;
  hasInteracted: boolean;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function useAudioContext() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within AudioProvider");
  }
  return context;
}

interface AudioProviderProps {
  children: ReactNode;
}

export default function AudioProvider({ children }: AudioProviderProps) {
  const {
    hasInteracted,
    startBackgroundMusic,
    playCelebrationMusic,
    toggleMute,
    isMuted,
  } = useAudio();

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        startBackgroundMusic();
      }
    };

    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [hasInteracted, startBackgroundMusic]);

  return (
    <AudioContext.Provider
      value={{
        startBackgroundMusic,
        playCelebrationMusic,
        hasInteracted,
      }}
    >
      {children}
      <MuteButton isMuted={isMuted} onToggle={toggleMute} />
    </AudioContext.Provider>
  );
}
