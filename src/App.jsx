import { useEffect, useState, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import AppHeader from "./components/AppHeader";
import BottomNav from "./components/BottomNav";
import GameList from "./components/GameList";
import LibraryFilters from "./components/LibraryFilters";
import GameFormModal from "./components/GameFormModal";
import AboutPage from "./components/AboutPage";
import "./App.css";

function App() {
  const [games, setGames] = useState([]);
  const [runningGameIds, setRunningGameIds] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState(null);

  const [currentPage, setCurrentPage] = useState("library");

  // Load games from backend on mount
  useEffect(() => {
    invoke("load_games")
      .then((loaded) => setGames(loaded))
      .catch(() => {});
  }, []);

  // Poll running game IDs every 5 seconds
  useEffect(() => {
    async function checkRunning() {
      try {
        const ids = await invoke("get_running_games");
        setRunningGameIds(ids);
      } catch (_) {}
    }
    checkRunning();
    const interval = setInterval(checkRunning, 5000);
    return () => clearInterval(interval);
  }, []);

  function openAddModal() {
    setEditingGame(null);
    setModalOpen(true);
  }

  function openEditModal(game) {
    setEditingGame(game);
    setModalOpen(true);
  }

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingGame(null);
  }, []);

  async function handleSave(game) {
    const updated = editingGame
      ? games.map((g) => (g.id === game.id ? game : g))
      : [...games, game];
    setGames(updated);
    try {
      await invoke("save_games", { games: updated });
    } catch (e) {
      console.error("Failed to save games:", e);
    }
    closeModal();
  }

  async function handleDelete(id) {
    const updated = games.filter((g) => g.id !== id);
    setGames(updated);
    try {
      await invoke("save_games", { games: updated });
    } catch (e) {
      console.error("Failed to save games:", e);
    }
    closeModal();
  }

  return (
    <div className="w-full h-screen antialiased bg-[#0b1326] flex flex-col relative overflow-hidden">
      <AppHeader onAddGame={openAddModal} />

      <main className="flex-1 overflow-y-auto flex flex-col relative">
        {currentPage === "library" ? (
          <>
            <LibraryFilters />
            <GameList games={games} runningGameIds={runningGameIds} onEditGame={openEditModal} />
          </>
        ) : (
          <AboutPage />
        )}
      </main>

      <BottomNav currentPage={currentPage} onPageChange={setCurrentPage} />

      {modalOpen && (
        <GameFormModal
          game={editingGame}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
