import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Clock, Zap, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "./Button";
import { formatTime } from "../utils/helpers";

const CONFETTI_COLORS = ["#D97757", "#7BAE7F", "#2E2A27", "#E7DDCF"];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: "easeOut",
    },
  },
};

export function WinModal({
  isOpen,
  moves,
  seconds,
  isNewBest,
  totalPairs,
  onRestart,
}) {
  const restartRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.55 },
      colors: CONFETTI_COLORS,
      disableForReducedMotion: true,
    });

    const confettiTimer = setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.5, x: 0.2 },
        colors: CONFETTI_COLORS,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.5, x: 0.8 },
        colors: CONFETTI_COLORS,
        disableForReducedMotion: true,
      });
    }, 250);

    const focusTimer = setTimeout(() => restartRef.current?.focus(), 120);

    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(focusTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onRestart();
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        restartRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onRestart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-primary/30 backdrop-blur-[2px] z-40"
            onClick={onRestart}
            aria-hidden="true"
          />

          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="win-title"
            initial={{ opacity: 0, scale: 0.86, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{
              type: "spring",
              damping: 24,
              stiffness: 340,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              className="bg-card-front border border-border rounded-3xl shadow-modal w-full max-w-sm p-6 sm:p-8 text-center"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div
                className="flex justify-center mb-4"
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  damping: 13,
                  stiffness: 280,
                  delay: 0.08,
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Trophy
                    size={26}
                    className="text-accent"
                    aria-hidden="true"
                  />
                </div>
              </motion.div>

              <motion.h2
                id="win-title"
                variants={itemVariants}
                className="text-xl sm:text-2xl font-semibold text-primary mb-1"
              >
                Puzzle solved!
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-muted text-sm mb-5"
              >
                All {totalPairs} pairs matched. Well played.
              </motion.p>

              {isNewBest && (
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center gap-1.5 bg-success/10 border border-success/25 text-success rounded-xl px-4 py-2 mb-4 text-sm font-medium"
                >
                  <Star
                    size={13}
                    fill="currentColor"
                    aria-hidden="true"
                  />
                  New personal best!
                </motion.div>
              )}

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-3 mb-6"
              >
                <div className="bg-background border border-border rounded-2xl p-3 sm:p-4">
                  <div className="flex items-center justify-center gap-1.5 text-muted mb-1">
                    <Clock
                      size={13}
                      aria-hidden="true"
                    />
                    <span className="text-xs">Time</span>
                  </div>

                  <p className="text-lg sm:text-xl font-semibold text-primary tabular-nums">
                    {formatTime(seconds)}
                  </p>
                </div>

                <div className="bg-background border border-border rounded-2xl p-3 sm:p-4">
                  <div className="flex items-center justify-center gap-1.5 text-muted mb-1">
                    <Zap
                      size={13}
                      aria-hidden="true"
                    />
                    <span className="text-xs">Moves</span>
                  </div>

                  <p className="text-lg sm:text-xl font-semibold text-primary tabular-nums">
                    {moves}
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  ref={restartRef}
                  variant="accent"
                  size="lg"
                  onClick={onRestart}
                  className="w-full"
                >
                  Play again
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}