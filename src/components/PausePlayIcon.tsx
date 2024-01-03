interface PausePlayIconProps {
  isPaused: boolean;
  onClick: () => void;
}

const PausePlayIcon: React.FC<PausePlayIconProps> = ({ isPaused, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center w-full py-2 text-white rounded hover:bg-gray-700 transition duration-300 text-2xl cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 ml-3" // ml-4 for it to be almost centerd?
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={
            isPaused
              ? "M6 4.5v15m6-15v15"
              : "M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z"
          }
        />
      </svg>
    </div>
  );
};

export default PausePlayIcon;
