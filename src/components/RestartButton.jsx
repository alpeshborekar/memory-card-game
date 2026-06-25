import { motion, useAnimation } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { Button } from "./Button";

export function RestartButton({ onRestart, isShuffling }) {
  const iconCtrl = useAnimation();

  const handleClick = () => {
    iconCtrl
      .start({
        rotate: -360,
        transition: { duration: 0.45, ease: "easeInOut" },
      })
      .then(() => iconCtrl.set({ rotate: 0 }));
    onRestart();
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleClick}
      disabled={isShuffling}
      aria-label="Restart game"
    >
      <motion.span animate={iconCtrl} style={{ display: "flex" }}>
        <RotateCcw size={13} aria-hidden="true" />
      </motion.span>
      Restart
    </Button>
  );
}