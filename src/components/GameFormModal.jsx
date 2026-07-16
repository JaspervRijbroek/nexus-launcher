import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";

function GameFormModal({ game, onSave, onDelete, onClose }) {
  const isEditing = Boolean(game?.id);

  const [form, setForm] = useState({
    name: "",
    game_path: "",
    trainer_path: "",
    trainer_shortcuts: "",
  });

  useEffect(() => {
    setForm({
      name: game?.name ?? "",
      game_path: game?.game_path ?? "",
      trainer_path: game?.trainer_path ?? "",
      trainer_shortcuts: game?.trainer_shortcuts ?? "",
    });
  }, [game]);

  // Close on Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function pickFile(field) {
    try {
      const selected = await open({ multiple: false });
      if (selected) {
        setForm((f) => ({ ...f, [field]: selected }));
      }
    } catch (_) {}
  }

  async function handleSave() {
    if (!form.name.trim() || !form.game_path.trim() || !form.trainer_path.trim()) return;
    const id = isEditing ? game.id : await invoke("generate_id");
    onSave({
      id,
      name: form.name.trim(),
      game_path: form.game_path.trim(),
      trainer_path: form.trainer_path.trim(),
      trainer_shortcuts: form.trainer_shortcuts.trim() || null,
    });
  }

  const isValid = form.name.trim() && form.game_path.trim() && form.trainer_path.trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#0F172A] border border-outline-variant rounded-xl w-full max-w-[380px] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant">
          <h2 className="font-headline-sm text-[15px] text-on-surface">
            {isEditing ? "Edit Game" : "Add Game"}
          </h2>
          <button
            className="text-on-surface-variant hover:text-on-surface transition-colors"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <div className="px-5 py-4 flex flex-col gap-4">
          <FormField label="Name" required>
            <input
              autoFocus
              className="w-full bg-[#1E293B] border border-[#334155] focus:border-primary rounded px-3 py-1.5 text-on-surface font-label-mono text-[12px] outline-none transition-colors placeholder:text-on-surface-variant/40"
              placeholder="e.g. Elden Ring"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </FormField>

          <FormField label="Game Executable" required>
            <PathInput
              placeholder="/path/to/game.exe"
              value={form.game_path}
              onChange={(v) => setForm((f) => ({ ...f, game_path: v }))}
              onPick={() => pickFile("game_path")}
            />
          </FormField>

          <FormField label="Trainer Executable" required>
            <PathInput
              placeholder="/path/to/trainer.exe"
              value={form.trainer_path}
              onChange={(v) => setForm((f) => ({ ...f, trainer_path: v }))}
              onPick={() => pickFile("trainer_path")}
            />
          </FormField>

          <FormField label="Trainer Shortcuts" hint="Optional · e.g. alt+f11, ctrl+f1">
            <input
              className="w-full bg-[#1E293B] border border-[#334155] focus:border-primary rounded px-3 py-1.5 text-on-surface font-label-mono text-[12px] outline-none transition-colors placeholder:text-on-surface-variant/40"
              placeholder="alt+f11, ctrl+f1"
              value={form.trainer_shortcuts}
              onChange={(e) => setForm((f) => ({ ...f, trainer_shortcuts: e.target.value }))}
            />
          </FormField>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-outline-variant flex items-center gap-2">
          {isEditing && (
            <button
              className="mr-auto p-1.5 text-error hover:bg-error-container/20 rounded transition-colors"
              onClick={() => onDelete(game.id)}
              title="Delete game"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          )}
          <button
            className="px-4 py-1.5 rounded border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-on-surface font-label-mono text-[11px] transition-colors ml-auto"
            onClick={onClose}
            type="button"
          >
            CANCEL
          </button>
          <button
            className="px-4 py-1.5 rounded bg-primary hover:bg-primary-fixed text-[#0F172A] font-label-mono text-[11px] font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(137,206,255,0.2)]"
            disabled={!isValid}
            onClick={handleSave}
            type="button"
          >
            {isEditing ? "SAVE" : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PathInput({ value, placeholder, onChange, onPick }) {
  return (
    <div className="flex gap-2">
      <input
        className="flex-1 min-w-0 bg-[#1E293B] border border-[#334155] focus:border-primary rounded px-3 py-1.5 text-on-surface font-label-mono text-[11px] outline-none transition-colors placeholder:text-on-surface-variant/40"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className="shrink-0 px-2.5 py-1.5 bg-[#1E293B] border border-[#334155] hover:border-primary text-on-surface-variant hover:text-primary rounded transition-colors"
        onClick={onPick}
        type="button"
      >
        <span className="material-symbols-outlined text-[16px]">folder_open</span>
      </button>
    </div>
  );
}

function FormField({ label, required, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
        {label}
        {required && <span className="text-error text-[10px]">*</span>}
        {hint && (
          <span className="normal-case tracking-normal text-[9px] opacity-60 ml-1">{hint}</span>
        )}
      </label>
      {children}
    </div>
  );
}

export default GameFormModal;
