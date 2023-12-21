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

  const gridWidth = 10;
  const gridHeight = 20;

  const moveLeft = () => {
    setPosition((prev) => (prev.x > 0 ? { ...prev, x: prev.x - 1 } : prev));
  };

  const moveRight = () => {
    setPosition((prev) =>
      prev.x < gridWidth - 1 ? { ...prev, x: prev.x + 1 } : prev
    );
  };

  const moveDown = () => {
    // check collision
    setPosition((prev) => {
      if (prev.y < gridHeight - 4) {
        return { ...prev, y: prev.y + 1 };
      }
      return prev;
    });
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
  });

  return (
    <div className=" bg-customBlue flex justify-center items-center h-full">
      <div className="relative w-auto h-auto">
        <GameGrid width={10} height={20} />
        <GamePieces
          tetromino={tetrominoType}
          position={{ x: position.x - 1, y: position.y }}
          rotation={rotation}
        />
      </div>
    </div>
  );
}
