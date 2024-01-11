import { useEffect } from "react";

function useKeyboardControls(
  moveLeft: () => void,
  moveRight: () => void,
  moveDown: () => void,
  rotate: () => void,
  dropTetromino: () => void,
  isPaused: boolean,
  controls: "wasd" | "arrows"
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isPaused) return;

      const keyBindings =
        controls === "wasd"
          ? {
              left: "a",
              right: "d",
              down: "s",
              rotate: "w",
              drop: "q",
            }
          : {
              left: "ArrowLeft",
              right: "ArrowRight",
              down: "ArrowDown",
              rotate: "ArrowUp",
              drop: " ",
            };

      switch (event.key) {
        case keyBindings.left:
          event.preventDefault();
          moveLeft();
          break;
        case keyBindings.right:
          event.preventDefault();
          moveRight();
          break;
        case keyBindings.down:
          event.preventDefault();
          moveDown();
          break;
        case keyBindings.rotate:
          event.preventDefault();
          rotate();
          break;
        case keyBindings.drop:
          event.preventDefault();
          dropTetromino();
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
