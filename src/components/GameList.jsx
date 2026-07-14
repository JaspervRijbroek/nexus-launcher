import { useEffect, useRef } from "react";
import DownloadingGameCard from "./DownloadingGameCard";
import InstalledGameCard from "./InstalledGameCard";
import RunningGameCard from "./RunningGameCard";

function GameList({ isEldenRingRunning }) {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  useEffect(() => {
    const refs = [ref1, ref2, ref3];
    function handleKeyDown(e) {
      // Support both regular number row (Digit1-3) and numpad (Numpad1-3)
      const map = { Digit1: 0, Numpad1: 0, Digit2: 1, Numpad2: 1, Digit3: 2, Numpad3: 2 };
      const idx = map[e.code];
      if (idx !== undefined && refs[idx].current) {
        refs[idx].current.click();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col">
      <RunningGameCard isRunning={isEldenRingRunning} shortcutKey="NUM 1" actionRef={ref1} />
      <DownloadingGameCard shortcutKey="NUM 2" actionRef={ref2} />
      <InstalledGameCard shortcutKey="NUM 3" actionRef={ref3} />
    </div>
  );
}

export default GameList;
