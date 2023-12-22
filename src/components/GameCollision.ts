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
  // loop each row in the tetromino shape
  for (let y = 0; y < tetrominoShape.length; y++) {
    // loop each cell
    for (let x = 0; x < tetrominoShape[y].length; x++) {
      // check if cell is empty
      if (tetrominoShape[y][x] === 0) continue;

      // check corrdinates
      const newY = y + newPosition.y;
      const newX = x + newPosition.x;

      // check if cell is outside of the grid
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

  // no collision
  return false;
};
