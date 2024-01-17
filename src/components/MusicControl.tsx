"use client";

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={isMusicPaused ? "currentColor" : "gray"}
        className="w-6 h-6"
        style={{ transform: "scale(2)" }} // larger
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
        />
      </svg>
    </button>
  );
};

export default MusicControl;
