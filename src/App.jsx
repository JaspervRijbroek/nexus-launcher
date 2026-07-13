import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import AppHeader from "./components/AppHeader";
import BottomNav from "./components/BottomNav";
import GameList from "./components/GameList";
import LibraryFilters from "./components/LibraryFilters";
import "./App.css";

function App() {
  const [runningGameIds, setRunningGameIds] = useState([]);

  useEffect(() => {
    async function checkRunning() {
      try {
        const ids = await invoke("get_running_games");
        setRunningGameIds(ids);
      } catch (_) {
        // ignore errors (e.g. running in a browser without Tauri)
      }
    }

    checkRunning();
    const interval = setInterval(checkRunning, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen antialiased bg-black p-0 sm:p-4 flex justify-center items-center">
      <div className="w-full h-screen sm:h-[800px] max-w-[420px] bg-[#0F172A] sm:rounded-xl border-x sm:border border-outline-variant flex flex-col relative overflow-hidden shadow-2xl">
        <AppHeader />

        <main className="flex-1 overflow-y-auto flex flex-col relative">
          <LibraryFilters />
          <GameList isEldenRingRunning={runningGameIds.includes("elden-ring")} />
        </main>

        <BottomNav />
      </div>
    </div>
  );
}

export default App;
