function RunningGameCard({ isRunning }) {
  return (
    <div className="group flex gap-3 items-center py-3 px-4 border-b border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer">
      <div className="w-11 h-16 bg-[#1E293B] border border-[#334155] rounded shrink-0 overflow-hidden group-hover:border-primary transition-colors relative shadow-sm">
        <img
          alt="Elden Ring Cover"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCa5atYDFopfmOaemZK5sP9ELuXeAhlr5lcJ-S2b-RZ_qxLuUEGvU7QnDRldAgnAHKu0UKpavFTw95vUX-ImXkOiKbKoc2GQ-qraxrZv43UUVn5Sjvv70nwmxAY8M63xKYeGUyWEfodtwn7KapbzcXxXX-vwvN5H_Q8_jfexqPSVS_AvJ6IowXYgwyhpQ4NWxC9tsU7-FYACseaAZxPJkxsctckzdXPVMlGy2PJjca83EuZyeZoAWCE8VnCp2SZlIX8qPlwrGbEfSo"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex justify-between items-baseline mb-0.5">
          <h3 className="font-headline-sm text-[15px] text-on-surface truncate pr-2 leading-tight">Elden Ring</h3>
          <span className="font-label-mono text-[10px] text-on-surface-variant shrink-0">142h</span>
        </div>
        <div className="flex flex-col gap-1 mt-0.5">
          {isRunning ? (
            <div className="flex items-center gap-1.5 font-label-mono text-[10px]">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary" />
              </span>
              <span className="text-secondary">Running</span>
              <span className="text-on-surface-variant opacity-80">02:15:30</span>
            </div>
          ) : (
            <span className="font-label-mono text-[10px] text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">pause_circle</span> Not Running
            </span>
          )}
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-[1px] bg-[#334155] text-on-surface font-label-mono text-[9px] uppercase tracking-wider rounded">RPG</span>
            <span className="material-symbols-outlined text-[12px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              link
            </span>
          </div>
        </div>
      </div>
      <div className="shrink-0 pl-2">
        <button
          className={
            isRunning
              ? "bg-transparent border border-error hover:bg-error-container/20 text-error font-label-mono text-[10px] px-3 py-1.5 rounded w-[60px] transition-colors text-center"
              : "bg-primary hover:bg-primary-fixed text-[#0F172A] font-label-mono text-[10px] font-bold px-3 py-1.5 rounded w-[60px] transition-colors text-center shadow-[0_0_10px_rgba(137,206,255,0.2)]"
          }
          type="button"
        >
          {isRunning ? "STOP" : "PLAY"}
        </button>
      </div>
    </div>
  );
}

export default RunningGameCard;
