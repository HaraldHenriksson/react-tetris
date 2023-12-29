"use client";

import { checkCollision } from "@/components/GameCollision";
import GamePieces from "@/components/GamePieces";
import GameGrid from "@/components/Gamegrid";
import Tetrominos from "@/components/Tetromino";
import useAutoDrop from "@/hooks/useAutoDrop";
import useKeyboardControls from "@/hooks/useKeyboardControls";
import { useState } from "react";
import { getCurrentTetrominoShape } from "@/utils/tetrisUtils";
import {
  calculateScoreForLines,
  calculateTotalScore,
} from "@/utils/scoreUtils";

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

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [linesCleared, setLinesCleared] = useState(0);

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
    const currentShape = getCurrentTetrominoShape(tetrominoType, rotation);

    // update grid
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);

      // loop over each cell in the tetromino
      currentShape.forEach((row, y) => {
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
    const currentShape = getCurrentTetrominoShape(tetrominoType, rotation);

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
    const currentShape = getCurrentTetrominoShape(tetrominoType, rotation);

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
    const currentShape = getCurrentTetrominoShape(tetrominoType, rotation);

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
    setRotation((prev) => {
      const newRotation = (prev + 1) % 4;
      const currentShape = getCurrentTetrominoShape(tetrominoType, newRotation);

      // Check if the new shape would be outside the grid
      const collision = checkCollision({
        newPosition: position,
        tetrominoShape: currentShape,
        grid,
        gridWidth,
        gridHeight,
      });

      // If collision, don't rotate
      if (collision) {
        return prev;
      }

      // If no collision, rotate
      return newRotation;
    });
  };

  useKeyboardControls(moveLeft, moveRight, moveDown, rotate);

  useAutoDrop(moveDown, score);

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

        // Calculate score for cleared lines and add it to the total score
        const scoreForLines = calculateScoreForLines(level, filledrowsCount);
        setScore((prevScore) => calculateTotalScore(prevScore, scoreForLines));

        setLinesCleared((prevLines) => {
          const newTotalLines = prevLines + filledrowsCount;
          // Level up for every 10 lines
          if (Math.floor(newTotalLines / 10) > Math.floor(prevLines / 10)) {
            setLevel((prevLevel) => prevLevel + 1);
          }
          return newTotalLines;
        });

        // new grid
        return [...newRows, ...rowsWithoutFilled];
      }

      // If no filled rows, return the original grid
      return prevGrid;
    });
  };

  const checkGameOver = () => {
    const initialPosition = { x: 4, y: 0 }; // initial position
    const currentShape = getCurrentTetrominoShape(tetrominoType, rotation);

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
      <div>
        <p>Score: {score}</p>
        <p>Level: {level}</p>
        <p>Lines Cleared: {linesCleared}</p>
      </div>
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
