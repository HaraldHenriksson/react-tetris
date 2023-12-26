"use client";

import { checkCollision } from "@/components/GameCollision";
import GamePieces from "@/components/GamePieces";
import GameGrid from "@/components/Gamegrid";
import Tetrominos from "@/components/Tetromino";
import useAutoDrop from "@/hooks/useAutoDrop";
import useKeyboardControls from "@/hooks/useKeyboardControls";
import { useEffect, useState } from "react";

interface Cell {
  filled: boolean;
  type: "I" | "O" | "T" | "S" | "Z" | "J" | "L" | null;
  color?: string;
}

export default function Game() {
  const [tetrominoType, setTetrominoType] = useState<
    "I" | "O" | "T" | "S" | "Z" | "J" | "L"
  >("I");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const [isGameOver, setIsGameOver] = useState(false);

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

    if (checkGameOver()) {
      setIsGameOver(true);
      // game over logic
    }

    setPosition({ x: 4, y: 0 });
  };

  const settleTetromino = (
    tetrominoShape: number[][],
    position: { x: number; y: number }
  ) => {
    const color = Tetrominos[tetrominoType].color;

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
              color: color,
            };
          }
        });
      });

      // Return the new grid
      return newGrid;
    });

    clearLines();
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

  useKeyboardControls(moveLeft, moveRight, moveDown, rotate);

  useAutoDrop(moveDown, 1000);

  const clearLines = () => {
    setGrid((prevGrid) => {
      // filled rows
      const rowsWithoutFilled = prevGrid.filter(
        (row) => !row.every((cell) => cell.filled)
      );

      // number of filled rows
      const filledrowsCount = gridHeight - rowsWithoutFilled.length;

      // if filled rows
      if (filledrowsCount > 0) {
        // new empty rows
        const newRows = Array(filledrowsCount)
          .fill(0)
          .map(() => Array(gridWidth).fill({ filled: false, color: "" }));

        // new grid
        return [...newRows, ...rowsWithoutFilled];
      }

      // If no filled rows, return the original grid
      return prevGrid;
    });
  };

  const checkGameOver = () => {
    const initialPosition = { x: 4, y: 0 }; // initial position
    const currentShape = Tetrominos[tetrominoType].shape;

    // check collision at the initial position
    return checkCollision({
      newPosition: initialPosition,
      tetrominoShape: currentShape as number[][],
      grid,
      gridWidth,
      gridHeight,
    });
  };

  return (
    <div className="bg-customBlue min-h-screen flex justify-center items-center">
      <div className="relative w-auto">
        <GameGrid grid={grid} width={10} height={20} />
        <GamePieces
          tetromino={tetrominoType}
          position={position}
          rotation={rotation}
        />
        {isGameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="text-4xl text-white">Game Over</div>
          </div>
        )}
      </div>
    </div>
  );
}
