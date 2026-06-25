import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MemoryCard } from "./MemoryCard";

export const GameBoard = memo(function GameBoard({
  cards,
  onCardClick,
  cols,
  wrongPairUids,
  isShuffling,
  boardKey,
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={boardKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.15 }}
        className="w-full mx-auto"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "clamp(4px, 1.5vw, 12px)",
          maxWidth: cols <= 4 ? "360px" : cols === 5 ? "440px" : "520px",
        }}
        role="grid"
        aria-label="Memory card grid"
      >
        {cards.map((card, index) => (
          <MemoryCard
            key={card.uid}
            card={card}
            index={index}
            onClick={onCardClick}
            cols={cols}
            isWrongPair={wrongPairUids.includes(card.uid)}
            isShuffling={isShuffling}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
});