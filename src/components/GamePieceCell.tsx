import React from "react";

interface CellProps {
  filled: boolean;
  color?: string;
}

export default function Cell({ filled, color }: CellProps) {
  const cellStyle = filled
    ? {
        width: "32px",
        height: "32px",
        backgroundColor: color,
        border: "2px solid rgba(255, 255, 255, 0.8)",
        borderRadius: "3px",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
      }
    : {
        width: "32px",
        height: "32px",
        backgroundColor: "transparent",
        border: "2px solid transparent",
      };

  return <div style={cellStyle} />;
}
