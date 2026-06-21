function BottomNav() {
  return (
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
  );
}

export default BottomNav;
