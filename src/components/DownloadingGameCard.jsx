function DownloadingGameCard() {
  return (
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
  );
}

export default DownloadingGameCard;
