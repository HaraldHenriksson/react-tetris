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
    <div>
      <h1>Profile Page</h1>
      <div>
        <h2>Game History</h2>
        {games.map((game, index) => (
          <div key={index}>
            <p>Score: {game.score}</p>
            <p>Level: {game.level}</p>
            <p>Lines Cleared: {game.linesCleared}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
