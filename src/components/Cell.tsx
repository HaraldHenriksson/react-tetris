import React from "react";

interface CellProps {
  filled: boolean;
  color?: string;
}

export default function Cell({ filled, color }: CellProps) {
  const cellStyle = filled
    ? { backgroundColor: color }
    : { backgroundColor: "transparent" };

  return <div className="w-8 h-8 border border-gray-400" style={cellStyle} />;
}
