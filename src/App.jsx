import "./App.css";

function App() {
  return (
    <div className="min-h-screen antialiased bg-black p-0 sm:p-4 flex justify-center items-center">
      <div className="w-full h-screen sm:h-[800px] max-w-[420px] bg-[#0F172A] sm:rounded-xl border-x sm:border border-outline-variant flex flex-col relative overflow-hidden shadow-2xl">
        <header className="bg-surface-container/60 backdrop-blur-xl w-full border-b border-outline-variant flex justify-between items-center px-4 h-14 shrink-0 z-40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">sports_esports</span>
            <h1 className="font-headline-sm text-base text-primary tracking-tight leading-none mt-0.5">
              Nexus <span className="text-on-surface-variant font-label-mono text-[10px] ml-1">v1.0.4</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center" type="button">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto flex flex-col relative">
          <div className="sticky top-0 bg-[#0F172A]/95 backdrop-blur-sm z-30 px-4 py-3 border-b border-outline-variant flex justify-between items-center">
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-[#334155] text-on-surface font-label-mono text-[11px] rounded border border-[#334155]" type="button">
                All
              </button>
              <button
                className="px-3 py-1 bg-transparent text-on-surface-variant font-label-mono text-[11px] rounded border border-outline-variant hover:border-[#334155] transition-colors"
                type="button"
              >
                Installed
              </button>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center" type="button">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
            </button>
          </div>

          <div className="flex flex-col">
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
                  <div className="flex items-center gap-1.5 font-label-mono text-[10px]">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary" />
                    </span>
                    <span className="text-secondary">Running</span>
                    <span className="text-on-surface-variant opacity-80">02:15:30</span>
                  </div>
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
                  className="bg-transparent border border-error hover:bg-error-container/20 text-error font-label-mono text-[10px] px-3 py-1.5 rounded w-[60px] transition-colors text-center"
                  type="button"
                >
                  STOP
                </button>
              </div>
            </div>

            <div className="group flex gap-3 items-center py-3 px-4 border-b border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer">
              <div className="w-11 h-16 bg-[#1E293B] border border-[#334155] rounded shrink-0 overflow-hidden group-hover:border-primary transition-colors relative shadow-sm">
                <img
                  alt="Cyberpunk 2077 Cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRwTAZvd_ZlCB19S-AX234xLjCou80xt4o4QuF-OR-dom_lDUcUBHgtnZHvK8RxlQY6khsLNM0H8T2zq5zvwNW0iq-_VnhVdN1O3enM_G1pluMrQ6t1n71p8KCIfre84cjP4Af39WosLO-n5YIQHkPjHmvLLYljgg23Oh-5ZpEWy19iNsiMopebD4c9qaTO7r2hOUzL7tHWtAMnHTLjIZFrvSjrjEQim9nbsSKhgslXPc4evPzyFo9SdjcdKluY-n9fab8MgvM6tI"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-headline-sm text-[15px] text-on-surface truncate pr-2 leading-tight">Cyberpunk 2077</h3>
                  <span className="font-label-mono text-[10px] text-on-surface-variant shrink-0">87h</span>
                </div>
                <div className="w-full mt-0.5">
                  <div className="flex justify-between font-label-mono text-[9px] mb-1">
                    <span className="text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px]">download</span> Downloading...
                    </span>
                    <span className="text-on-surface-variant">45%</span>
                  </div>
                  <div className="h-1 bg-[#334155] w-full rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "45%" }} />
                  </div>
                </div>
              </div>
              <div className="shrink-0 pl-2">
                <button
                  className="bg-transparent border border-outline hover:border-on-surface text-on-surface font-label-mono text-[10px] px-3 py-1.5 rounded w-[60px] transition-colors text-center"
                  type="button"
                >
                  PAUSE
                </button>
              </div>
            </div>

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
          </div>
        </main>

        <nav className="bg-surface-container-low border-t border-outline-variant flex justify-around items-center h-[60px] shrink-0 pb-safe z-50">
          <a className="flex flex-col items-center justify-center gap-1 text-primary w-full h-full hover:bg-surface-container-highest/30 transition-colors relative" href="#">
            <span className="absolute top-0 w-8 h-0.5 bg-primary rounded-b" />
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              sports_esports
            </span>
            <span className="font-label-mono text-[9px]">Library</span>
          </a>
          <a
            className="flex flex-col items-center justify-center gap-1 text-on-surface-variant hover:text-on-surface w-full h-full hover:bg-surface-container-highest/30 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[22px]">info</span>
            <span className="font-label-mono text-[9px]">About</span>
          </a>
        </nav>
      </div>
    </div>
  );
}

export default App;
