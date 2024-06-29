const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

const createWindow = () => {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;

  const mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    x: width - 320, // Position it 20 pixels from the right edge of the screen
    y: height - 340, // Position it 20 pixels above the taskbar
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // Ensure nodeIntegration is false for security reasons
      contextIsolation: true, // Enable context isolation
    },
  });

  mainWindow.loadURL('http://localhost:3000');

  // hide scrollbars
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.insertCSS('::-webkit-scrollbar { display: none; }');
  });
  
};

app.on('ready', createWindow);
;