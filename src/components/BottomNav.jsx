function BottomNav({ currentPage, onPageChange }) {
  const isLibrary = currentPage === "library";
  const isAbout = currentPage === "about";

  return (
    <nav className="bg-surface-container-low border-t border-outline-variant flex justify-around items-center h-[60px] shrink-0 pb-safe z-50">
      <button
        type="button"
        onClick={() => onPageChange("library")}
        className={`flex flex-col items-center justify-center gap-1 w-full h-full hover:bg-surface-container-highest/30 transition-colors relative ${isLibrary ? "text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
      >
        {isLibrary && <span className="absolute top-0 w-8 h-0.5 bg-primary rounded-b" />}
        <span className="material-symbols-outlined text-[22px]" style={isLibrary ? { fontVariationSettings: "'FILL' 1" } : undefined}>
          sports_esports
        </span>
        <span className="font-label-mono text-[9px]">Library</span>
      </button>
      <button
        type="button"
        onClick={() => onPageChange("about")}
        className={`flex flex-col items-center justify-center gap-1 w-full h-full hover:bg-surface-container-highest/30 transition-colors relative ${isAbout ? "text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
      >
        {isAbout && <span className="absolute top-0 w-8 h-0.5 bg-primary rounded-b" />}
        <span className="material-symbols-outlined text-[22px]" style={isAbout ? { fontVariationSettings: "'FILL' 1" } : undefined}>
          info
        </span>
        <span className="font-label-mono text-[9px]">About</span>
      </button>
    </nav>
  );
}

export default BottomNav;
