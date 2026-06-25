import { Header } from "./components/Header";
import { Stats } from "./components/Stats";
import { GameBoard } from "./components/GameBoard";
import { DifficultySelector } from "./components/DifficultySelector";
import { WinModal } from "./components/WinModal";
import { useMemoryGame } from "./hooks/useMemoryGame";
import { DIFFICULTY } from "./constants/gameConfig";

export default function App() {
  const {
    cards,
    moves,
    matchedPairs,
    totalPairs,
    difficulty,
    isWon,
    isNewBest,
    isShuffling,
    wrongPairUids,
    timer,
    bestScores,
    restartId,
    handleCardClick,
    restart,
    changeDifficulty,
  } = useMemoryGame();

  const { cols } = DIFFICULTY[difficulty];
  const boardKey = `${difficulty}-${restartId}`;

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <Header onRestart={restart} isShuffling={isShuffling} />

      <main className="flex-1 flex flex-col items-center gap-5 sm:gap-6 px-3 sm:px-4 pb-8 pt-2 w-full max-w-3xl mx-auto">
        <Stats
          moves={moves}
          seconds={timer.seconds}
          matchedPairs={matchedPairs}
          totalPairs={totalPairs}
          bestScores={bestScores}
          difficulty={difficulty}
        />

        <DifficultySelector
          current={difficulty}
          onChange={changeDifficulty}
          disabled={isShuffling}
        />

        <GameBoard
          cards={cards}
          onCardClick={handleCardClick}
          cols={cols}
          wrongPairUids={wrongPairUids}
          isShuffling={isShuffling}
          boardKey={boardKey}
        />
      </main>

      <WinModal
        isOpen={isWon}
        moves={moves}
        seconds={timer.seconds}
        isNewBest={isNewBest}
        totalPairs={totalPairs}
        onRestart={restart}
      />
    </div>
  );
}