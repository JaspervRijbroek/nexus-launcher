import GameCard from "./GameCard";

function GameList({ games, runningGameIds, onEditGame }) {
  if (!games.length) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-16 gap-3 text-on-surface-variant">
        <span
          className="material-symbols-outlined text-[48px] opacity-30"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          sports_esports
        </span>
        <p className="font-label-mono text-[11px] opacity-50">No games yet. Add one above.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          isRunning={runningGameIds.includes(game.id)}
          onEdit={onEditGame}
        />
      ))}
    </div>
  );
}

export default GameList;
