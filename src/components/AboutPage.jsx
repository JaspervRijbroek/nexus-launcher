function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-12 gap-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            sports_esports
          </span>
        </div>
        <div>
          <h1 className="font-headline-sm text-2xl text-on-surface leading-tight">Nexus Launcher</h1>
          <span className="font-label-mono text-xs text-on-surface-variant">v1.0.4</span>
        </div>
      </div>

      <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">
        A game launcher that launches a game and its trainer together — keeping everything in one place.
      </p>

      <div className="w-full max-w-xs divide-y divide-outline-variant rounded-xl overflow-hidden border border-outline-variant">
        <div className="flex justify-between items-center px-4 py-3 bg-surface-container">
          <span className="text-on-surface-variant text-xs">Version</span>
          <span className="text-on-surface text-xs font-mono">1.0.4</span>
        </div>
        <div className="flex justify-between items-center px-4 py-3 bg-surface-container">
          <span className="text-on-surface-variant text-xs">Built with</span>
          <span className="text-on-surface text-xs font-mono">Tauri + React</span>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
