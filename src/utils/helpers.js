export function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function buildDeck(cardDefinitions, count) {
  return cardDefinitions.slice(0, count).flatMap((def, index) => [
    { ...def, uid: `${def.id}-a`, pairIndex: index, isFlipped: false, isMatched: false },
    { ...def, uid: `${def.id}-b`, pairIndex: index, isFlipped: false, isMatched: false },
  ]);
}
