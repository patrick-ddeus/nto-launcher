import { contextBridge, ipcRenderer } from 'electron';
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // App info
  getAppInfo: () => ipcRenderer.invoke('get-app-info'),
  onDownloadProgress: (cb) => {
    ipcRenderer.on('download-progress', (_, data) => cb(data));
  },
  downloadClient: (url) => ipcRenderer.invoke('download-client', url),
  // Launcher updates
  installUpdate: () => ipcRenderer.invoke('install-update'),
  onUpdateStatus: (callback) => {
    ipcRenderer.on('update-status', (_, data) => callback(data));

    // Return a function to remove the listener
    return () => {
      ipcRenderer.removeAllListeners('update-status');
    };
  },

  // Game management
  launchGame: () => ipcRenderer.invoke('launch-game'),
  checkGameUpdates: (endpoint) =>
    ipcRenderer.invoke('check-game-updates', endpoint),

  // System
  platform: process.platform,
});
