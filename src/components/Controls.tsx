"use client";

import { CloseIcon, InfoIcon } from "@/icons/iconst";
import { useState } from "react";

export default function ControlsModal() {
  const [showModal, setShowModal] = useState(false);

  if (!showModal) {
    return (
      <button onClick={() => setShowModal(true)}>
        <InfoIcon />
      </button>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 p-8 rounded shadow-lg w-1/4">
        <button
          className="absolute top-2 right-2"
          onClick={() => setShowModal(false)}
        >
          <CloseIcon />
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