"use server";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-customBlue p-6">
      <Navbar />
      <header className="text-center">
        <h1 className="text-4xl font-bold">React Tetris</h1>
        <p>A modern take on the classic game</p>
      </header>

      <Link legacyBehavior href="/game">
        <a className="inline-block mt-4 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Start Game
        </a>
      </Link>

      <footer className="text-gray-600">
        <p>React Tetris © 2023</p>
      </footer>
    </main>
  );
}
