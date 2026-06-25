import { memo, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const iconSizeForCols = (cols) => {
  if (cols >= 6) return 20;
  if (cols === 5) return 24;
  return 28;
};

const shakeKeyframes = [0, -6, 6, -5, 5, -3, 3, 0];
const shakeTimes = [0, 0.15, 0.30, 0.45, 0.60, 0.72, 0.86, 1];

export const MemoryCard = memo(function MemoryCard({
  card,
  onClick,
  index,
  cols,
  isWrongPair,
  isShuffling,
}) {
  const { icon: Icon, label, color, isFlipped, isMatched, uid } = card;
  const revealed = isFlipped || isMatched;
  const interactable = !isMatched && !isShuffling;
  const iconSize = iconSizeForCols(cols ?? 4);
  const shakeCtrl = useAnimation();

  useEffect(() => {
    if (!isWrongPair) return;

    shakeCtrl.start({
      x: shakeKeyframes,
      transition: {
        duration: 0.38,
        times: shakeTimes,
        ease: "easeInOut",
      },
    });
  }, [isWrongPair, shakeCtrl]);

  const entranceDelay = isShuffling ? 0 : Math.min(index * 0.028, 0.55);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.25,
        delay: entranceDelay,
        ease: [0.34, 1.26, 0.64, 1],
      }}
      className="card-3d aspect-square"
    >
      <motion.div animate={shakeCtrl} className="w-full h-full">
        <motion.div
          whileHover={!revealed && interactable ? { y: -3, scale: 1.03 } : {}}
          whileTap={interactable ? { scale: 0.95 } : {}}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          className="w-full h-full"
        >
          <motion.div
            animate={{ rotateY: revealed ? 180 : 0 }}
            transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
            style={{
              transformStyle: "preserve-3d",
              position: "relative",
              width: "100%",
              height: "100%",
            }}
            role="button"
            tabIndex={interactable ? 0 : -1}
            aria-label={
              revealed
                ? `${label} card, ${isMatched ? "matched" : "revealed"}`
                : "Hidden card, click to reveal"
            }
            aria-pressed={isFlipped}
            aria-disabled={!interactable}
            onClick={() => interactable && onClick(uid)}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && interactable) {
                e.preventDefault();
                onClick(uid);
              }
            }}
            className={
              interactable
                ? "focus-ring rounded-xl cursor-pointer select-none"
                : "rounded-xl select-none"
            }
          >
            <div
              className="card-face card-back border border-border shadow-card flex items-center justify-center"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className="grid grid-cols-2 gap-1 w-6 h-6 opacity-35">
                <div className="rounded-sm bg-muted" />
                <div className="rounded-sm bg-muted" />
                <div className="rounded-sm bg-muted" />
                <div className="rounded-sm bg-muted" />
              </div>
            </div>

            <div
              className={`card-face card-front border shadow-card flex items-center justify-center ${
                isMatched
                  ? "border-success/30 bg-success/5 shadow-matched"
                  : "border-border"
              }`}
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <motion.div
                animate={isMatched ? { scale: [1, 1.22, 1] } : { scale: 1 }}
                transition={
                  isMatched
                    ? { duration: 0.32, ease: "easeOut" }
                    : {}
                }
                className="rounded-2xl p-2.5"
                style={{ backgroundColor: `${color}18` }}
              >
                <Icon
                  size={iconSize}
                  strokeWidth={1.75}
                  style={{ color }}
                  aria-hidden="true"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});