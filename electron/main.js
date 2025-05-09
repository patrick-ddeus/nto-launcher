import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { join } from 'path';
import { fileURLToPath } from 'url';
import fsExtra from 'fs-extra';
import pkg from 'electron-updater';
import log from 'electron-log';
import isDev from 'electron-is-dev';
import axios from 'axios';
import Store from 'electron-store';
import { unrar } from 'unrar-promise';
import { finished } from 'stream/promises';

import fs from 'fs';
import path from 'path';

const store = new Store();

const { autoUpdater } = pkg;
const { existsSync, mkdirSync, rm, stat, rename, readdir } = fsExtra;

log.transports.file.level = 'info';
autoUpdater.logger = log;

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const GAME_PATH = join(app.getPath('userData'), 'GameFiles');
log.info(join(__dirname, 'preload.js'));
if (!existsSync(GAME_PATH)) {
  mkdirSync(GAME_PATH, { recursive: true });
}

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 940,
    minHeight: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, '../dist/electron/preload.js'),
    },
    show: false,
    backgroundColor: '#1A1A1A',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#000000',
      symbolColor: '#FFFFFF',
    },
    icon: join(__dirname, '../assets/icon.png'),
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(join(__dirname, '../dist/index.html'));
  }

  mainWindow.setMenu(null);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) {
      mainWindow.webContents.openDevTools({ mode: 'detach' }); // ou 'undocked', 'bottom', 'right'
    }

    checkForUpdates();
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
};
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Auto-updater events
function checkForUpdates() {
  if (isDev) {
    log.info('Skipping update check in development mode');
    return;
  }

  autoUpdater.checkForUpdates();
}

autoUpdater.on('checking-for-update', () => {
  if (mainWindow)
    mainWindow.webContents.send('update-status', { status: 'checking' });
});

autoUpdater.on('update-available', (info) => {
  if (mainWindow)
    mainWindow.webContents.send('update-status', {
      status: 'available',
      info,
    });
});

autoUpdater.on('update-not-available', () => {
  if (mainWindow)
    mainWindow.webContents.send('update-status', { status: 'not-available' });
});

autoUpdater.on('download-progress', (progress) => {
  if (mainWindow)
    mainWindow.webContents.send('update-status', {
      status: 'downloading',
      progress,
    });
});

autoUpdater.on('update-downloaded', () => {
  if (mainWindow)
    mainWindow.webContents.send('update-status', { status: 'ready' });
});

autoUpdater.on('error', (err) => {
  log.error('Auto updater error:', err);
  if (mainWindow)
    mainWindow.webContents.send('update-status', {
      status: 'error',
      error: err.message,
    });
});

// IPC handlers
ipcMain.handle('get-app-info', () => {
  return {
    version: app.getVersion(),
    appPath: app.getPath('userData'),
    gamePath: GAME_PATH,
  };
});

ipcMain.handle('install-update', () => {
  autoUpdater.quitAndInstall(false, true);
});

ipcMain.handle('download-client', async (event, url) => {
  console.log('🚀 ~ returnnewPromise ~ url:', url);
  return new Promise(async (resolve, reject) => {
    const rarPath = path.join(app.getPath('userData'), 'game.rar');
    const gameDir = path.join(app.getPath('userData'), 'GameFiles');
    const tmpDir = path.join(app.getPath('userData'), 'GameFiles_tmp');
    const writer = fs.createWriteStream(rarPath);

    try {
      const response = await axios.get(url, { responseType: 'stream' });

      const total = parseInt(response.headers['content-length'] || '0', 10);
      let received = 0;
      const startTime = Date.now();

      response.data.pipe(writer);

      response.data.on('data', (chunk) => {
        received += chunk.length;
        const elapsed = (Date.now() - startTime) / 1000;
        const percent = Math.round((received / total) * 100);
        const speed = (received / 1024 / elapsed).toFixed(2);

        event.sender.send('download-progress', { percent, speed });
      });

      await finished(writer);

      if (fs.existsSync(tmpDir)) {
        await rm(tmpDir, { recursive: true, force: true });
      }
      fs.mkdirSync(tmpDir, { recursive: true });

      try {
        await unrar(rarPath, tmpDir);

        const [subfolder] = await readdir(tmpDir);
        if (subfolder) {
          const subfolderPath = path.join(tmpDir, subfolder);
          const stats = await stat(subfolderPath);

          if (!stats.isDirectory()) throw new Error('RAR sem subpasta válida');
          if (fs.existsSync(gameDir)) {
            await rm(gameDir, { recursive: true, force: true });
          }
          fs.mkdirSync(gameDir, { recursive: true });

          const files = await readdir(subfolderPath);
          for (const file of files) {
            await rename(
              path.join(subfolderPath, file),
              path.join(gameDir, file)
            );
          }

          resolve(gameDir);
        }
      } catch (err) {
        reject(err);
      }

      response.data.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
});

ipcMain.handle('launch-game', async () => {
  try {
    const execPath = join(GAME_PATH, 'otclient_dx.exe');

    if (existsSync(execPath)) {
      await shell.openPath(execPath);
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Executável otclient_dx.exe não encontrado',
      };
    }
  } catch (error) {
    log.error('Erro ao iniciar o jogo:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('check-game-updates', async (event, endpoint) => {
  try {
    const clientInfo = await store.get('client_info');
    const response = await axios.get(endpoint);
    const data = response.data;
    await store.set('client_info', data);

    return {
      hasUpdate: clientInfo?.client_version !== response.data.client_version,
      version: data.client_version || '1.0',
      lastUpdate: data.last_update,
      downloadLink: data.download_link,
    };
  } catch (error) {
    log.error('Error checking game updates:', error);
    return { hasUpdate: false, error: error.message };
  }
});
