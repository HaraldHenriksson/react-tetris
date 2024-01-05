"use client";

import { useEffect, useState } from "react";
import {
  fetchRecentGames,
  fetchTopBestGames,
} from "../_server-actions/actions";

interface GameData {
  id: number;
  score: number;
  level: number;
  linesCleared: number;
  createdAt: Date;
}

export default function Leaderboard() {
  const [topBestGames, setTopBestGames] = useState<GameData[]>([]);
  const [recentGames, setRecentGames] = useState<GameData[]>([]);

  useEffect(() => {
    const loadLeaderboardData = async () => {
      try {
        const topGames = await fetchTopBestGames();
        setTopBestGames(topGames);

        const recent = await fetchRecentGames();
        setRecentGames(recent);
      } catch (error) {
        console.error("Error loading leaderboard data:", error);
      }
    };

    loadLeaderboardData();
  }, []);

  return (
    <div className="bg-customBlue min-h-screen p-8 text-white">
      <h1 className="text-4xl font-bold text-center mb-10">Leaderboard</h1>
      <div className="max-w-4xl mx-auto">
        <section>
          <h2 className="text-3xl mb-4">Top Best Games</h2>
          {topBestGames.map((game, index) => (
            <div
              key={index}
              className="bg-gray-800 bg-opacity-75 rounded-lg shadow-xl p-4 mb-4"
            >
              {/* game data */}
            </div>
          ))}
        </section>
        <section>
          <h2 className="text-3xl mb-4">Recent Games</h2>
          {recentGames.map((game, index) => (
            <div
              key={index}
              className="bg-gray-800 bg-opacity-75 rounded-lg shadow-xl p-4 mb-4"
            >
              {/*  game data */}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
