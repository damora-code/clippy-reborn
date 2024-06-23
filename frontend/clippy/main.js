const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // Ensure nodeIntegration is false for security reasons
      contextIsolation: true, // Enable context isolation
    },
  });

  mainWindow.loadURL('http://localhost:3000');
};

app.on('ready', createWindow);
;