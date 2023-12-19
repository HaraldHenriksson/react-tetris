import React from "react";

export default function Gamegrid() {
  const width = 10;
  const height = 20;
  const grid = [];

  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push(0);
    }
    grid.push(row);
  }

  return (
    <div>
      {grid.map((row, i) => (
        <div key={i}>
          {row.map((cell, j) => (
            <span key={j} style={{ padding: "5px", border: "1px solid black" }}>
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
