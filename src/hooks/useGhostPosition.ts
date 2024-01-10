import { checkCollision } from "@/components/GameCollision";
import { getCurrentTetrominoShape } from "@/utils/tetrisUtils";

type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

const useGhostPosition = (
  currentTetromino: TetrominoType,
  rotation: number,
  position: any,
  grid: any,
  gridWidth: any,
  gridHeight: any
) => {
  const calculateGhostPosition = () => {
    const currentShape = getCurrentTetrominoShape(currentTetromino, rotation);
    let ghostPosition = { ...position };

    while (
      !checkCollision({
        newPosition: { x: ghostPosition.x, y: ghostPosition.y + 1 },
        tetrominoShape: currentShape,
        grid,
        gridWidth,
        gridHeight,
      })
    ) {
      ghostPosition.y++;
    }

    return ghostPosition;
  };

  return calculateGhostPosition();
};

export default useGhostPosition;
