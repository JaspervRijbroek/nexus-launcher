import { invoke } from "@tauri-apps/api/core";

function GameCard({ game, isRunning, onEdit }) {
  async function handlePlay() {
    try {
      await invoke("launch_game", {
        gameId: game.id,
        gamePath: game.game_path,
        trainerPath: game.trainer_path,
        trainerShortcuts: game.trainer_shortcuts ?? null,
      });
    } catch (e) {
      console.error("Failed to launch game:", e);
    }
  }

  return (
    <div className="group flex gap-3 items-center py-3 px-4 border-b border-outline-variant hover:bg-surface-container-low transition-colors">
      {/* Cover placeholder */}
      <div className="w-11 h-16 bg-[#1E293B] border border-[#334155] rounded shrink-0 overflow-hidden group-hover:border-primary transition-colors relative shadow-sm flex items-center justify-center">
        <span
          className="material-symbols-outlined text-[22px] text-on-surface-variant/40"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          sports_esports
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="font-headline-sm text-[15px] text-on-surface truncate leading-tight mb-0.5">
          {game.name}
        </h3>
        <div className="flex flex-col gap-1 mt-0.5">
          {isRunning ? (
            <div className="flex items-center gap-1.5 font-label-mono text-[10px]">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary" />
              </span>
              <span className="text-secondary">Running</span>
            </div>
          ) : (
            <span className="font-label-mono text-[10px] text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">videogame_asset</span>
              Installed
            </span>
          )}
          {game.trainer_shortcuts && (
            <span className="font-label-mono text-[9px] text-on-surface-variant/60 truncate">
              {game.trainer_shortcuts}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="shrink-0 flex items-center gap-1.5 pl-1">
        <button
          className="text-on-surface-variant hover:text-primary transition-colors p-1"
          onClick={() => onEdit(game)}
          title="Edit game"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">edit</span>
        </button>
        <button
          className={
            isRunning
              ? "bg-transparent border border-error hover:bg-error-container/20 text-error font-label-mono text-[10px] px-3 py-1.5 rounded w-[60px] transition-colors text-center"
              : "bg-primary hover:bg-primary-fixed text-[#0F172A] font-label-mono text-[10px] font-bold px-3 py-1.5 rounded w-[60px] transition-colors text-center shadow-[0_0_10px_rgba(137,206,255,0.2)]"
          }
          onClick={handlePlay}
          type="button"
        >
          {isRunning ? "STOP" : "PLAY"}
        </button>
      </div>
    </div>
  );
}

export default GameCard;
