"use client";

import { checkCollision } from "@/components/GameCollision";
import GamePieces from "@/components/GamePieces";
import GameGrid from "@/components/Gamegrid";
import { useEffect, useState } from "react";

export default function Game() {
  const [tetrominoType, setTetrominoType] = useState<
    "I" | "O" | "T" | "S" | "Z" | "J" | "L"
  >("I");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const createInitialGrid = (width: number, height: number) => {
    return Array.from({ length: height }, () => Array(width).fill(false));
  };
  const gridWidth = 10;
  const gridHeight = 20;

  const [grid, setGrid] = useState(() =>
    createInitialGrid(gridWidth, gridHeight)
  );

  const spawnTetromino = () => {
    const types = ["I", "O", "T", "S", "Z", "J", "L"];

    setTetrominoType(types[Math.floor(Math.random() * types.length)]);

    setPosition({ x: 4, y: 0 });

  const settleTetromino = (
    tetrominoShape: number[][],
    position: { x: number; y: number }
  ) => {
    // update grid
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);

      // loop over each cell in the tetromino
      tetrominoShape.forEach((row, y) => {
        row.forEach((cell, x) => {
          // if the cell is filled, update
          if (cell !== 0) {
            newGrid[y + position.y][x + position.x] = true;
          }
        });
      });

      // Return the new grid
      return newGrid;
    });
  };

  const moveLeft = () => {
    setPosition((prev) => (prev.x > 0 ? { ...prev, x: prev.x - 1 } : prev));
  };

  const moveRight = () => {
    setPosition((prev) =>
      prev.x < gridWidth - 1 ? { ...prev, x: prev.x + 1 } : prev
    );
  };

  const moveDown = () => {
    const newPosition = { x: position.x, y: position.y + 1 };
    // const currentShape = Tetrominos[tetrominoType].shape;

    if (
      checkCollision({
        newPosition,
        tetrominoShape: currentShape,
        grid,
        gridWidth,
        gridHeight,
      })
    ) {
      settleTetromino(currentShape, position);
    } else {
      setPosition(newPosition);
    }
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
        <GameGrid grid={grid} width={10} height={20} />
        <GamePieces
          tetromino={tetrominoType}
          position={{ x: position.x - 1, y: position.y }}
          rotation={rotation}
        />
      </div>
    </div>
  );
}
