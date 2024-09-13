const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const os = require('os');

let mainWindow;

function createWindow(){
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  mainWindow.loadURL('212.111.203.173:3000');
}

app.whenReady().then(() => {
  createWindow

  app.on('activate', () => {
    if(mainWindow === null){
      createWindow();
    }
  })
});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin'){
    app.quit();
  }
});

