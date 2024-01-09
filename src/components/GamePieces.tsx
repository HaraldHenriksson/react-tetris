"use client";

import Cell from "./GamePieceCell";
import Tetrominos from "./Tetromino";
import { getCurrentTetrominoShape } from "@/utils/tetrisUtils";

type TetrominoKey = keyof typeof Tetrominos;

interface GamePiecesProps {
  tetromino: TetrominoKey;
  position: { x: number; y: number };
  rotation: number;
  isGhost?: boolean;
}

export default function GamePieces({
  tetromino,
  position,
  rotation,
  isGhost = false,
}: GamePiecesProps) {
  const currentTetromino = Tetrominos[tetromino];
  const currentShape = getCurrentTetrominoShape(tetromino, rotation);
  const color = currentTetromino.color;
  const opacity = isGhost ? 0.2 : 1;

  return (
    <div
      style={{
        position: "absolute",
        top: `${position.y * 32}px`,
        left: `${position.x * 32}px`,
        opacity,
      }}
    >
      {currentShape.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} filled={cell !== 0} color={color} />
          ))}
        </div>
      ))}
    </div>
  );
}
