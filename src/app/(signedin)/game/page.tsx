"use client";

import GamePieces from "@/components/GamePieces";
import GameGrid from "@/components/Gamegrid";
import { useEffect, useState } from "react";

export default function Game() {
  const [tetrominoType, setTetrominoType] = useState<
    "I" | "O" | "T" | "S" | "Z" | "J" | "L"
  >("I");
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

  return (
    <div className=" bg-customBlue flex justify-center items-center h-full">
      <GameGrid />
      <GamePieces
        tetromino={tetrominoType}
        position={position}
        rotation={rotation}
      />
    </div>
  );
}
