function AppHeader() {
  return (
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
  );
}

export default AppHeader;
