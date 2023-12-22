interface CheckCollisionProps {
  newPosition: { x: number; y: number };
  tetrominoShape: number[][];
  grid: boolean[][];
  gridWidth: number;
  gridHeight: number;
}

export const checkCollision = ({
  newPosition,
  tetrominoShape,
  grid,
  gridWidth,
  gridHeight,
}: CheckCollisionProps): boolean => {
  for (let y = 0; y < tetrominoShape.length; y++) {
    for (let x = 0; x < tetrominoShape[y].length; x++) {
      if (tetrominoShape[y][x] === 0) continue;
      const newY = y + newPosition.y;
      const newX = x + newPosition.x;
      if (
        newY >= gridHeight ||
        newX < 0 ||
        newX >= gridWidth ||
        grid[newY][newX]
      ) {
        return true;
      }
    }
  }
  return false;
};
