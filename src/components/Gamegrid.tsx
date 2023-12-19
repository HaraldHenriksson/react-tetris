"use client";

import React, { useState, useEffect } from "react";

const createGrid = (width: number, height: number) => {
  return Array.from({ length: height * width }, () => 0);
};

const Cell = ({ value }: any) => {
  const style = {
    width: "20px",
    height: "20px",
    backgroundColor: value === 0 ? "white" : "blue",
    border: "1px solid black",
  };
  return <div style={style} />;
};

const GameGrid = () => {
  const width = 10;
  const height = 20;
  const [grid, setGrid] = useState(createGrid(width, height));

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: `repeat(${width}, 20px)` }}
    >
      {grid.map((value, index) => (
        <Cell key={index} value={value} />
      ))}
    </div>
  );
};

export default GameGrid;
