import { useState, useCallback, useRef, useMemo } from "react";
import { CARD_DEFINITIONS } from "../data/cards";
import { DIFFICULTY, DEFAULT_DIFFICULTY } from "../constants/gameConfig";
import { shuffle } from "../utils/shuffle";
import { buildDeck } from "../utils/helpers";
import { saveBestScore, getBestScores } from "../utils/storage";
import { useTimer } from "./useTimer";

function createShuffledDeck(difficulty) {
  const { pairs } = DIFFICULTY[difficulty];
  return shuffle(buildDeck(CARD_DEFINITIONS, pairs));
}

export function useMemoryGame() {
  const [difficulty, setDifficulty] = useState(DEFAULT_DIFFICULTY);
  const [cards, setCards] = useState(() => createShuffledDeck(DEFAULT_DIFFICULTY));
  const [flippedUids, setFlippedUids] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [wrongPairUids, setWrongPairUids] = useState([]);
  const [restartId, setRestartId] = useState(0);

  const timer = useTimer();
  const hasStarted = useRef(false);
  const flipBackTimeoutRef = useRef(null);
  const shuffleTimeoutRef = useRef(null);
  const gameIdRef = useRef(0);

  const totalPairs = DIFFICULTY[difficulty].pairs;

  const bestScores = useMemo(() => getBestScores(), [isWon]);

  const clearPendingTimers = useCallback(() => {
    if (flipBackTimeoutRef.current !== null) {
      clearTimeout(flipBackTimeoutRef.current);
      flipBackTimeoutRef.current = null;
    }
    if (shuffleTimeoutRef.current !== null) {
      clearTimeout(shuffleTimeoutRef.current);
      shuffleTimeoutRef.current = null;
    }
  }, []);

  const handleCardClick = useCallback(
    (uid) => {
      if (isLocked || isShuffling || isWon) return;
      if (flippedUids.includes(uid)) return;
      if (cards.find((c) => c.uid === uid)?.isMatched) return;

      if (!hasStarted.current) {
        hasStarted.current = true;
        timer.start();
      }

      const nextFlipped = [...flippedUids, uid];

      setCards((prev) =>
        prev.map((c) => (c.uid === uid ? { ...c, isFlipped: true } : c))
      );
      setFlippedUids(nextFlipped);

      if (nextFlipped.length < 2) return;

      setIsLocked(true);
      setMoves((m) => m + 1);

      const [firstUid, secondUid] = nextFlipped;
      const first = cards.find((c) => c.uid === firstUid);
      const second = cards.find((c) => c.uid === secondUid);
      const isMatch = first && second && first.pairIndex === second.pairIndex;

      if (isMatch) {
        const nextMatchedPairs = matchedPairs + 1;
        setCards((prev) =>
          prev.map((c) =>
            c.uid === firstUid || c.uid === secondUid
              ? { ...c, isMatched: true }
              : c
          )
        );
        setMatchedPairs(nextMatchedPairs);
        setFlippedUids([]);
        setIsLocked(false);

        if (nextMatchedPairs === totalPairs) {
          timer.stop();
          const newBest = saveBestScore(difficulty, {
            moves: moves + 1,
            time: timer.seconds,
          });
          setIsNewBest(newBest);
          setIsWon(true);
        }
      } else {
        setWrongPairUids([firstUid, secondUid]);
        const currentGameId = gameIdRef.current;
        const delay = DIFFICULTY[difficulty].flipBackDelay;

        flipBackTimeoutRef.current = setTimeout(() => {
          if (gameIdRef.current !== currentGameId) return;
          setCards((prev) =>
            prev.map((c) =>
              c.uid === firstUid || c.uid === secondUid
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedUids([]);
          setWrongPairUids([]);
          setIsLocked(false);
          flipBackTimeoutRef.current = null;
        }, delay);
      }
    },
    [cards, flippedUids, isLocked, isShuffling, isWon, matchedPairs, moves, difficulty, timer, totalPairs]
  );

  const restart = useCallback(
    (difficultyOverride) => {
      const target = difficultyOverride ?? difficulty;

      clearPendingTimers();
      gameIdRef.current += 1;
      const currentGameId = gameIdRef.current;

      timer.reset();
      hasStarted.current = false;
      setIsShuffling(true);
      setIsLocked(true);
      setFlippedUids([]);
      setMoves(0);
      setMatchedPairs(0);
      setIsWon(false);
      setIsNewBest(false);
      setWrongPairUids([]);
      setCards(createShuffledDeck(target));
      setRestartId((id) => id + 1);

      shuffleTimeoutRef.current = setTimeout(() => {
        if (gameIdRef.current !== currentGameId) return;
        setIsShuffling(false);
        setIsLocked(false);
        shuffleTimeoutRef.current = null;
      }, 700);
    },
    [difficulty, timer, clearPendingTimers]
  );

  const changeDifficulty = useCallback(
    (next) => {
      if (next === difficulty) return;
      setDifficulty(next);
      restart(next);
    },
    [difficulty, restart]
  );

  return {
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
  };
}