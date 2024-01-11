import Game from "../game/page";

export default function DoubleGame() {
  return (
    <div className="bg-customBlue flex-grow flex justify-center items-center space-x-10">
      <div className="flex flex-col items-center p-4 bg-gray-800 bg-opacity-75 rounded-lg shadow-xl">
        <h2 className="text-2xl text-white mb-4">Player 1 (WASD Controls)</h2>
        <Game controls="wasd" showMusicControl={true} />
      </div>
      <div className="flex flex-col items-center p-4 bg-gray-800 bg-opacity-75 rounded-lg shadow-xl">
        <h2 className="text-2xl text-white mb-4">
          Player 2 (Arrow Key Controls)
        </h2>
        <Game controls="arrows" showMusicControl={false} />
      </div>
    </div>
  );
}
