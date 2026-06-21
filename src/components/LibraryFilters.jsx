function LibraryFilters() {
  return (
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
  );
}

export default LibraryFilters;
