"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver>();
  const [loading, setLoading] = useState(false);

  const lastGameElementRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    const loadGameHistory = async () => {
      try {
        setLoading(true);
        const gameHistory = await fetchGameHistory(page);
        setGames((prevGames) => [...prevGames, ...gameHistory]);
      } catch (error) {
        console.error("Error fetching game history:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGameHistory();
  }, [page]);

  return (
    <div className="bg-customBlue min-h-screen p-8 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 text-amber-600">
        Game History
      </h1>
      <div className="max-w-4xl mx-auto">
        {games.map((game, index) => {
          if (games.length === index + 1) {
            return (
              <div
                ref={lastGameElementRef}
                key={index}
                className="bg-gray-800 bg-opacity-75 rounded-lg shadow-xl p-4 mb-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-small mb-2 text-blue-500">
                    Game {index + 1}
                  </p>
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
            );
          } else {
            return (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-75 rounded-lg shadow-xl p-4 mb-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-small mb-2 text-blue-500">
                    Game {index + 1}
                  </p>
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
            );
          }
        })}
        {loading && <p>Loading game history...</p>}
      </div>
    </div>
  );
}
