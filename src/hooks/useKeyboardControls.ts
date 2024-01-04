import { useEffect } from "react";

function useKeyboardControls(
  moveLeft: () => void,
  moveRight: () => void,
  moveDown: () => void,
  rotate: () => void,
  isPaused: boolean
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isPaused) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          moveLeft();
          break;
        case "ArrowRight":
          event.preventDefault();
          moveRight();
          break;
        case "ArrowDown":
          event.preventDefault();
          moveDown();
          break;
        case "ArrowUp":
          event.preventDefault();
          rotate();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveLeft, moveRight, moveDown, rotate]);
}

export default useKeyboardControls;
