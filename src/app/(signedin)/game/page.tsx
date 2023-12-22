"use client";

import { checkCollision } from "@/components/GameCollision";
import GamePieces from "@/components/GamePieces";
import GameGrid from "@/components/Gamegrid";
import Tetrominos from "@/components/Tetromino";
import { useEffect, useState } from "react";

interface Cell {
  filled: boolean;
  type: "I" | "O" | "T" | "S" | "Z" | "J" | "L" | null;
}

export default function Game() {
  const [tetrominoType, setTetrominoType] = useState<
    "I" | "O" | "T" | "S" | "Z" | "J" | "L"
  >("I");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const createInitialGrid = (width: number, height: number): Cell[][] => {
    return Array.from({ length: height }, () =>
      Array.from({ length: width }, () => ({ filled: false, type: null }))
    );
  };

  const gridWidth = 10;
  const gridHeight = 20;

  const [grid, setGrid] = useState(() =>
    createInitialGrid(gridWidth, gridHeight)
  );

  const spawnTetromino = () => {
    const types = ["I", "O", "T", "S", "Z", "J", "L"];

    setTetrominoType(
      types[Math.floor(Math.random() * types.length)] as
        | "I"
        | "O"
        | "T"
        | "S"
        | "Z"
        | "J"
        | "L"
    );

    setPosition({ x: 4, y: 0 });
  };

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
            newGrid[y + position.y][x + position.x] = {
              filled: true,
              type: tetrominoType,
            };
          }
        });
      });

      // Return the new grid
      return newGrid;
    });
  };

  const moveLeft = () => {
    const newPosition = { x: position.x - 1, y: position.y };
    const currentShape = Tetrominos[tetrominoType].shape;

    if (
      !checkCollision({
        newPosition,
        tetrominoShape: currentShape as number[][],
        grid,
        gridWidth,
        gridHeight,
      })
    ) {
      setPosition(newPosition);
    }
  };

  const moveRight = () => {
    const newPosition = { x: position.x + 1, y: position.y };
    const currentShape = Tetrominos[tetrominoType].shape;

    if (
      !checkCollision({
        newPosition,
        tetrominoShape: currentShape as number[][],
        grid,
        gridWidth,
        gridHeight,
      })
    ) {
      setPosition(newPosition);
    }
  };

  const moveDown = () => {
    const newPosition = { x: position.x, y: position.y + 1 };
    const currentShape = Tetrominos[tetrominoType].shape;

    if (
      checkCollision({
        newPosition,
        tetrominoShape: currentShape as number[][],
        grid,
        gridWidth,
        gridHeight,
      })
    ) {
      settleTetromino(currentShape as number[][], position);
      spawnTetromino();
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
        <GameGrid
          grid={grid.map((row) => row.map((cell) => cell.filled))}
          width={10}
          height={20}
        />
        <GamePieces
          tetromino={tetrominoType}
          position={{ x: position.x - 1, y: position.y }}
          rotation={rotation}
        />
      </div>
    </div>
  );
}
