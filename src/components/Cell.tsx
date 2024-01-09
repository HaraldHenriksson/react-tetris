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
        backgroundImage: `linear-gradient(145deg, ${color}, #000)`,
        border: "1px solid rgba(255, 255, 255, 0.6)",
        borderRadius: "3px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
      }
    : {
        width: "32px",
        height: "32px",
        backgroundColor: "transparent",
        border: "1px solid rgba(128, 128, 128, 0.2)",
        borderRadius: "3px",
      };

  return <div style={cellStyle} />;
}
