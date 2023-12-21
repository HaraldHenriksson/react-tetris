"use client";

import { useEffect, useState } from "react";
import Cell from "./Cell";
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
        top: (position?.y || 0) * 20,
        left: (position?.x || 0) * 20,
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
