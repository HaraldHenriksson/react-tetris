import { useEffect } from "react";

function useAutoDrop(moveDown: () => void, score: number) {
  useEffect(() => {
    const speed = 1000 - Math.min(Math.floor(score / 100) * 100, 500);
    const drop = setInterval(moveDown, speed);

    return () => clearInterval(drop);
  }, [moveDown, score]);
}

export default useAutoDrop;
