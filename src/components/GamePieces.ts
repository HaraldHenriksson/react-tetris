"use client";

import { useState } from "react";

export default function GamePieces() {
  const tetromino = "I";
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const moveLeft = () => {};

  const moveRight = () => {};

  const moveDown = () => {};

  const rotate = () => {};

  return Tetrominos[tetromino];
}
