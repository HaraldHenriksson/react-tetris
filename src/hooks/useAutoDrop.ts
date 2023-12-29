import { useEffect, useRef } from "react";

function useAutoDrop(moveDown: () => void, score: number) {
  const moveDownRef = useRef(moveDown);
  const lastTimeRef = useRef(performance.now());
  const speedRef = useRef(1000 - Math.min(Math.floor(score / 100) * 100, 500));

  // Update the refs when moveDown/score changes
  useEffect(() => {
    moveDownRef.current = moveDown;
    speedRef.current = 1000 - Math.min(Math.floor(score / 100) * 100, 500);
  }, [moveDown, score]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = (time: number) => {
      if (time - lastTimeRef.current > speedRef.current) {
        moveDownRef.current();
        lastTimeRef.current = time;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
}

export default useAutoDrop;
