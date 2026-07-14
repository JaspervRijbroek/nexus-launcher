'use strict';

const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const { v4: uuidv4 } = require('uuid');

const isDev = !app.isPackaged;

// Running games map: gameId -> { gameProcess, trainerProcess }
const runningGames = new Map();

function getGamesPath() {
  return path.join(app.getPath('userData'), 'games.json');
}

function loadGamesFromPath(gamesPath) {
  try {
    if (fs.existsSync(gamesPath)) {
      const content = fs.readFileSync(gamesPath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (_) {
    // ignore parse/read errors
  }
  return [];
}

function mapKey(key) {
  const keyMap = {
    f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4',
    f5: 'f5', f6: 'f6', f7: 'f7', f8: 'f8',
    f9: 'f9', f10: 'f10', f11: 'f11', f12: 'f12',
    space: 'space',
    enter: 'enter', return: 'enter',
    escape: 'escape', esc: 'escape',
    tab: 'tab',
    backspace: 'backspace',
    delete: 'delete', del: 'delete',
    insert: 'insert', ins: 'insert',
    home: 'home',
    end: 'end',
    pageup: 'pageup',
    pagedown: 'pagedown',
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
  };
  return keyMap[key] || key.charAt(0);
}

function mapModifier(mod) {
  switch (mod) {
    case 'ctrl':
    case 'control': return 'control';
    case 'alt': return 'alt';
    case 'shift': return 'shift';
    case 'win':
    case 'meta':
    case 'super': return 'command';
    default: return null;
  }
}

function sendShortcuts(shortcuts) {
  let robot;
  try {
    robot = require('robotjs');
  } catch (e) {
    console.error('robotjs is not available; keyboard shortcuts will not be sent:', e.message);
    return;
  }

  for (const shortcut of shortcuts.split(',')) {
    const trimmed = shortcut.trim().toLowerCase();
    if (!trimmed) continue;

    const parts = trimmed.split('+').map((p) => p.trim());
    const modifiers = [];
    let mainKey = null;

    for (const part of parts) {
      const mod = mapModifier(part);
      if (mod) {
        modifiers.push(mod);
      } else {
        mainKey = mapKey(part);
      }
    }

    if (mainKey) {
      robot.keyTap(mainKey, modifiers);
      // 100ms pause between shortcuts (matches original Tauri behaviour)
      const end = Date.now() + 100;
      while (Date.now() < end) { /* synchronous wait */ }
    }
  }
}

// ---------------------------------------------------------------------------
// IPC handlers
// ---------------------------------------------------------------------------

ipcMain.handle('load-games', () => {
  return loadGamesFromPath(getGamesPath());
});

ipcMain.handle('save-games', (_event, games) => {
  const gamesPath = getGamesPath();
  fs.writeFileSync(gamesPath, JSON.stringify(games, null, 2), 'utf-8');
});

ipcMain.handle('generate-id', () => {
  return uuidv4();
});

ipcMain.handle('launch-game', (_event, { gameId, gamePath, trainerPath, trainerShortcuts }) => {
  const trainerProcess = spawn(trainerPath, [], { detached: true, stdio: 'ignore' });
  const gameProcess = spawn(gamePath, [], { detached: true, stdio: 'ignore' });

  trainerProcess.unref();
  gameProcess.unref();

  runningGames.set(gameId, { gameProcess, trainerProcess });

  // Kill the trainer when the game exits (mirrors the Tauri watcher thread)
  gameProcess.on('exit', () => {
    try { trainerProcess.kill(); } catch (_) {}
    runningGames.delete(gameId);
  });

  // Send trainer keyboard shortcuts after a 60-second delay
  if (trainerShortcuts && trainerShortcuts.trim()) {
    const shortcuts = trainerShortcuts;
    setTimeout(() => sendShortcuts(shortcuts), 60_000);
  }
});

ipcMain.handle('get-running-games', () => {
  // Drop entries whose game process has already exited
  for (const [gameId, { gameProcess }] of runningGames.entries()) {
    if (gameProcess.exitCode !== null || gameProcess.killed) {
      runningGames.delete(gameId);
    }
  }
  return Array.from(runningGames.keys());
});

ipcMain.handle('get-steam-launch-command', (_event, gameId) => {
  const exe = app.getPath('exe');
  return `"${exe}" --launch ${gameId}`;
});

ipcMain.handle('open-file-dialog', async (_event, options) => {
  return dialog.showOpenDialog(options);
});

ipcMain.handle('open-path', (_event, filePath) => {
  return shell.openPath(filePath);
});

ipcMain.handle('open-url', (_event, url) => {
  return shell.openExternal(url);
});

// ---------------------------------------------------------------------------
// Window creation
// ---------------------------------------------------------------------------

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 650,
    title: 'Nexus Launcher',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  win.once('ready-to-show', () => win.show());
}

// ---------------------------------------------------------------------------
// --launch <game-id>  CLI argument (Steam shortcut support)
// ---------------------------------------------------------------------------

function handleLaunchArg() {
  const args = process.argv;
  const idx = args.indexOf('--launch');
  if (idx === -1) return false;

  const gameId = args[idx + 1];
  if (gameId) {
    const games = loadGamesFromPath(getGamesPath());
    const game = games.find((g) => g.id === gameId);
    if (game) {
      spawn(game.trainer_path, [], { detached: true, stdio: 'ignore' }).unref();
      spawn(game.game_path, [], { detached: true, stdio: 'ignore' }).unref();
      if (game.trainer_shortcuts && game.trainer_shortcuts.trim()) {
        const shortcuts = game.trainer_shortcuts;
        setTimeout(() => sendShortcuts(shortcuts), 60_000);
      }
    }
  }

  // Quit without showing any window
  setTimeout(() => app.quit(), 100);
  return true;
}

// ---------------------------------------------------------------------------
// App lifecycle
// ---------------------------------------------------------------------------

app.whenReady().then(() => {
  if (!handleLaunchArg()) {
    createWindow();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
