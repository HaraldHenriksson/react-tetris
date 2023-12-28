import Tetrominos from "@/components/Tetromino";

export const getCurrentTetrominoShape = (
  type: keyof typeof Tetrominos,
  rotation: number
): number[][] => {
  const tetromino = Tetrominos[type];
  return tetromino.shapes[rotation % tetromino.shapes.length];
};
