"use client";

import React, { useEffect, useState } from "react";
import { fetchGameHistory } from "../_server-actions/actions";

interface GameHistory {
  id: number;
  score: number;
  level: number;
  linesCleared: number;
  createdAt: Date;
  userId: string;
}

export default function ProfilePage() {
  const [games, setGames] = useState<GameHistory[]>([]);

  useEffect(() => {
    const loadGameHistory = async () => {
      try {
        const gameHistory = await fetchGameHistory();
        console.log("gameHistory:", gameHistory);
        setGames(gameHistory);
      } catch (error) {
        console.error("Error fetching game history:", error);
      }
    };

    loadGameHistory();
  }, []);

  return (
    <div className="bg-customBlue min-h-screen p-8 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 text-amber-600">
        Game History
      </h1>
      <div className="max-w-4xl mx-auto">
        {games.map((game, index) => (
          <div
            key={index}
            className="bg-gray-800 bg-opacity-75 rounded-lg shadow-xl p-4 mb-4 flex justify-between items-center"
          >
            <div>
              <p className="text-2xl mb-2">
                Score: <span className="text-green-400">{game.score}</span>
              </p>
              <p className="text-2xl mb-2">
                Level: <span className="text-blue-400">{game.level}</span>
              </p>
              <p className="text-2xl">
                Lines Cleared:{" "}
                <span className="text-red-400">{game.linesCleared}</span>
              </p>
            </div>
            <p className="text-sm text-gray-400">
              {new Date(game.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
