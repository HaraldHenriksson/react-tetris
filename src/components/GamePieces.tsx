"use client";

import { useEffect, useState } from "react";
import Cell from "./Cell";

type Tetromino = keyof typeof Tetrominos;

export default function GamePieces() {
  const [tetromino, setTetromino] = useState<Tetromino>("I");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const moveLeft = () => {
    // check collision
    setPosition((prev) => ({ ...prev, x: prev.x - 1 }));
  };

  const moveRight = () => {
    // check collision
    setPosition((prev) => ({ ...prev, x: prev.x + 1 }));
  };

  const moveDown = () => {
    // check collision
    setPosition((prev) => ({ ...prev, y: prev.y + 1 }));
  };

  const rotate = () => {
    // check collision
    setRotation((prev) => (prev + 1) % 4);
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
        case "ArrowUp":
          rotate();
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

  const currentTetromino = Tetrominos[tetromino];

  return (
    <div
      style={{
        position: "absolute",
        top: position.y * 20,
        left: position.x * 20,
      }}
    >
      {currentTetromino.shape.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} filled={cell !== 0} />
          ))}
        </div>
      ))}
    </div>
  );
}
