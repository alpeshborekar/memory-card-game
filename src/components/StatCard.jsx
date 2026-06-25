import { AnimatePresence, motion } from "framer-motion";

export function StatCard({ label, value, sub }) {
  const displayValue = String(value);

  return (
    <div className="bg-card-back border border-border rounded-2xl px-3 py-2.5 text-center min-w-0">
      <p className="text-[11px] text-muted font-medium uppercase tracking-wide mb-1 truncate">
        {label}
      </p>

      <div className="relative overflow-hidden h-6 flex items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={displayValue}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-base font-semibold text-primary tabular-nums leading-none absolute"
          >
            {displayValue}
          </motion.p>
        </AnimatePresence>
      </div>

      {sub && (
        <p className="text-[11px] text-muted mt-0.5 truncate">{sub}</p>
      )}
    </div>
  );
}