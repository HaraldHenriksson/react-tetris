const SCORES: { [key: number]: number } = { 1: 40, 2: 100, 3: 300, 4: 1200 };

// Function to calculate score for line clears
export const calculateScoreForLines = (
  level: number,
  linesCleared: number
): number => {
  const baseScore = SCORES[linesCleared] || 0;
  return baseScore * level;
};

export const calculateTotalScore = (
  currentScore: number,
  additionalScore: number
): number => {
  return currentScore + additionalScore;
};

//build test
