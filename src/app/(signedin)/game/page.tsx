import Game from "@/components/Game";

export default function DoubleGame() {
  return (
    <div className="bg-customBlue flex-grow flex justify-center items-center space-x-10">
      <div className="flex flex-col items-center p-4 bg-gray-800 bg-opacity-75 rounded-lg shadow-xl">
        <h2 className="text-2xl text-white mb-4">Classic Tetris</h2>
        <Game controls="arrows" showMusicControl={true} />
      </div>
    </div>
  );
}
