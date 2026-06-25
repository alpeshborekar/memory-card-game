const STORAGE_KEY = "memory-game-best-scores";

export function getBestScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveBestScore(difficulty, { moves, time }) {
  try {
    const scores = getBestScores();
    const current = scores[difficulty];
    const isBetter =
      !current ||
      time < current.time ||
      (time === current.time && moves < current.moves);

    if (isBetter) {
      scores[difficulty] = { moves, time };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
