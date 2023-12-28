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
  const color = currentTetromino.color;

  return (
    <div
      style={{
        position: "absolute",
        top: `${position.y * 32}px`,
        left: `${position.x * 32}px`,
      }}
    >
      {currentTetromino.shapes.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} filled={cell.length !== 0} color={color} />
          ))}
        </div>
      ))}
    </div>
  );
}
