import React from "react";

interface CellProps {
  filled: boolean;
  color?: string;
}

export default function Cell({ filled, color }: CellProps) {
  const cellStyle = filled
    ? { width: "32px", height: "32px", backgroundColor: color, opacity: 0.8 }
    : { width: "32px", height: "32px", backgroundColor: "transparent" };

  return <div style={cellStyle} />;
}
