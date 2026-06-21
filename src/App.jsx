import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import "./App.css";

function GameModal({ game, onSave, onClose }) {
  const [name, setName] = useState(game?.name ?? "");
  const [gamePath, setGamePath] = useState(game?.game_path ?? "");
  const [trainerPath, setTrainerPath] = useState(game?.trainer_path ?? "");

  async function pickFile(setter) {
    const selected = await open({
      multiple: false,
      filters: [{ name: "Executable", extensions: ["exe", "*"] }],
    });
    if (selected) setter(selected);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const id = game?.id ?? (await invoke("generate_id"));
    onSave({ id, name, game_path: gamePath, trainer_path: trainerPath });
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{game ? "Edit Game" : "Add Game"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Game Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Elden Ring"
              required
            />
          </label>
          <label>
            Game Executable
            <div className="path-row">
              <input
                value={gamePath}
                onChange={(e) => setGamePath(e.target.value)}
                placeholder="Path to game .exe"
                required
              />
              <button type="button" className="btn-pick" onClick={() => pickFile(setGamePath)}>
                Browse
              </button>
            </div>
          </label>
          <label>
            Trainer Executable
            <div className="path-row">
              <input
                value={trainerPath}
                onChange={(e) => setTrainerPath(e.target.value)}
                placeholder="Path to trainer .exe"
                required
              />
              <button type="button" className="btn-pick" onClick={() => pickFile(setTrainerPath)}>
                Browse
              </button>
            </div>
          </label>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function GameCard({ game, onEdit, onDelete, onLaunch }) {
  const [launching, setLaunching] = useState(false);
  const [error, setError] = useState(null);

  async function handleLaunch() {
    setLaunching(true);
    setError(null);
    try {
      await invoke("launch_game", {
        gamePath: game.game_path,
        trainerPath: game.trainer_path,
      });
    } catch (err) {
      setError(String(err));
    } finally {
      setLaunching(false);
    }
  }

  function truncatePath(p) {
    if (!p) return "";
    return p.length > 50 ? "…" + p.slice(p.length - 47) : p;
  }

  return (
    <div className="game-card">
      <div className="game-card-header">
        <span className="game-name">{game.name}</span>
        <div className="card-actions">
          <button className="btn-icon" title="Edit" onClick={() => onEdit(game)}>✏️</button>
          <button className="btn-icon" title="Remove" onClick={() => onDelete(game.id)}>🗑️</button>
        </div>
      </div>
      <div className="game-paths">
        <div className="path-entry">
          <span className="path-label">Game</span>
          <span className="path-value" title={game.game_path}>{truncatePath(game.game_path)}</span>
        </div>
        <div className="path-entry">
          <span className="path-label">Trainer</span>
          <span className="path-value" title={game.trainer_path}>{truncatePath(game.trainer_path)}</span>
        </div>
      </div>
      {error && <div className="launch-error">{error}</div>}
      <button
        className="btn-launch"
        onClick={handleLaunch}
        disabled={launching}
      >
        {launching ? "Launching…" : "▶ Launch"}
      </button>
    </div>
  );
}

function App() {
  const [games, setGames] = useState([]);
  const [modalGame, setModalGame] = useState(undefined); // undefined = closed, null = new, object = edit
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    invoke("load_games")
      .then((g) => setGames(g))
      .catch(console.error)
      .finally(() => setLoaded(true));
  }, []);

  async function persistGames(updated) {
    setGames(updated);
    await invoke("save_games", { games: updated }).catch(console.error);
  }

  function handleSave(saved) {
    const existing = games.findIndex((g) => g.id === saved.id);
    const updated =
      existing >= 0
        ? games.map((g) => (g.id === saved.id ? saved : g))
        : [...games, saved];
    persistGames(updated);
    setModalGame(undefined);
  }

  function handleDelete(id) {
    persistGames(games.filter((g) => g.id !== id));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>⚡ Nexus Launcher</h1>
        <button className="btn-primary" onClick={() => setModalGame(null)}>
          + Add Game
        </button>
      </header>

      <main className="game-grid">
        {loaded && games.length === 0 && (
          <div className="empty-state">
            <p>No games added yet.</p>
            <button className="btn-primary" onClick={() => setModalGame(null)}>
              Add your first game
            </button>
          </div>
        )}
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onEdit={(g) => setModalGame(g)}
            onDelete={handleDelete}
          />
        ))}
      </main>

      {modalGame !== undefined && (
        <GameModal
          game={modalGame}
          onSave={handleSave}
          onClose={() => setModalGame(undefined)}
        />
      )}
    </div>
  );
}

export default App;
