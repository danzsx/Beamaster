const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const isDev = !app.isPackaged;
const DATA_FILE = () => path.join(app.getPath('userData'), 'be-a-master-data.json');

function createWindow() {
  const win = new BrowserWindow({
    width: 1420,
    height: 900,
    minWidth: 1080,
    minHeight: 700,
    backgroundColor: '#F6F6F3',
    title: 'Be a Master',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev && process.env.VITE_DEV_SERVER_URL !== 'none') {
    win.loadURL('http://localhost:5173').catch(() => {
      win.loadFile(path.join(__dirname, '../dist/index.html'));
    });
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

ipcMain.handle('storage:load', async () => {
  try {
    const file = DATA_FILE();
    if (!fs.existsSync(file)) return null;
    const raw = fs.readFileSync(file, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erro ao carregar dados locais:', err);
    return null;
  }
});

ipcMain.handle('storage:save', async (_event, payload) => {
  try {
    const file = DATA_FILE();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(payload, null, 2), 'utf-8');
    return { ok: true, path: file };
  } catch (err) {
    console.error('Erro ao salvar dados locais:', err);
    return { ok: false, error: String(err) };
  }
});

ipcMain.handle('storage:get-path', async () => {
  return DATA_FILE();
});

ipcMain.handle('storage:export-file', async (_event, { filename, data }) => {
  try {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: 'Exportar dados do Be a Master',
      defaultPath: filename || 'be-a-master-backup.json',
      filters: [{ name: 'JSON', extensions: ['json'] }],
    });
    if (canceled || !filePath) return { ok: false, canceled: true };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return { ok: true, filePath };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

