"use client";

import Cell from "./Cell";

interface Cell {
  filled: boolean;
  color?: string;
}

interface GameGridProps {
  width?: number;
  height?: number;
  grid: Cell[][];
}

const GameGrid: React.FC<GameGridProps> = ({
  width = 10,
  height = 20,
  grid,
}) => {
  return (
    <div className="flex justify-center items-start h-screen">
      <div
        className="grid bg-white bg-opacity-10"
        style={{ gridTemplateColumns: `repeat(${width}, 2rem)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              filled={cell.filled}
              color={cell.color}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameGrid;
