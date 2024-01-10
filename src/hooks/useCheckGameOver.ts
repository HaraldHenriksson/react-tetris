import { checkCollision } from "@/components/GameCollision";
import { getCurrentTetrominoShape } from "@/utils/tetrisUtils";
import { useCallback } from "react";

type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

const useCheckGameOver = (
  currentTetromino: TetrominoType,
  rotation: number,
  grid: any,
  gridWidth: number,
  gridHeight: number
) => {
  const checkGameOver = useCallback((): boolean => {
    const initialPosition = { x: 4, y: 0 };
    const currentShape = getCurrentTetrominoShape(currentTetromino, rotation);

    return checkCollision({
      newPosition: initialPosition,
      tetrominoShape: currentShape,
      grid,
      gridWidth,
      gridHeight,
    });
  }, [currentTetromino, rotation, grid, gridWidth, gridHeight]);

  return checkGameOver;
};

export default useCheckGameOver;
