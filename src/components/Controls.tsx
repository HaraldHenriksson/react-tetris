"use client";

import { useState } from "react";

export default function ControlsModal() {
  const [showModal, setShowModal] = useState(false);

  if (!showModal) {
    return (
      <button onClick={() => setShowModal(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50  z-20">
      <div className="backdrop-filter backdrop-blur-lg bg-gray-800 bg-opacity-75 p-8 rounded shadow-lg w-1/4 text-white">
        <button
          className="absolute top-2 right-2"
          onClick={() => setShowModal(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="font-bold mb-2">Single Player Game:</h2>
        <ul>
          <li>Move Left: ArrowLeft</li>
          <li>Move Right: ArrowRight</li>
          <li>Move Down: ArrowDown</li>
          <li>Rotate: ArrowUp</li>
          <li>Drop: Space</li>
        </ul>

        <h2 className="font-bold mt-6 mb-2">Double Player Game:</h2>
        <ul>
          <li>Player 1 (WASD):</li>
          <ul>
            <li>Move Left: A</li>
            <li>Move Right: D</li>
            <li>Move Down: S</li>
            <li>Rotate: W</li>
            <li>Drop: Q</li>
          </ul>
          <li>Player 2 (Arrow Keys):</li>
          <ul>
            <li>Move Left: ArrowLeft</li>
            <li>Move Right: ArrowRight</li>
            <li>Move Down: ArrowDown</li>
            <li>Rotate: ArrowUp</li>
            <li>Drop: Space</li>
          </ul>
        </ul>
      </div>
    </div>
  );
}
