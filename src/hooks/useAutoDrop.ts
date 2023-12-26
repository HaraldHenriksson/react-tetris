import { useEffect } from "react";

function useAutoDrop(moveDown: () => void, score: number) {
  useEffect(() => {
    const speed = 1000 - Math.min(score, 500);
    const drop = setInterval(moveDown, speed);

    return () => clearInterval(drop);
  }, [moveDown, score]);
}

export default useAutoDrop;
