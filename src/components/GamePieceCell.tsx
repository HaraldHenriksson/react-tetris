import React from "react";

export default function Cell({ filled }: { filled: boolean }) {
  const cellStyle = `w-8 h-8 ${filled ? "bg-blue-500" : "bg-transparent"}`;
  return <div className={cellStyle} />;
}
