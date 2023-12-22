interface CheckCollisionProps {
  newPosition: { x: number; y: number };
  tetrominoShape: number[][];
  grid: boolean[][];
  gridWidth: number;
  gridHeight: number;
}

export default function GameCollision({
  newPosition,
  tetrominoShape,
  grid,
  gridWidth,
  gridHeight,
}: CheckCollisionProps) {
  const checkCollision = () => {
    for (let y = 0; y < tetrominoShape.length; y++) {}
    return false;
  };

  return null;
}
