export const DIFFICULTY = {
  easy: {
    label: "Easy",
    rows: 4,
    cols: 4,
    pairs: 8,
    flipBackDelay: 1200,
    description: "4×4 board • 8 pairs",
  },
  medium: {
    label: "Medium",
    rows: 4,
    cols: 5,
    pairs: 10,
    flipBackDelay: 900,
    description: "5×4 board • 10 pairs",
  },
  hard: {
    label: "Hard",
    rows: 6,
    cols: 6,
    pairs: 18,
    flipBackDelay: 700,
    description: "6×6 board • 18 pairs",
  },
};

export const DEFAULT_DIFFICULTY = "medium";