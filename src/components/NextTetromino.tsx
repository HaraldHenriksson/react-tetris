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
    <div
      className="p-4 bg-gray-800 bg-opacity-75 shadow-xl flex flex-col items-center justify-center w-[160px] h-[200px]"
      style={{ width: "160px", height: "200px" }}
    >
      <p className="text-white text-lg">Next</p>
      <div className="flex flex-col justify-center items-center h-full">
        {nextTetrominoShape.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center">
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
    </div>
  );
};

export default NextTetromino;
