import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-customBlue p-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold">React Tetris</h1>
        <p>A modern take on the classic game</p>
      </header>

      <footer className="text-gray-600">
        <p>React Tetris © 2023</p>
      </footer>
    </main>
  );
}
