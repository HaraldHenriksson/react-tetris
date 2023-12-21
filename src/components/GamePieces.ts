"use client";

import { useEffect, useState } from "react";

export default function GamePieces() {
  const tetromino = "I";
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const moveLeft = () => {
    setPosition((prev) => ({ ...prev, x: prev.x - 1 }));
  };

  const moveRight = () => {
    setPosition((prev) => ({ ...prev, x: prev.x + 1 }));
  };

  const moveDown = () => {
    setPosition((prev) => ({ ...prev, y: prev.y + 1 }));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          moveRight();
          break;
        case "ArrowDown":
          moveDown();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return Tetrominos[tetromino];
}
