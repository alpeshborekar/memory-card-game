import { RestartButton } from "./Restartbutton";

export function Header({ onRestart, isShuffling }) {
  return (
    <header className="flex items-center justify-between py-4 sm:py-5 px-4 sm:px-6 max-w-3xl mx-auto w-full">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
          <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
            <div className="rounded-sm bg-white opacity-90" />
            <div className="rounded-sm bg-white opacity-50" />
            <div className="rounded-sm bg-white opacity-50" />
            <div className="rounded-sm bg-white opacity-90" />
          </div>
        </div>
        <div>
          <h1 className="text-sm sm:text-base font-semibold text-primary leading-tight">Memory</h1>
          <p className="text-[10px] sm:text-xs text-muted leading-tight">Card Matching Game</p>
        </div>
      </div>

      <RestartButton onRestart={onRestart} isShuffling={isShuffling} />
    </header>
  );
}
