import { StatCard } from "./StatCard";
import { formatTime } from "../utils/helpers";

export function Stats({
  moves,
  seconds,
  matchedPairs,
  totalPairs,
  bestScores,
  difficulty,
}) {
  const best = bestScores[difficulty];

  return (
    <div
      className="grid gap-2.5 w-full"
      style={{
        gridTemplateColumns: `repeat(${best ? 4 : 3}, minmax(0, 1fr))`,
      }}
      role="region"
      aria-label="Game statistics"
    >
      <StatCard label="Moves" value={moves} />
      <StatCard label="Time" value={formatTime(seconds)} />
      <StatCard label="Pairs" value={`${matchedPairs}/${totalPairs}`} />

      {best && (
        <StatCard
          label="Best"
          value={formatTime(best.time)}
          sub={`${best.moves} moves`}
        />
      )}
    </div>
  );
}