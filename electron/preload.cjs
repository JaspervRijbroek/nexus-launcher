'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadGames: () =>
    ipcRenderer.invoke('load-games'),

  saveGames: (games) =>
    ipcRenderer.invoke('save-games', games),

  generateId: () =>
    ipcRenderer.invoke('generate-id'),

  launchGame: (args) =>
    ipcRenderer.invoke('launch-game', args),

  getRunningGames: () =>
    ipcRenderer.invoke('get-running-games'),

  getSteamLaunchCommand: (gameId) =>
    ipcRenderer.invoke('get-steam-launch-command', gameId),

  openFileDialog: (options) =>
    ipcRenderer.invoke('open-file-dialog', options),

  openPath: (filePath) =>
    ipcRenderer.invoke('open-path', filePath),

  openUrl: (url) =>
    ipcRenderer.invoke('open-url', url),
});
