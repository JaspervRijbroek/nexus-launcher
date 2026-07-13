import DownloadingGameCard from "./DownloadingGameCard";
import InstalledGameCard from "./InstalledGameCard";
import RunningGameCard from "./RunningGameCard";

function GameList({ isEldenRingRunning }) {
  return (
    <div className="flex flex-col">
      <RunningGameCard isRunning={isEldenRingRunning} />
      <DownloadingGameCard />
      <InstalledGameCard />
    </div>
  );
}

export default GameList;
