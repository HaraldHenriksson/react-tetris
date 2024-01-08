"use server";

import Messages from "@/components/Messages";
import {
  fetchRecentGames,
  fetchTopBestGames,
} from "../_server-actions/actions";

interface UserData {
  id: string;
  email: string;
}

interface GameData {
  id: number;
  score: number;
  level: number;
  linesCleared: number;
  createdAt: Date;
  userId: string;
  user: UserData;
}

export default async function Leaderboard() {
  let topBestGames: GameData[];
  let recentGames: GameData[];
  let errorMessage: string = "";

  try {
    topBestGames = await fetchTopBestGames();
    recentGames = await fetchRecentGames();
  } catch (error) {
    console.error("Error loading leaderboard data:", error);
    topBestGames = [];
    recentGames = [];
    errorMessage = "Error fetching game data. Please try again later.";
  }

  return (
    <div className="bg-customBlue min-h-screen p-8 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 text-amber-600">
        Leaderboard
      </h1>

      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}

      <div className="max-w-4xl mx-auto">
        <section>
          <h2 className="text-3xl mb-4 text-blue-500">Top Best Games</h2>
          {topBestGames.length > 0 ? (
            topBestGames.map((game, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-75 rounded-lg shadow-xl p-4 mb-4 flex justify-between items-center"
              >
                <div>
                  <p>
                    User:{" "}
                    <span className="text-yellow-400">{game.user.email}</span>
                  </p>
                  <p>
                    Score: <span className="text-green-400">{game.score}</span>
                  </p>
                  <p>
                    Level: <span className="text-blue-400">{game.level}</span>
                  </p>
                  <p>
                    Lines Cleared:{" "}
                    <span className="text-red-400">{game.linesCleared}</span>
                  </p>
                </div>
                <p className="text-sm text-gray-400">
                  {new Date(game.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-2xl">No games available</p>
          )}
        </section>
        <section>
          <h2 className="text-3xl mb-4 text-blue-500">Recent Games</h2>
          {recentGames.length > 0 ? (
            recentGames.map((game, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-75 rounded-lg shadow-xl p-4 mb-4 flex justify-between items-center"
              >
                <div>
                  <p>
                    User:{" "}
                    <span className="text-yellow-400">{game.user.email}</span>
                  </p>
                  <p>
                    Score: <span className="text-green-400">{game.score}</span>
                  </p>
                  <p>
                    Level: <span className="text-blue-400">{game.level}</span>
                  </p>
                  <p>
                    Lines Cleared:{" "}
                    <span className="text-red-400">{game.linesCleared}</span>
                  </p>
                </div>
                <p className="text-sm text-gray-400">
                  {new Date(game.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-2xl">No recent games available</p>
          )}
        </section>
      </div>
      <Messages />
    </div>
  );
}
