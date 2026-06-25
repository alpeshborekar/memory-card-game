import { forwardRef } from "react";
import { motion } from "framer-motion";

export const Button = forwardRef(function Button(
  { children, onClick, variant = "primary", size = "md", className = "", ...props },
  ref
) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-colors duration-150 focus-ring disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:   "bg-primary text-background hover:bg-primary/90",
    secondary: "bg-card-back text-primary border border-border hover:bg-border",
    accent:    "bg-accent text-white hover:bg-accent/90",
    ghost:     "text-primary hover:bg-border/60",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
});