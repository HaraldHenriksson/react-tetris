"use client";

import Cell from "./GamePieceCell";
import Tetrominos from "./Tetromino";

type TetrominoKey = keyof typeof Tetrominos;

interface GamePiecesProps {
  tetromino: TetrominoKey;
  position: { x: number; y: number };
  rotation: number;
}

export default function GamePieces({
  tetromino,
  position,
  rotation,
}: GamePiecesProps) {
  const currentTetromino = Tetrominos[tetromino];

  return (
    <div
      style={{
        position: "absolute",
        top: `${position.y * 32}px`,
        left: `${position.x * 32}px`,
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
