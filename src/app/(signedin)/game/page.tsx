"use client";

import { checkCollision } from "@/components/GameCollision";
import GamePieces from "@/components/GamePieces";
import GameGrid from "@/components/Gamegrid";
import Tetrominos from "@/components/Tetromino";
import useAutoDrop from "@/hooks/useAutoDrop";
import useKeyboardControls from "@/hooks/useKeyboardControls";
import { useEffect, useState } from "react";
import { getCurrentTetrominoShape } from "@/utils/tetrisUtils";
import {
  calculateScoreForLines,
  calculateTotalScore,
} from "@/utils/scoreUtils";
import PausePlayIcon from "@/components/PausePlayIcon";
import useTetrominoControls from "@/hooks/useTetrominoControls";
import { getServerUser } from "@/app/lib/user/server";
import { saveGame } from "../_server-actions/actions";
import NextTetromino from "@/components/NextTetromino";
import MusicControl from "@/components/MusicControl";
import useGhostPosition from "@/hooks/useGhostPosition";
import useCheckGameOver from "@/hooks/useCheckGameOver";

type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";
interface Cell {
  filled: boolean;
  type: TetrominoType | null;
  color?: string;
}

export default function Game() {
  const [currentTetromino, setCurrentTetromino] = useState<TetrominoType>("I");
  const [nextTetromino, setNextTetromino] = useState<TetrominoType>("I");

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);

  const [isPaused, setIsPaused] = useState(false);

  const [isGameOver, setIsGameOver] = useState(false);

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [linesCleared, setLinesCleared] = useState(0);

  const [isMusicPaused, setIsMusicPaused] = useState(false);

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

  useEffect(() => {
    // Generate the first two Tetrominos when the game starts
    spawnTetromino();
    spawnTetromino();
  }, []);

  const spawnTetromino = () => {
    const types: TetrominoType[] = ["I", "O", "T", "S", "Z", "J", "L"];

    setCurrentTetromino(nextTetromino);

    // Generate a new next Tetromino
    const newTypes = types.filter((type) => type !== nextTetromino);

    setNextTetromino(
      newTypes[Math.floor(Math.random() * newTypes.length)] as TetrominoType
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
    const color = Tetrominos[currentTetromino].color;
    const currentShape = getCurrentTetrominoShape(currentTetromino, rotation);

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
              type: currentTetromino,
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

  const { moveLeft, moveRight, moveDown, rotate, dropTetromino } =
    useTetrominoControls({
      currentTetromino,
      position,
      setPosition,
      rotation,
      setRotation,
      grid,
      gridWidth,
      gridHeight,
      settleTetromino,
      spawnTetromino,
    });

  useKeyboardControls(
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    dropTetromino,
    isPaused
  );

  useAutoDrop(moveDown, score, isPaused);

  const clearLines = () => {
    setGrid((prevGrid) => {
      // filled rows
      const filledRows = prevGrid.filter((row) =>
        row.every((cell) => cell.filled)
      );

      // number of filled rows
      const filledRowsCount = filledRows.length;
      // if filled rows
      if (filledRowsCount > 0) {
        // new empty rows
        const newRows = Array.from({ length: filledRowsCount }, () =>
          Array(gridWidth).fill({ filled: false, type: null })
        );

        // rows that are not filled
        const remainingRows = prevGrid.filter(
          (row) => !row.every((cell) => cell.filled)
        );

        // Calculate score for cleared lines and add it to the total score
        const scoreForLines = calculateScoreForLines(level, filledRowsCount);
        setScore((prevScore) => calculateTotalScore(prevScore, scoreForLines));

        const newLinesCleared = linesCleared + filledRowsCount;

        setLevel(
          (prevLevel) =>
            prevLevel +
            Math.floor(newLinesCleared / 10) -
            Math.floor(linesCleared / 10)
        );

        setLinesCleared(newLinesCleared);

        // new grid
        return [...newRows, ...remainingRows];
      }

      // If no filled rows, return the original grid
      return prevGrid;
    });
  };

  const checkGameOver = useCheckGameOver(
    currentTetromino,
    rotation,
    grid,
    gridWidth,
    gridHeight
  );

  const ghostPosition = useGhostPosition(
    currentTetromino,
    rotation,
    position,
    grid,
    gridWidth,
    gridHeight
  );

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    const saveGameData = async () => {
      if (isGameOver) {
        setIsMusicPaused(true);
        try {
          const user = await getServerUser();
          if (user && user.email) {
            await saveGame(user.id, user.email, score, level, linesCleared);
          } else {
            console.error("User or user email is undefined, game not saved");
          }
        } catch (error) {
          console.error("Failed to save game data", error);
        }
      }
    };

    saveGameData();
  }, [isGameOver, score, level, linesCleared]);

  return (
    <div className="bg-customBlue min-h-screen flex justify-center items-center ">
      <div className="text-white p-4 bg-gray-800 bg-opacity-75 rounded-lg shadow-xl">
        <PausePlayIcon isPaused={isPaused} onClick={togglePause} />
        <p className="text-2xl mb-2">
          Score: <span className="text-green-400 font-digital">{score}</span>
        </p>
        <p className="text-2xl mb-2 ">
          Level: <span className="text-blue-400 font-digital">{level}</span>
        </p>
        <p className="text-2xl">
          Lines:{" "}
          <span className="text-red-500 font-digital">{linesCleared}</span>
        </p>
      </div>
      <div className="relative w-auto">
        <GameGrid grid={grid} width={10} height={20} />
        <GamePieces
          tetromino={currentTetromino}
          position={position}
          rotation={rotation}
          isGhost={false}
        />

        <GamePieces
          tetromino={currentTetromino}
          position={ghostPosition}
          rotation={rotation}
          isGhost={true}
        />

        {isGameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="text-4xl text-white">Game Over</div>
          </div>
        )}
      </div>
      <NextTetromino nextTetrominoType={nextTetromino} />
      <MusicControl
        isMusicPaused={isMusicPaused}
        setIsMusicPaused={setIsMusicPaused}
      />
    </div>
  );
}
