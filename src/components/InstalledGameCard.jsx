function InstalledGameCard() {
  return (
    <div className="group flex gap-3 items-center py-3 px-4 border-b border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer">
      <div className="w-11 h-16 bg-[#1E293B] border border-[#334155] rounded shrink-0 overflow-hidden group-hover:border-primary transition-colors relative shadow-sm">
        <img
          alt="Hades Cover"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPikQVcRM_Vw6zB4xxrMR3RMrXWatM7TKjpoI_W14ROUj6I-9h1DB22iL2rsdsW6cvIKSmE-t4vloYrhUHW6bcaMQNOU4Ret5dXSXaAn3TTZQbtHVeI0kohlseCJk2hcEaSMQjXoCuvC22afxvF6J0pLXPYmVrQ6ORWSFaKNMsf-51JZ_0HQrM1vsu5mBPdTeGE7ENL4ePUPkErrwzJv2V6K5yGILYGdTU_8P5qRniKjHfV8AO0fCpfaiOAvJN2_mFLEMS4yYv9TY"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex justify-between items-baseline mb-0.5">
          <h3 className="font-headline-sm text-[15px] text-on-surface truncate pr-2 leading-tight">Hades</h3>
          <span className="font-label-mono text-[10px] text-on-surface-variant shrink-0">210h</span>
        </div>
        <div className="flex flex-col gap-1 mt-0.5">
          <span className="font-label-mono text-[10px] text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">cloud_done</span> Cloud Sync
          </span>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-[1px] bg-[#334155] text-on-surface font-label-mono text-[9px] uppercase tracking-wider rounded">Roguelike</span>
          </div>
        </div>
      </div>
      <div className="shrink-0 pl-2">
        <button
          className="bg-primary hover:bg-primary-fixed text-[#0F172A] font-label-mono text-[10px] font-bold px-3 py-1.5 rounded w-[60px] transition-colors text-center shadow-[0_0_10px_rgba(137,206,255,0.2)]"
          type="button"
        >
          PLAY
        </button>
      </div>
    </div>
  );
}

export default InstalledGameCard;
