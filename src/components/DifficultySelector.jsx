import { DIFFICULTY } from "../constants/gameConfig";

export function DifficultySelector({ current, onChange, disabled }) {
  return (
    <div
      className="flex items-center gap-1 bg-card-back border border-border rounded-xl p-1 w-full sm:w-auto"
      role="radiogroup"
      aria-label="Select difficulty"
    >
      {Object.entries(DIFFICULTY).map(([key, config]) => {
        const isActive = current === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            disabled={disabled}
            role="radio"
            aria-checked={isActive}
            className={`
              flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-sm font-medium
              transition-all duration-150 focus-ring
              disabled:opacity-50 disabled:pointer-events-none
              ${isActive
                ? "bg-primary text-background shadow-card"
                : "text-muted hover:text-primary"
              }
            `}
          >
            <span className="block">{config.label}</span>
            {isActive && (
              <span className="block text-[10px] font-normal opacity-60 leading-tight mt-0.5">
                {config.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
