"use server";

import Link from "next/link";

export default async function Home() {
  return (
    <main className="box-content flex flex-col items-center h-screen bg-customBlue p-6">
      <header className="text-center">
        <h1 className="text-7xl mt-32 mb-6 font-blackOpsOne text-blue-500">
          React Tetris
        </h1>
        <p className="mb-10">A modern take on the classic game</p>
      </header>

      <Link legacyBehavior href="/game">
        <a className="inline-block mt-40 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Start Game
        </a>
      </Link>

      <footer className="mt-auto text-gray-600">
        <p>React Tetris © 2023</p>
      </footer>
    </main>
  );
}
