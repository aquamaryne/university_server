const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const ipFilePath = path.join(app.getPath('userData'), 'ip-address.json');

function saveIpAddress(){
    fs.writeFileSync(ipFilePath, JSON.stringify({ ip }), 'utf-8');
};

function loadIpAddress(){
    if(fs.existsSync(ipFilePath)){
        const data = fs.readFileSync(ipFilePath, 'utf-8');
        return JSON.parse(data).ip;
    }
    return null;
};

function createWindow(){
    const saveIP = loadIpAddress();

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: path.join(__dirname, 'assets', 'file.png'),
        autoHideMenuBar: true,
    });

    if(saveIP){
        win.loadURL(`http://${saveIP}`);
    } else {
        win.loadFile('index.html');
    }

  win.loadFile('index.html');

}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0){
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('save-ip', (event, ip) => {
    saveIpAddress(ip);
})