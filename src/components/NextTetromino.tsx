import React from "react";
import Tetrominos from "@/components/Tetromino";
import Cell from "./GamePieceCell";
import { getCurrentTetrominoShape } from "@/utils/tetrisUtils";

interface NextTetrominoProps {
  nextTetrominoType: "I" | "O" | "T" | "S" | "Z" | "J" | "L";
}

const NextTetromino: React.FC<NextTetrominoProps> = ({ nextTetrominoType }) => {
  const nextTetrominoShape = getCurrentTetrominoShape(nextTetrominoType, 0);
  const color = Tetrominos[nextTetrominoType].color;

  return (
    <div className="p-4 bg-gray-800 bg-opacity-75 rounded-lg shadow-xl">
      {nextTetrominoShape.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, cellIndex) => (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              filled={!!cell}
              color={cell ? color : "transparent"}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default NextTetromino;
