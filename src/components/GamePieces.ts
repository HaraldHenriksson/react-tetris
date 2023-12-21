"use client";

import { useState } from "react";

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

  return Tetrominos[tetromino];
}
