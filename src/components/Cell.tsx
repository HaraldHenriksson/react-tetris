import React from "react";

interface CellProps {
  filled: boolean;
  color?: string;
}

export default function Cell({ filled, color }: CellProps) {
  const blendWithBlack = (color: any, alpha: any) => {
    return `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
      color.slice(3, 5),
      16
    )}, ${parseInt(color.slice(5, 7), 16)}, ${alpha})`;
  };

  const cellStyle = filled
    ? {
        width: "32px",
        height: "32px",
        backgroundImage: `linear-gradient(200deg, ${color}, ${blendWithBlack(
          color,
          0.2
        )})`,
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
