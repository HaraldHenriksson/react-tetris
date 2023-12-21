import React from "react";

// test

export default function Cell({ filled }: { filled: boolean }) {
  const cellStyle = `w-8 h-8 ${
    filled ? "bg-blue-500 bg-opacity-80" : "bg-transparent"
  }`;
  return <div className={cellStyle} />;
}
