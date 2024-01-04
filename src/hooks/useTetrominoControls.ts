import { getCurrentTetrominoShape } from "@/utils/tetrisUtils";
import { checkCollision } from "@/components/GameCollision";
import { useCallback, useState } from "react";

interface Cell {
  filled: boolean;
  type: "I" | "O" | "T" | "S" | "Z" | "J" | "L" | null;
  color?: string;
}

interface Position {
  x: number;
  y: number;
}

interface TetrominoControlsProps {
  tetrominoType: "I" | "O" | "T" | "S" | "Z" | "J" | "L";
  position: Position;
  setPosition: (position: Position) => void;
  rotation: number;
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  grid: Cell[][];
  gridWidth: number;
  gridHeight: number;
  settleTetromino: (shape: number[][], position: Position) => void;
  spawnTetromino: () => void;
}

function useTetrominoControls({
  tetrominoType,
  position,
  setPosition,
  rotation,
  setRotation,
  grid,
  gridWidth,
  gridHeight,
  settleTetromino,
  spawnTetromino,
}: TetrominoControlsProps) {
  const moveLeft = useCallback(() => {
    const newPosition = { x: position.x - 1, y: position.y };
    const currentShape = getCurrentTetrominoShape(tetrominoType, rotation);

    if (
      !checkCollision({
        newPosition,
        tetrominoShape: currentShape as number[][],
        grid,
        gridWidth,
        gridHeight,
      })
    ) {
      setPosition(newPosition);
    }
  }, [position, rotation, grid, tetrominoType]);

  const moveRight = useCallback(() => {
    const newPosition = { x: position.x + 1, y: position.y };
    const currentShape = getCurrentTetrominoShape(tetrominoType, rotation);

    if (
      !checkCollision({
        newPosition,
        tetrominoShape: currentShape as number[][],
        grid,
        gridWidth,
        gridHeight,
      })
    ) {
      setPosition(newPosition);
    }
  }, [position, rotation, grid, tetrominoType]);

  const moveDown = useCallback(() => {
    const newPosition = { x: position.x, y: position.y + 1 };
    const currentShape = getCurrentTetrominoShape(tetrominoType, rotation);

    if (
      checkCollision({
        newPosition,
        tetrominoShape: currentShape as number[][],
        grid,
        gridWidth,
        gridHeight,
      })
    ) {
      settleTetromino(currentShape as number[][], position);
      spawnTetromino();
    } else {
      setPosition(newPosition);
    }
  }, [
    position,
    rotation,
    grid,
    tetrominoType,
    settleTetromino,
    spawnTetromino,
  ]);

  const rotate = useCallback(() => {
    setRotation((prev) => {
      const newRotation = (prev + 1) % 4;
      const currentShape = getCurrentTetrominoShape(tetrominoType, newRotation);

      // Check if the new shape would be outside the grid
      const collision = checkCollision({
        newPosition: position,
        tetrominoShape: currentShape,
        grid,
        gridWidth,
        gridHeight,
      });

      // If collision, don't rotate
      if (collision) {
        return prev;
      }

      // If no collision, rotate
      return newRotation;
    });
  }, [rotation, grid, tetrominoType, position]);

  return { moveLeft, moveRight, moveDown, rotate };
}

export default useTetrominoControls;
