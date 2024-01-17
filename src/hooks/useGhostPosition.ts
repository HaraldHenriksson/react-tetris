import { checkCollision } from "@/components/GameCollision";
import { TetrominoType } from "@/types/types";
import { getCurrentTetrominoShape } from "@/utils/tetrisUtils";

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
