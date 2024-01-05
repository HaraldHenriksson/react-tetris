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
      <h1 className="text-4xl font-bold text-center mb-10">Game History</h1>
      <div className="max-w-4xl mx-auto">
        <ul className="divide-y divide-gray-700">
          {games.map((game, index) => (
            <li key={index} className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p>
                    Score: <span className="font-normal">{game.score}</span>
                  </p>
                  <p>
                    Level: <span className="font-normal">{game.level}</span>
                  </p>
                  <p>
                    Lines Cleared:{" "}
                    <span className="font-normal">{game.linesCleared}</span>
                  </p>
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(game.createdAt).toLocaleDateString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
