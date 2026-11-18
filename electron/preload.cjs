const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('beAMasterDesktop', {
  isDesktop: true,
  loadState: () => ipcRenderer.invoke('storage:load'),
  saveState: (payload) => ipcRenderer.invoke('storage:save', payload),
  getStoragePath: () => ipcRenderer.invoke('storage:get-path'),
  exportFile: (filename, data) => ipcRenderer.invoke('storage:export-file', { filename, data }),
});

