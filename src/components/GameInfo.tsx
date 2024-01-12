import PausePlayIcon from "./PausePlayIcon";

interface GameInfoProps {
  isPaused: boolean;
  togglePause: () => void;
  score: number;
  level: number;
  linesCleared: number;
}

export const GameInfo: React.FC<GameInfoProps> = ({
  isPaused,
  togglePause,
  score,
  level,
  linesCleared,
}) => (
  <div className="text-white p-4 bg-gray-800 bg-opacity-75 rounded-lg shadow-xl">
    <PausePlayIcon isPaused={isPaused} onClick={togglePause} />
    <p className="text-2xl mb-2">
      Score: <span className="text-green-400 font-digital">{score}</span>
    </p>
    <p className="text-2xl mb-2 ">
      Level: <span className="text-blue-400 font-digital">{level}</span>
    </p>
    <p className="text-2xl">
      Lines: <span className="text-red-500 font-digital">{linesCleared}</span>
    </p>
  </div>
);
