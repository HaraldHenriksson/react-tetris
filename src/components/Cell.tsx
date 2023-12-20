import React from "react";

export default function Cell({ filled }: { filled: boolean }) {
  const cellStyle = `w-8 h-8 border border-gray-400 ${
    filled ? "bg-blue-500" : "bg-white"
  }`;
  return <div className={cellStyle} />;
}
