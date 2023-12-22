"use client";

import React, { useState } from "react";
import Cell from "./Cell";

const createInitialGrid = (width: number, height: number) => {
  return Array.from({ length: height }, () => Array(width).fill(false));
};

const GameGrid = ({ width = 10, height = 20 }) => {
  const [grid, setGrid] = useState(() => createInitialGrid(width, height));

  const settleTetromino = () => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);

      return newGrid;
    });
  };

  return (
    <div className="flex justify-center items-start h-screen">
      <div
        className="grid bg-white bg-opacity-10"
        style={{ gridTemplateColumns: `repeat(${width}, 2rem)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((filled, colIndex) => (
            <Cell key={`${rowIndex}-${colIndex}`} filled={filled} />
          ))
        )}
      </div>
    </div>
  );
};

export default GameGrid;
