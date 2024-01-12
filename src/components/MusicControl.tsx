"use client";

import { MusicIcon } from "@/icons/icons";
import React, { useState, useEffect } from "react";

interface MusicControlProps {
  isMusicPaused: boolean;
  setIsMusicPaused: (isMusicPaused: boolean) => void;
}

const MusicControl: React.FC<MusicControlProps> = ({
  isMusicPaused,
  setIsMusicPaused,
}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const newAudio = new Audio(
      "https://ia801407.us.archive.org/1/items/tetris-theme-song/tetris%20theme%20song.mp3"
    );
    newAudio.loop = true;
    setAudio(newAudio);

    // Cleanup function to pause music
    return () => {
      newAudio.pause();
    };
  }, []);

  useEffect(() => {
    // Toggle play/pause based on isPaused state
    if (audio) {
      if (isMusicPaused) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  }, [isMusicPaused, audio]);

  const togglePlay = () => {
    setIsMusicPaused(!isMusicPaused);
  };

  return (
    <button
      onClick={togglePlay}
      className="music-control"
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        zIndex: 1000,
        opacity: 0.7,
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      <MusicIcon isMusicPaused={isMusicPaused} />
    </button>
  );
};

export default MusicControl;
